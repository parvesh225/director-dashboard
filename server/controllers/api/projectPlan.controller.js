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

async function fetchMasterData(req, res, next) {
  try {
    const centres = await Centre.findAll();
    const projects = await Project.findAll();
    const teams = await TeamLeader.findAll();
    const agencys = await FundingAgency.findAll();


    return res.status(200).json({
      "status": true,
      "centres": centres,
      "projects": projects,
      "teams": teams,
      "agencys": agencys
    })
  } catch (error) {
    return res.status(200).json({
      "status": true,
      "message": error.message
    })
  }



}

async function insert(req, res, next) {
  //transaction begin
  //   const t = await db.transaction();
  try {
    let project = await ProjectPlan.create({
      centre_name: req.body.FormData.centre_name,
      project_name: req.body.FormData.project_name,
      project_head: req.body.FormData.team_head,
      project_brief: req.body.FormData.project_brief,
      work_order: req.body.FormData.work_order,
      funding_agency: req.body.FormData.funding_ministry,
      nodal_officer: req.body.FormData.nodal_officer,
      contact_no: req.body.FormData.contact_no,
      allocated_budget: req.body.FormData.allocated_budget,
      start_date: req.body.FormData.start_date,
      end_date: req.body.FormData.end_date,
      overall_progress: req.body.FormData.overall_progress,

    });
    // Team Strength

    if (req.body.team_strength) {
      for (var i = 0; i < req.body.team_strength.length; i++) {
        await TeamStrength.create({
          "project_plan_id": project.id,
          "team": req.body.team_strength[i].team,
          "position": req.body.team_strength[i].position,
          "experience": req.body.team_strength[i].experience,
          "qualification": req.body.team_strength[i].qualification,
          "salary_slab": req.body.team_strength[i].salary_slab
        })
      }
    }

    //Team
    if (req.body.team_strength) {
      for (var i = 0; i < req.body.team_strength.length; i++) {
        await Team.create({
          "project_plan_id": project.id,
          "team": req.body.team_strength[i].team,
          "position": req.body.team_strength[i].position,
          "experience": req.body.team_strength[i].experience,
          "qualification": req.body.team_strength[i].qualification,
          "salary_slab": req.body.team_strength[i].salary_slab
        })
      }
    }
    // Finances
    if (req.body.finances) {
      for (var i = 0; i < req.body.finances.length; i++) {
        await Finances.create({
          "project_plan_id": project.id,
          "year": req.body.finances[i].year,
          "budget_head": req.body.finances[i].budget_head,
          "allocated_fund": req.body.finances[i].allocated_fund,
          "milestone": req.body.finances[i].milestone,
        })
      }
    }

    // Project Activities
    if (req.body.project_activities) {
      for (var i = 0; i < req.body.project_activities.length; i++) {
        await ProjectActivitie.create({
          "project_plan_id": project.id,
          "type": req.body.project_activities[i].type,
          "start_date": req.body.project_activities[i].start_date,
          "end_date": req.body.project_activities[i].end_date,
          "duration": req.body.project_activities[i].duration,
          "activities": req.body.project_activities[i].activities,
          "remarks": req.body.project_activities[i].remarks
        })
      }
    }

    //Other Activities
    if (req.body.other_activities) {
      for (var i = 0; i < req.body.other_activities.length; i++) {

        await OtherActivitie.create({
          "project_plan_id": project.id,
          "activities": req.body.other_activities[i].other_activity,
          "date": req.body.other_activities[i].other_date
        })
      }
    }



    //if successfully insert all data the commint transaction
    // await t.commit(); 

    // Success Message Return
    return res.status(200).json({
      "status": true,
      "message": "Data inserted successfully!",
      "data": req.body
    });
    // Error Message Return
  } catch (error) {
    // if not insert data successfully the rollback all table
    // await t.rollback(); 
    return res.status(500).json({
      "status": false,
      "message": error.message,
      "data": req.body
    })

  }

}
async function edit(req, res, next) {

  try {
    const projectPlan = await ProjectPlan.findOne({
      where: {
         id: req.body.FormData.id
      }
    })
    await projectPlan.update({ overall_progress: req.body.FormData.overall_progress });


    // Team Strength

    if (req.body.team_strength) {
      for (var i = 0; i < req.body.team_strength.length; i++) {
        const ts = await Team.findOne({
          where: {
             id: req.body.team_strength[i].id
          }
        })
        await ts.update({
          "employee_name": req.body.team_strength[i].employee_name,
          "employee_code": req.body.team_strength[i].employee_code,
          "team": req.body.team_strength[i].team,
        })
      }
    }
    // Project Activities
    if (req.body.project_activities) {
      for (var i = 0; i < req.body.project_activities.length; i++) {
        const ts = await ProjectActivitie.findOne({
          where: {
             id: req.body.project_activities[i].id
          }
        })
        await ts.update({
          "status": req.body.project_activities[i].status,
          "progress": req.body.project_activities[i].progress
        })
      }
    }

    //Other Activities
    if (req.body.other_activities) {
      for (var i = 0; i < req.body.other_activities.length; i++) {
        const ts = await OtherActivitie.findOne({
          where: {
             id: req.body.other_activities[i].id
          }
        })
        await ts.update({
          "status": req.body.other_activities[i].status,
          "date": req.body.other_activities[i].date
        })
      }

    }


    // Success Message Return
    return res.status(200).json({
      "status": true,
      "message": "Data update successfully!"
    });
    // Error Message Return
  } catch (error) {
    return res.status(500).json({
      "status": false,
      "message": error.message
    })

  }

}

async function fetchProjectPlan(req, res, next) {
  try {
    let id = req.params.id;
    let project = await ProjectPlan.findOne({
      where: { id: `${id}` }
    });

    if (!project) {
      throw new Error("Project not found ");
    }


    // Find Years List
    var startDate = project.start_date;
    var startYear = startDate.getFullYear();

    var endDate = project.end_date;
    var endYear = endDate.getFullYear();
    var years = Array();

    for (i = startYear; i <= endYear; i++) years.push(i);

    // End Find Years List

    //Team 
    let teams = await Team.findAll({
      where: { project_plan_id: `${project.id}` }
    });



    //Project Activity
    let project_activity = await ProjectActivitie.findAll({
      where: { project_plan_id: `${project.id}` }
    });

    //Other Activity
    let other_activity = await OtherActivitie.findAll({
      where: { project_plan_id: `${project.id}` }
    });

    //Get Master data
    const centres = await Centre.findAll();
    const projects = await Project.findAll();
    const team_leader = await TeamLeader.findAll();
    const agencys = await FundingAgency.findAll();
  //End Get Master data

    // Success Message Return
    return res.status(200).json({
      status: true,
      data: project,
      years: years,
      teams: teams,
      projectActivity: project_activity,
      otherActivity: other_activity,
      centres: centres,
      projects: projects,
      team_leader: team_leader,
      agencys: agencys

    });

  } catch (error) {
    return res.status(501).json({
      status: false,
      message: error.message
    })

  }

  

}
async function projectPlanList(req, res, next) {
    try {
      let dataList= await ProjectPlan.findAll();
      const centres = await Centre.findAll();
      const projects = await Project.findAll();
      const team = await TeamLeader.findAll();
      const agencys = await FundingAgency.findAll();
      // Success Message Return
    return res.status(200).json({
          status: true,
          data: dataList,
          centres: centres,
          projects: projects,
          teams: team,
          agencys: agencys

    });
    } catch(error) {
      return res.status(501).json({
        status: false,
        message: error.message
      })
    }
}

async function fetchProjectPlanFinances(req, res, next) {
  try{
  let year = req.params.year;
  let projectPlanId = req.params.projectPlanId;

let finances =await Finances.findAll({
    where: {
        year: year,
        project_plan_id: projectPlanId
    }
})
return res.status(200).json({
  "status": true,
  "finances": finances
});

} catch (error) {
  return res.status(501).json({
    status: false,
    message: error.message
  })

}


}

async function saveProjectPlanFinancesBudget(req, res, next) {
    
    try {
      let project_plan_id = req.body.project_plan_id;
      let year = req.body.year;
      let quarter = req.body.quarter;
      let received_amt = req.body.received_amt;
      let date = req.body.date;
      let expenditure = req.body.expenditure;
      let balance = req.body.balance;
      let utilization = req.body.utilization;
      let finance_id = req.body.finance_id;

     
      if (!received_amt && !date && !expenditure && !balance && !utilization) {
          throw new Error("Invalid data to save");
      }

      // Create Centre
      let finance_budget = await FinanceBudget.create(req.body);


      // Send Success Response
      return res.status(200).json({
          status: true,
          message: "Successfully Saved",
      });

  } catch (error) {
      // Send error response
      return res.status(500).json({
          status: false,
          message: `Fail centre:- ${error}`,
    
      })
  }

    
}

async function financeRecieved (req, res, next) {
  try{
    for (var i = 0; i < req.body.finance_recieved.length; i++) {
      await FinanceRecieved.create({
        "project_plan_id": req.body.finance_recieved[i].project_plan_id,
        "year": req.body.finance_recieved[i].year,
        "amount_recieved": req.body.finance_recieved[i].amount_recieved,
        "amount_recieved_date": req.body.finance_recieved[i].amount_recieved_date,
        "amount_remark": req.body.finance_recieved[i].amount_remark
      })
    }
    return res.status(200).json({
      status:true,
      message:" Finance data saved successfully!"
    })
  }catch(err) {
    return res.status(500).json({
      status:false,
      message: " * All fields are mandatory please fill"
    })
  }

  
  return res.status(200).json({
    status:true,
    data: req.body
  })
}
module.exports = {
  insert,
  fetchMasterData,
  fetchProjectPlan,
  projectPlanList,
  fetchProjectPlanFinances,
  saveProjectPlanFinancesBudget,
  edit,
  financeRecieved
}