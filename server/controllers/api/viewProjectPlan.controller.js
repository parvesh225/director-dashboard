const { ProjectPlan } = require("../../models/ProjectPlan");
const { TeamStrength } = require("../../models/TeamStrength");
const { Team } = require("../../models/Team");
const { Finances } = require("../../models/Finances");
const { FinanceBudget } = require("../../models/FinanceBudget");
const { ProjectActivitie } = require("../../models/ProjectActivitie");
const { OtherActivitie } = require("../../models/OtherActivitie");
const { Centre } = require("../../models/Centre");
const { Project } = require("../../models/Project");
const { TeamLeader } = require("../../models/TeamLeader");
const { FundingAgency } = require("../../models/FundingAgency");
const { FinanceRecieved } = require("../../models/FinanceRecieved");
const { db } = require("../../utils/db.utill");



async function overallDashboard(req, res, next) {
  let center = req.params.id;

  let totalAllocatedBudget = await ProjectPlan.sum('allocated_budget', {
    where: {
      centre_name: center
    }
  });


  const receivedAmt = await db.query(`
  SELECT 
    sum(fr.amount_recieved) as amount_recieved
  FROM
    finance_recieved as fr
  INNER JOIN project_plan AS pr ON pr.id=fr.project_plan_id
   and pr.centre_name=${center} where (fr.is_adjustment is null or fr.is_adjustment = false)
  `,
    { type: db.QueryTypes.SELECT });

  const utilizedAmt = await db.query(`
  SELECT 
    sum(fr.expenditure) as expenditure
  FROM
  finances as fr
  INNER JOIN project_plan AS pr ON pr.id=fr.project_plan_id
   and pr.centre_name=${center} 
  `,
    { type: db.QueryTypes.SELECT });
  console.log(utilizedAmt);

  var balance = 0.00
  if (receivedAmt && utilizedAmt) {
    balance = receivedAmt[0].amount_recieved - utilizedAmt[0].expenditure
  }
  return res.status(200).json({
    status: true,
    balance: balance,
    totalfund: totalAllocatedBudget,
    receivedAmt: receivedAmt,
    utilizedAmt: utilizedAmt
  })

}

async function fundingDetail(req, res, next) {
  try {
    let projectId = req.params.id;
    const finaceList = await db.query(`SELECT project_plan_id,budget_head, sum(allocated_fund) as allocated_fund , SUM(expenditure)as expenditure  FROM finances GROUP by budget_head HAVING project_plan_id=${projectId}`, { type: db.QueryTypes.SELECT });

    const receivedAmt = await db.query(`SELECT sum(fr.amount_recieved) as amount_recieved
  FROM finance_recieved as fr INNER JOIN project_plan AS pr ON pr.id=fr.project_plan_id
   where (fr.is_adjustment is null or fr.is_adjustment = false)`,
      { type: db.QueryTypes.SELECT });

    const utilizedAmt = await db.query(`SELECT sum(fr.expenditure) as expenditure FROM finances as fr INNER JOIN project_plan AS pr ON pr.id=fr.project_plan_id
    `,
      { type: db.QueryTypes.SELECT });

    const data = await db.query(`SELECT max(amount_recieved)as amount_recieved ,max(amount_recieved_date)as amount_recieved_date FROM finance_recieved WHERE project_plan_id =${projectId} or is_adjustment !=1`,
      { type: db.QueryTypes.SELECT });

    const amountTillDate = await db.query(`SELECT sum(allocated_fund)as allocated_fund FROM finances WHERE year < (SELECT year(CURRENT_DATE)) AND project_plan_id =${projectId}`,
      { type: db.QueryTypes.SELECT });

    console.log(`Amount allocated till date ${JSON.stringify(amountTillDate)}`)
    return res.status(200).json({
      status: true,
      financeList: finaceList,
      totalReceivedAmt:receivedAmt[0].amount_recieved,
      balanceAmt:receivedAmt[0].amount_recieved - utilizedAmt[0].expenditure,
      lastAmtReceived: data[0].amount_recieved,
      lastAmtDate: data[0].amount_recieved_date,
      amountTillDate:amountTillDate[0].allocated_fund,
      utilizedAmt:utilizedAmt[0].expenditure
    })
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    })
  }


}
module.exports = {
  overallDashboard,
  fundingDetail
}