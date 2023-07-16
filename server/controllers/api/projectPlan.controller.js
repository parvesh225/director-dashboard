const { ProjectPlan } = require("../../models/ProjectPlan");
const { TeamStrength } = require("../../models/TeamStrength");
const { Team } = require("../../models/Team");
const { Finances } = require("../../models/Finances");
const { FinanceBudget } = require("../../models/FinanceBudget");
const { ProjectActivity } = require("../../models/ProjectActivity");
const { OtherActivitie } = require("../../models/OtherActivitie");
const { Centre } = require("../../models/Centre");
const { Project } = require("../../models/Project");
const { TeamLeader } = require("../../models/TeamLeader");
const { FundingAgency } = require("../../models/FundingAgency");
const { FinanceRecieved } = require("../../models/FinanceRecieved");
const { db } = require("../../utils/db.utill");
const { ProjectMasterActivity } = require("../../models/ProjectMasterActivity");
const { ProjectMasterSubActivity } = require("../../models/ProjectMasterSubActivity");
const { ProjectActivityTask } = require("../../models/ProjectActivityTask");

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

  const { centre_name, project_name, team_head, funding_ministry, project_brief, work_order, nodal_officer, contact_no, allocated_budget, start_date, end_date } = req.body.FormData;

  if (!centre_name || !project_name || !team_head || !funding_ministry || !work_order || !nodal_officer || !contact_no || !allocated_budget || !start_date || !end_date) {
    return res.status(500).json({
      "status": false,
      "message": "All * fields are mandatory"
    })
  }

  if (!req.body.team_strength) {
    return res.status(500).json({
      "status": false,
      "message": "Team Strength is required"
    })
  }

  if (req.body.team_strength) {
    var isValid = true;
    for (var i = 0; i < req.body.team_strength.length; i++) {
      var obj = req.body.team_strength[i];

      if (!obj.team || !obj.position || !obj.experience || !obj.qualification || !obj.salary_slab) {
        isValid = false;
      }
    }
    if (!isValid) {
      return res.status(500).json({
        "status": false,
        "message": "Invalid data in team strength"
      })
    }
  }

  // Validation for Finances
  if (!req.body.finances) {
    return res.status(500).json({
      "status": false,
      "message": "Finances is required"
    })
  }
  if (req.body.finances) {
    var isValid = true;
    for (var i = 0; i < req.body.finances.length; i++) {
      var obj = req.body.finances[i];

      if (!obj.year || !obj.budget_head || !obj.allocated_fund) {
        isValid = false;
      }
    }
    if (!isValid) {
      return res.status(500).json({
        "status": false,
        "message": "Invalid data in finances"
      })
    }
  }

  if (!req.body.project_activities) {
    return res.status(500).json({
      "status": false,
      "message": "Project activities is required"
    })
  }

  if (req.body.project_activities) {

    for (var i = 0; i < req.body.project_activities.length; i++) {
      var obj = req.body.project_activities[i];

      if (!obj.type || !obj.start_date || !obj.end_date || !obj.activities) {
        return res.status(500).json({
          "status": false,
          "message": "Invalid data in project activities"
        })
      }
    }

  }

  //transaction begin
  const t = await db.transaction();
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

    }, {
      transaction: t
    });
    // Team Strength

    if (req.body.team_strength) {
      for (var i = 0; i < req.body.team_strength.length; i++) {
        await TeamStrength.create({
          "project_plan_id": project.id,
          "team": req.body.team_strength[i].team, //number of team
          "position": req.body.team_strength[i].position,
          "experience": req.body.team_strength[i].experience,
          "qualification": req.body.team_strength[i].qualification,
          "salary_slab": req.body.team_strength[i].salary_slab
        }, {
          transaction: t
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
        }, {
          transaction: t
        })
      }
    }

    // Project Activities
    if (req.body.project_activities) {
      for (var i = 0; i < req.body.project_activities.length; i++) {
        await ProjectActivity.create({
          "project_plan_id": project.id,
          "type": req.body.project_activities[i].type,
          "start_date": req.body.project_activities[i].start_date,
          "end_date": req.body.project_activities[i].end_date,
          "duration": req.body.project_activities[i].duration,
          "activities": req.body.project_activities[i].activities,
          "remarks": req.body.project_activities[i].remarks
        }, {
          transaction: t
        })
      }
    }

    //Other Activities
    if (req.body.other_activities) {
      for (var i = 0; i < req.body.other_activities.length; i++) {
        var eachAct = req.body.other_activities[i]
        if (eachAct && eachAct.date && eachAct.activities) {
          await OtherActivitie.create({
            "project_plan_id": project.id,
            "activities": req.body.other_activities[i].other_activity,
            "date": req.body.other_activities[i].other_date
          }, {
            transaction: t
          })
        }
      }
    }

    //if successfully insert  data in all table
    await t.commit();

    // Success Message Return
    return res.status(200).json({
      "status": true,
      "message": "Data inserted successfully!",
      "data": req.body
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      "status": false,
      "message": error.message,
      "data": req.body
    })

  }

}
async function edit(req, res, next) {

  if (!req.body.finance_recieved) {
    return res.status(500).json({
      "status": false,
      "message": "Please select year & quarter"
    })
  }

  if (req.body.finance_recieved) {
    var isValid = true;
    for (var j = 0; j < req.body.finance_recieved.length; j++) {
      var objV = req.body.finance_recieved[j];
      if (!objV.amount_recieved || !objV.amount_recieved_date) {
        isValid = false
      }
    }

    if (isValid === false) {
      return res.status(500).json({
        "status": false,
        "message": "Invalid data to save in received amount. Please select year & quarter"
      })
    }
  }

  try {
    const projectPlan = await ProjectPlan.findOne({
      where: {
        id: req.body.FormData.id
      }
    })
    await projectPlan.update({ overall_progress: req.body.FormData.overall_progress });


    // Team Strength

    if (req.body.team_strength) {

      //delete all team
      const ts = await Team.destroy({
        where: {
          project_plan_id: projectPlan.id
        }
      })
      for (var i = 0; i < req.body.team_strength.length; i++) {
        await Team.create({
          "project_plan_id": projectPlan.id,
          "team_strength_id": req.body.team_strength[i].team_strength_id,
          "position": req.body.team_strength[i].position,
          "experience": req.body.team_strength[i].experience,
          "qualification": req.body.team_strength[i].qualification,
          "salary_slab": req.body.team_strength[i].salary_slab,
          "employee_name": req.body.team_strength[i].employee_name,
          "employee_code": req.body.team_strength[i].employee_code,
          "remark": req.body.team_strength[i].remark
        })

      }
    }

    // Project Activities
    if (req.body.project_activities) {
      for (var i = 0; i < req.body.project_activities.length; i++) {
        const ts = await ProjectActivity.findOne({
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

    if (req.body.finances) {
      for (var i = 0; i < req.body.finances.length; i++) {
        const ts = await Finances.findOne({
          where: {
            id: req.body.finances[i].finance_id
          }
        })

        await ts.update({
          "expenditure": req.body.finances[i].expenditure,
          "allocated_fund": req.body.finances[i].allocated_fund,

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

    if (req.body.finance_recieved) {
      var isValid = true;
      for (var j = 0; j < req.body.finance_recieved.length; j++) {
        var objV = req.body.finance_recieved[j];
        if (!objV.amount_recieved || !objV.amount_recieved_date) {
          isValid = false
        }
      }

      if (isValid === false) {
        return res.status(500).json({
          "status": false,
          "message": "Invalid data to save in received amount"
        })
      }
      var year = req.body.finance_recieved[0].year;
      const ts = await FinanceRecieved.destroy({
        where: {
          project_plan_id: projectPlan.id,
          year: year
        }
      })
      for (var i = 0; i < req.body.finance_recieved.length; i++) {
        await FinanceRecieved.create({
          "project_plan_id": req.body.finance_recieved[i].project_plan_id,
          "year": req.body.finance_recieved[i].year,
          "amount_recieved": req.body.finance_recieved[i].amount_recieved,
          "amount_recieved_date": req.body.finance_recieved[i].amount_recieved_date,
          "amount_remark": req.body.finance_recieved[i].amount_remark,
          "is_adjustment": req.body.finance_recieved[i].is_adjustment
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

    let teamStrength = await TeamStrength.findAll({
      where: { project_plan_id: `${project.id}` }
    })



    //Project Activity
    let project_activity = await ProjectActivity.findAll({
      where: { project_plan_id: `${project.id}` }
    });

    // new Project Activity

    let project_activity2 = await ProjectMasterActivity.findAll({
      attributes: ['id', 'name']
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
      projectActivity: [],
      otherActivity: other_activity,
      centres: centres,
      projects: projects,
      team_leader: team_leader,
      agencys: agencys,
      teamStrength: teamStrength,
      project_master_activity: project_activity2
    });

  } catch (error) {
    return res.status(501).json({
      status: false,
      message: error.message
    })

  }



}

async function readSubCategory(req, res, next) {
  try {
    let master_activity_id = req.params.activityMasterId;


    const subCatagoryList = await ProjectMasterSubActivity.findAll({
      where: {
        project_activty_id: master_activity_id
      }
    });

    // Success Message Return
    return res.status(200).json({
      status: true,
      project_master_sub_activity: subCatagoryList

    });
  } catch (error) {
    return res.status(501).json({
      status: false,
      message: error.message
    })
  }
}

async function readProjectActivity(req, res, next) {
  try {
    let year = req.params.year;
    let projectPlanId = req.params.projectPlanId;


    const project_activities = await ProjectActivity.findAll({
      where: {
        year: year,
        project_plan_id: projectPlanId
      }
    });

    let obj = []
    for (var i = 0; i < project_activities.length; i++) {
      let eachObj = project_activities[i]
      const tasks = await readTaskByProjectActivity(eachObj.id)
      eachObj.tasks = tasks
      const masterSubActivity = await ProjectMasterSubActivity.findAll({
        where: {
          project_activty_id: eachObj.project_master_activity_id
        }
      })
      eachObj.project_master_sub_activity =masterSubActivity
      obj.push(eachObj)
    }

    // Success Message Return
    return res.status(200).json({
      status: true,
      project_activity: obj

    });
  } catch (error) {
    return res.status(501).json({
      status: false,
      message: error.message
    })
  }
}
async function readTaskByProjectActivity(id) {
  return await ProjectActivityTask.findAll({
    where: {
      project_activity_id: id
    }
  });
}

async function projectPlanList(req, res, next) {
  try {
    let dataList = await ProjectPlan.findAll();
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
  } catch (error) {
    return res.status(501).json({
      status: false,
      message: error.message
    })
  }
}

async function fetchProjectPlanFinances(req, res, next) {
  try {
    let year = req.params.year;
    let projectPlanId = req.params.projectPlanId;

    let finances = await Finances.findAll({
      where: {
        year: year,
        project_plan_id: projectPlanId
      }
    })
    let finance_received = await FinanceRecieved.findAll({
      where: {
        year: year,
        project_plan_id: projectPlanId
      }
    })
    let total = 0.00
    finances.forEach(element => {
      total += element.allocated_fund
    });

    return res.status(200).json({
      "status": true,
      "finances": finances,
      "finance_received": finance_received,
      "total": total
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

async function saveProjectActivitywithTask(req, res, next) {
    let year = req.params.year;
    let projectPlanId = req.params.projectPlanId;
    let requestData = req.body;
    console.log(requestData);

    const project_activities = await ProjectActivity.findAll({
      where: {
        year: year,
        project_plan_id: projectPlanId
      }
    });

    console.log(project_activities);

    //destroy all select task by year and plain id
    project_activities.forEach((item, index) => {
      deleteTaskByProjectActivity(item.id)
    });

    //destroy all select activity by year and plain id
    await ProjectActivity.destroy({
      where: {
        year: year,
        project_plan_id: projectPlanId
      }
    });

    const t = await db.transaction();

    for (var i = 0; i < requestData.length; i++) {
      let obj = requestData[i];
      const masterActivity = await ProjectMasterActivity.findOne({
        where: {
          id: obj.project_master_activity_id
        }
      })
      const masterSubActivity = await ProjectMasterSubActivity.findOne({
        where: {
          project_activty_id: obj.project_master_activity_id,
          id: obj.project_master_sub_activity_id
        }
      })

      let projectActivity = await ProjectActivity.create({
        project_plan_id: projectPlanId,
        project_master_activity_id: obj.project_master_activity_id,
        project_master_activity_name: masterActivity.name,
        project_master_sub_activity_id: obj.project_master_sub_activity_id,
        project_master_sub_activity_name: masterSubActivity.subactivy_name,
        start_date: obj.start_date,
        end_date: obj.end_date,
        expected_entries: obj.expected_entries,
        current_entries: obj.current_entries,
        year: year
      }, {
        transaction: t
      });
      for (var j = 0; j < obj.tasks.length; j++) {
        let task = obj.tasks[j];
        let projectActivityTask = await ProjectActivityTask.create({
          project_plan_id: projectPlanId,
          project_activity_id: projectActivity.id,
          task: task.task
  
        }, {  
          transaction: t
        });
  

      }

    }

      // Success Message Return
      await t.commit();

      // Success Message Return
      return res.status(200).json({
        "status": true,
        "message": "Data inserted successfully!"
      });
    

  }

async function deleteTaskByProjectActivity(id) {
    await ProjectActivityTask.destroy({
      where: {
        project_activity_id: id
      }
    });
  }

  module.exports = {
    insert,
    fetchMasterData,
    fetchProjectPlan,
    projectPlanList,
    fetchProjectPlanFinances,
    saveProjectPlanFinancesBudget,
    edit,
    readSubCategory,
    readProjectActivity,
    saveProjectActivitywithTask
  }