const { ProjectActivityTask } = require("../../models/ProjectActivityTask");
const { ProjectPlan } = require("../../models/ProjectPlan");
const { Team } = require("../../models/Team");
const { Centre } = require("../../models/Centre");
const { Project } = require("../../models/Project");
const { ProjectActivity } = require("../../models/ProjectActivity");
const { db } = require("../../utils/db.utill");
const { Op } = require('sequelize');
const { ProjectMasterActivity } = require("../../models/ProjectMasterActivity");


function formatNumberToCrores(number) {
  if (isNaN(number)) {
    return "Invalid Number";
  }

  const croreValue = 10000000; // 1 Crore
  const formattedNumber = (number / croreValue).toFixed(2); // Round to 2 decimal places
  return formattedNumber;
}

async function overView(req, res, next) {

  try {
    let fundingAgency = [];
    let fundingAmt = [];
    let sanctionFund = [];
    let releasedFund = [];
    let utilizationFund = [];
    let projectList = [];
    let customObj = [];
    let customObj2 = [];
    let customObj3 = [];
    let customObj4 = [];
    let customObj5 = [];


    const centres = await Centre.findAll();
    const projects = await Project.findAll();

    let budgetWhereCondition = {};
    /*if(req.body.year) {
      budgetWhereCondition.start_date = {
        [Op.gte] : new Date(req.body.year+'-04-01')
      };
      budgetWhereCondition.end_date = {
        [Op.lte]: new Date((parseInt(req.body.year)+1)+'-03-31')
     };
    }*/

    if (req.body.centre_name) {
      budgetWhereCondition.centre_name = req.body.centre_name
    }

    if (req.body.project_name) {
      budgetWhereCondition.project_name = req.body.project_name
    }

    let totalAllocatedBudget = 0;
    if (Object.keys(budgetWhereCondition).length === 0) {
      totalAllocatedBudget = await ProjectPlan.sum('allocated_budget');
    } else {
      totalAllocatedBudget = await ProjectPlan.sum('allocated_budget', {
        where: budgetWhereCondition
      });
    }
    if (!totalAllocatedBudget) {
      totalAllocatedBudget = 0;
    }

    let totalProjectCountWhere = {}
    if (req.body.centre_name) {
      totalProjectCountWhere.centre_name = req.body.centre_name
    }

    if (req.body.project_name) {
      totalProjectCountWhere.project_name = req.body.project_name
    }

    let totalProject = 0;
    if (Object.keys(totalProjectCountWhere).length === 0) {
      totalProject = await ProjectPlan.count({
        distinct: true, // Use the DISTINCT keyword
        col: 'project_name', // Specify the column to count distinct values for
      })
    } else {
      totalProject = await ProjectPlan.count({
        distinct: true, // Use the DISTINCT keyword
        col: 'project_name', // Specify the column to count distinct values for
        where: totalProjectCountWhere
      });
    }
    if (!totalProject) {
      totalProject = 0;
    }

    let whereOfTeam = {}
    if (req.body.centre_name) {
      whereOfTeam.centre_name = req.body.centre_name
    }

    if (req.body.project_name) {
      whereOfTeam.project_name = req.body.project_name
    }
    let totalEmployee = 0
    if (Object.keys(whereOfTeam).length === 0) {
      let customObj = await db.query(`SELECT count(t.id) as cnt FROM teams as t
      inner JOIN project_plan as pp
      ON t.project_plan_id = pp.id where employee_name is not null`,
        { type: db.QueryTypes.SELECT });
      if (customObj) {
        totalEmployee = customObj[0].cnt
      }
    } else {
      var whereString = 'where employee_name is not null';
      if (whereOfTeam.centre_name) {
        whereString += ' and pp.centre_name =' + whereOfTeam.centre_name
      }
      if (whereOfTeam.project_name) {
        whereString += ' and pp.project_name =' + whereOfTeam.project_name
      }

      let customObj = await db.query(`SELECT count(t.id) as cnt FROM teams as t
      inner JOIN project_plan as pp
      ON t.project_plan_id = pp.id ${whereString}`,
        { type: db.QueryTypes.SELECT });

      if (customObj) {
        totalEmployee = customObj[0].cnt
      }
    }


    if (!totalEmployee) {
      totalEmployee = 0
    }
    // let totalKnowledgeProducts = await ProjectActivityTask.count({
    //   distinct: true,
    //   col: 'task',
    //   where: {
    //     project_activity_id: 31,
    //   }
    // });

    let whereOfProjectActivityTask = {}
    if (req.body.centre_name) {
      whereOfProjectActivityTask.centre_name = req.body.centre_name
    }

    if (req.body.project_name) {
      whereOfProjectActivityTask.project_name = req.body.project_name
    }

    let totalKnowledgeProducts = 0;
    let knowledgeProduct = await ProjectMasterActivity.findOne({
      where: {
        name: 'Knowledge management'
      }
    })
    if (Object.keys(whereOfProjectActivityTask).length === 0) {
      let customObj = await db.query(`SELECT count(t.id) as cnt FROM project_activity_tasks  as t
      inner JOIN project_activity as pa on pa.id=t.project_activity_id
      inner JOIN project_plan as pp
      ON t.project_plan_id = pp.id where pa.project_master_activity_id = ${knowledgeProduct.id}`,
        { type: db.QueryTypes.SELECT });
      if (customObj) {
        totalKnowledgeProducts = customObj[0].cnt
      }
    } else {
      var whereString = 'where pa.project_master_activity_id =  ' + knowledgeProduct.id + ' ';
      if (whereOfProjectActivityTask.centre_name) {
        whereString += ' and pp.centre_name =' + whereOfProjectActivityTask.centre_name
      }
      if (whereOfProjectActivityTask.project_name) {
        whereString += ' and pp.project_name =' + whereOfProjectActivityTask.project_name
      }
      let customObj = await db.query(`SELECT count(t.id) as cnt FROM project_activity_tasks as t
      inner JOIN project_activity as pa on pa.id=t.project_activity_id
      inner JOIN project_plan as pp
      ON t.project_plan_id = pp.id ${whereString}`,
        { type: db.QueryTypes.SELECT });
      if (customObj) {
        totalKnowledgeProducts = customObj[0].cnt
      }
    }


    if (!totalKnowledgeProducts) {
      totalKnowledgeProducts = 0
    }

    // ---------------------

    let whereOfProjectActivityTaskMou = {}
    if (req.body.centre_name) {
      whereOfProjectActivityTaskMou.centre_name = req.body.centre_name
    }

    if (req.body.project_name) {
      whereOfProjectActivityTaskMou.project_name = req.body.project_name
    }

    let totalMou = 0;
    let mouProduct = await ProjectMasterActivity.findOne({
      where: {
        name: 'MOUs/Agreements'
      }
    })
    if (Object.keys(whereOfProjectActivityTaskMou).length === 0) {
      let customObj = await db.query(`SELECT count(t.id) as cnt FROM project_activity_tasks  as t
      inner JOIN project_activity as pa on pa.id=t.project_activity_id
      inner JOIN project_plan as pp
      ON t.project_plan_id = pp.id where pa.project_master_activity_id = ${mouProduct.id}`,
        { type: db.QueryTypes.SELECT });
      if (customObj) {
        totalMou = customObj[0].cnt
      }
    } else {
      var whereString = 'where pa.project_master_activity_id =  ' + knowledgeProduct.id + ' ';
      if (whereOfProjectActivityTaskMou.centre_name) {
        whereString += ' and pp.centre_name =' + whereOfProjectActivityTaskMou.centre_name
      }
      if (whereOfProjectActivityTaskMou.project_name) {
        whereString += ' and pp.project_name =' + whereOfProjectActivityTaskMou.project_name
      }
      let customObj = await db.query(`SELECT count(t.id) as cnt FROM project_activity_tasks as t
      inner JOIN project_activity as pa on pa.id=t.project_activity_id
      inner JOIN project_plan as pp
      ON t.project_plan_id = pp.id ${whereString}`,
        { type: db.QueryTypes.SELECT });
      if (customObj) {
        totalMou = customObj[0].cnt
      }
    }


    if (!totalMou) {
      totalMou = 0
    }

    // let totalMou = await ProjectActivityTask.count({
    //   distinct: true,
    //   col: 'task',
    //   where: {
    //     project_activity_id: 28,
    //   }
    // });

    // Get all funding details for pie graph
    const FundingAgancyDetails = await db.query(`SELECT * FROM project_plan as pp left JOIN funding_agency as fa ON pp.funding_agency = fa.agency_code`,
      { type: db.QueryTypes.SELECT });

    //bind data according to Overall Fund graph
    for (let i = 0; i < FundingAgancyDetails.length; i++) {
      let agency = FundingAgancyDetails[i];
      fundingAgency.push(agency.agency_name);
      fundingAmt.push(agency.allocated_budget);
    }

    //get data sanction fund and released fund
    //second graph for welcome page
    const sanction_releasedFund = await db.query(`SELECT t1.centre_name, t1.project_name as project_code,t3.project_name as project_name, t1.allocated_budget ,SUM(t2.amount_recieved) AS released_amt FROM project_plan t1 INNER JOIN finance_recieved t2 ON t1.id = t2.project_plan_id INNER JOIN project t3 ON t1.project_name = t3.project_code WHERE t2.is_adjustment IS NULL OR t2.is_adjustment = 0`,
      { type: db.QueryTypes.SELECT });

    if (sanction_releasedFund.length > 0) {
      for (let j = 0; j < sanction_releasedFund.length; j++) {
        let fund = sanction_releasedFund[j];
        // number formetted in crores
        let s = formatNumberToCrores(fund.allocated_budget);
        let r = formatNumberToCrores(fund.released_amt);

        sanctionFund.push(s);
        releasedFund.push(r);
        projectList.push(fund.project_name);
      }
    }

    let utilizeFund = await db.query(`SELECT table1.centre_name, table1.project_name, SUM(table3.expenditure)As fund_utilized
    FROM project_plan table1
    INNER JOIN finances table3 ON table1.id = table3.project_plan_id
    GROUP BY table1.id`,
      { type: db.QueryTypes.SELECT });

    for (let k = 0; k < utilizeFund.length; k++) {
      let u = formatNumberToCrores(utilizeFund[k].fund_utilized);
      utilizationFund.push(u);
    }

    //for 2nd row graph 
    let subCatagoryList = await ProjectActivity.findAll();

    for (i = 0; i < subCatagoryList.length; i++) {
      var obj = subCatagoryList[i];

      // for Mou
      if (obj.project_master_activity_id === 1) {
        //get round figure value for series
        let x = (obj.current_entries * 100) / obj.expected_entries
        customObj.push({
          name: obj.project_master_activity_name,
          totalActivities: obj.expected_entries,
          currentActivities: obj.current_entries,
          series: [Math.trunc(x)],
          label: "Activity (" + obj.current_entries + "/" + obj.expected_entries + ")"
        })
      }

      // for Geographic Spread or Locations
      if (obj.project_master_activity_id === 2) {
        let x = (obj.current_entries * 100) / obj.expected_entries
        customObj2.push({
          name: obj.project_master_activity_name,
          totalActivities: obj.expected_entries,
          currentActivities: obj.current_entries,
          series: [Math.trunc(x)],
          label: "Activity (" + obj.current_entries + "/" + obj.expected_entries + ")"
        })
      }

      // for Advocacy and Capacity Building
      if (obj.project_master_activity_id === 3) {
        let x = (obj.current_entries * 100) / obj.expected_entries;
        customObj3.push({
          name: obj.project_master_activity_name,
          totalActivities: obj.expected_entries,
          currentActivities: obj.current_entries,
          series: [Math.trunc(x)],
          label: "Activity (" + obj.current_entries + "/" + obj.expected_entries + ")"
        })
      }

      // for Knowledge management
      if (obj.project_master_activity_id === 4) {
        let x = (obj.current_entries * 100) / obj.expected_entries;
        customObj4.push({
          name: obj.project_master_activity_name,
          totalActivities: obj.expected_entries,
          currentActivities: obj.current_entries,
          series: [Math.trunc(x)],
          label: "Activity (" + obj.current_entries + "/" + obj.expected_entries + ")"
        })
      }

      // for Other (such as Prog/Proj devt: partnerships)
      if (obj.project_master_activity_id === 5) {
        let x = (obj.current_entries * 100) / obj.expected_entries;
        customObj5.push({
          name: obj.project_master_activity_name,
          totalActivities: obj.expected_entries,
          currentActivities: obj.current_entries,
          series: [Math.trunc(x)],
          label: "Activity (" + obj.current_entries + "/" + obj.expected_entries + ")"
        })
      }
    }

    let budgetList = await db.query(`SELECT project_plan_id,budget_head, sum(allocated_fund) as allocated_fund , SUM(expenditure)as expenditure FROM finances GROUP by budget_head`, { type: db.QueryTypes.SELECT });
    const receivedAmt = await db.query(`SELECT sum(fr.amount_recieved) as amount_recieved
    FROM finance_recieved as fr INNER JOIN project_plan AS pr ON pr.id=fr.project_plan_id
     where (fr.is_adjustment is null or fr.is_adjustment = false)`,
      { type: db.QueryTypes.SELECT });
      const utilizedAmt = await db.query(`SELECT sum(fr.expenditure) as expenditure FROM finances as fr INNER JOIN project_plan AS pr ON pr.id=fr.project_plan_id
      `,
        { type: db.QueryTypes.SELECT });

      const data = await db.query(`SELECT max(amount_recieved)as amount_recieved ,max(amount_recieved_date)as amount_recieved_date FROM finance_recieved WHERE is_adjustment !=1`,
      { type: db.QueryTypes.SELECT });

    const amountTillDate = await db.query(`SELECT sum(allocated_fund)as allocated_fund FROM finances WHERE year < (SELECT year(CURRENT_DATE))`,
      { type: db.QueryTypes.SELECT });
    return res.status(200).json({
      status: true,
      "centres": centres,
      "projects": projects,
      "totalFund": totalAllocatedBudget,
      "totalProject": totalProject,
      "totalEmployee": totalEmployee,
      "totalKnowledgeProducts": totalKnowledgeProducts,
      "totalMou": totalMou,
      "FundingAgency": fundingAgency,
      "FundingAmt": fundingAmt,
      //second graph for welcome page
      projectList: projectList,
      "budgetList": budgetList,
      totalReceivedAmt: receivedAmt[0].amount_recieved,
      balanceAmt: receivedAmt[0].amount_recieved - utilizedAmt[0].expenditure,
      lastAmtReceived: data[0].amount_recieved,
      lastAmtDate: data[0].amount_recieved_date,
      amountTillDate: amountTillDate[0].allocated_fund,
      utilizedAmt: utilizedAmt[0].expenditure,
      "sanctionFund": sanctionFund,
      "releasedFund": releasedFund,
      "utilizationFund": utilizationFund,
      "balanceAmt": receivedAmt[0].amount_recieved - utilizedAmt[0].expenditure,
      "utilizedAmt": utilizedAmt[0].expenditure,
      //2nd row graph
      "projectActivity": customObj,
      "projectActivity2": customObj2,
      "projectActivity3": customObj3,
      "projectActivity4": customObj4,
      "projectActivity5": customObj5,
    })

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    })
  }
}

async function projectWiseFunding(req, res, next) {
  let isChecked = req.body.isChecked;
  let fundingAgency = [];
  let fundingAmt = [];
  if (isChecked) {
    const FundingAgancyDetails = await db.query(`SELECT pp.centre_name as centre_code, pp.project_name as project_code, pp.funding_agency, pp.allocated_budget, p.project_name FROM project_plan as pp inner JOIN project as p ON pp.project_name = p.project_code`,
      { type: db.QueryTypes.SELECT });

    //bind data according to Overall Fund graph
    for (let i = 0; i < FundingAgancyDetails.length; i++) {
      let agency = FundingAgancyDetails[i];
      fundingAgency.push(agency.project_name);
      fundingAmt.push(agency.allocated_budget);
    }
    return res.status(200).json({
      status: true,
      "FundingAgency": fundingAgency,
      "FundingAmt": fundingAmt,
    })


  } else {
    const FundingAgancyDetails = await db.query(`SELECT * FROM project_plan as pp left JOIN funding_agency as fa ON pp.funding_agency = fa.agency_code`,
      { type: db.QueryTypes.SELECT });

    //bind data according to Overall Fund graph
    for (let i = 0; i < FundingAgancyDetails.length; i++) {
      let agency = FundingAgancyDetails[i];
      fundingAgency.push(agency.agency_name);
      fundingAmt.push(agency.allocated_budget);
    }

    return res.status(200).json({
      status: true,
      "FundingAgency": fundingAgency,
      "FundingAmt": fundingAmt,
    })
  }
}

module.exports = {
  overView,
  projectWiseFunding
}
