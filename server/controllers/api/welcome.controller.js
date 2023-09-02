const { ProjectActivityTask } = require("../../models/ProjectActivityTask");
const { ProjectPlan } = require("../../models/ProjectPlan");
const { Team } = require("../../models/Team");
const { db } = require("../../utils/db.utill");


async function overView(req, res, next) {

  try {
    let FundingAgency = [];
    let FundingAmt = [];

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

    
    //bind data according to graph
    for (let i = 0; i < FundingAgancyDetails.length; i++) {
      let agency = FundingAgancyDetails[i];
      FundingAgency.push(agency.agency_name);
      FundingAmt.push(agency.allocated_budget);
    } 

    return res.status(200).json({
      status: true,
      totalFund: totalAllocatedBudget,
      totalProject: totalProject,
      totalEmployee: totalEmployee,
      totalKnowledgeProducts: totalKnowledgeProducts,
      totalMou: totalMou,
      FundingAgency:FundingAgency,
      FundingAmt:FundingAmt
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
