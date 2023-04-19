const { Project } = require("../../models/Project");

// Add New Project 
async function insert(req, res) {

    try {
        const { project_code, project_name } = req.body;
        if (!project_code || !project_name) {
            throw new Error("Project code and  name is required");
        }

        let project = await Project.create({
            project_code: project_code,
            project_name: project_name,
        });


        // Send Success Response
        return res.status(200).json({
            status: true,
            message: "Project add successfully!",
            row : project
        });

    } catch (error) {
        // Send error response
        return res.status(500).json({
            status: false,
            message: `Fail project:- ${error}`
        })
    }

}

// Update
async function update(req, res) {
    const { project_code, project_name } = req.body;
    let projectId = req.params.id;
    try {
        //Check user login ?
        let project = await Project.findOne({
            where: { id: `${projectId}` }
        });

        if (!project) {
            throw new Error("Project n't found ");
        }

        let updateProject = await Project.update({
            project_code: project_code,
            project_name: project_name
        }, {
            where: {
                id: projectId
            }
        });

        if (!updateProject) {
            throw new Error("Project not updated!");
        }

        return res.status(200).json({
            status: true,
            message: "User Updated Successfully!",
            date: updateProject,
        })
    } catch (error) {
        return res.status(501).json({
            status: false,
            message: error.message
        })

    }
}



// Get Project List
async function getProjectList(req, res) {
    Project.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Get Single Data 
async function getProjectById(req, res) {
    let projectId = req.params.id;
    Project.findAll({
        where: {
            id: projectId
        }
    }).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Delete Centre 
async function deleteProject(req, res) {
    try {
        let projectId = req.params.id;

        let data = await Project.destroy({
            where: {
                id: projectId
            }
        });
        return res.status(200).json({
            status: true,
            message: 'Project Delete Successfuly',

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
    getProjectById,
    getProjectList,
    deleteProject,
    update
}