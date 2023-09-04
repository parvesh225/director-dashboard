const { ProjectActivityTask } = require("../../models/ProjectActivityTask");
const { ProjectPlan } = require("../../models/ProjectPlan");
const { Team } = require("../../models/Team");
const { Centre } = require("../../models/Centre");
const { Project } = require("../../models/Project");
const { ProjectActivity } = require("../../models/ProjectActivity");
const { db } = require("../../utils/db.utill");


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

    let totalAllocatedBudget = await ProjectPlan.sum('allocated_budget');
    let totalProject = await ProjectPlan.count({
      distinct: true, // Use the DISTINCT keyword
      col: 'project_name', // Specify the column to count distinct values for
    });

    let totalEmployee = await Team.count({
      distinct: true,
      col: 'employee_name'
    });


    let totalKnowledgeProducts = await ProjectActivityTask.count({
      distinct: true,
      col: 'task',
      where: {
        project_activity_id: 31,
      }
    });

    let totalMou = await ProjectActivityTask.count({
      distinct: true,
      col: 'task',
      where: {
        project_activity_id: 28,
      }
    });
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
      "sanctionFund": sanctionFund,
      "releasedFund": releasedFund,
      "utilizationFund": utilizationFund,
      //2nd row graph
      "projectActivity":customObj,
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


module.exports = {
  overView
}
