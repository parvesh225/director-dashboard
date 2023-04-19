const { TeamLeader } = require("../../models/TeamLeader");

// Add New Centre 
async function insert(req, res) {

    try {
        const { employee_code, employee_name } = req.body;
        if (!employee_code || !employee_name) {
            throw new Error("Employee name and employee code is required");
        }

        // Create employee
        let employee = await TeamLeader.create({
            employee_code: employee_code,
            employee_name: employee_name,
        });


        // Send Success Response
        return res.status(200).json({
            status: true,
            message: "TeamLeader add successfully!",
            row : employee
        });

    } catch (error) {
        // Send error response
        return res.status(500).json({
            status: false,
            message: `Fail Team Leader:- ${error}`
        })
    }

}

// Update
async function update(req, res) {
    const { employee_code, employee_name } = req.body;
    let teamLeaderId = req.params.id;
    try {
        
        let team = await TeamLeader.findOne({
            where: { id: `${teamLeaderId}` }
        });

        if (!team) {
            throw new Error("TeamLeader n't found ");
        }

        let updateTeamLeader = await TeamLeader.update({
            employee_code: employee_code,
            employee_name: employee_name
        }, {
            where: {
                id: teamLeaderId
            }
        });

        if (!updateTeamLeader) {
            throw new Error("Team leader not updated!");
        }

        return res.status(200).json({
            status: true,
            message: "TeamLeader Updated Successfully!",
            date: updateProject,
        })
    } catch (error) {
        return res.status(501).json({
            status: false,
            message: error.message
        })

    }
}



// Get Team Leader List
async function getTeamLeaderList(req, res) {
    TeamLeader.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Get Single Data 
async function getTeamLeaderById(req, res) {
    let teamLeaderId = req.params.id;
    TeamLeader.findAll({
        where: {
            id: teamLeaderId
        }
    }).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Delete Team Leaser 
async function deleteTeamLeader(req, res) {
    try {
        let teamLeaderId = req.params.id;

        let data = await TeamLeader.destroy({
            where: {
                id: teamLeaderId
            }
        });
        return res.status(200).json({
            status: true,
            message: 'TeamLeader Delete Successfuly',

        })
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: error.message
        })
    }

}

module.exports = {
    insert,
    getTeamLeaderById,
    getTeamLeaderList,
    deleteTeamLeader,
    update
}