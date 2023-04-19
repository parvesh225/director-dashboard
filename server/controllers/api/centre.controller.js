const { Centre } = require("../../models/Centre");

// Add New Centre 
async function insert(req, res) {
console.log(req.body);
    try {
        const { centre_code, centre_name, short_name } = req.body;
        // console.log(centreCode, centreName);
        //Centre code and Centre name is required
        if (!centre_code || !centre_name || !short_name) {
            throw new Error("All fields are required");
        }

        // Create Centre
        let centre = await Centre.create({
            centre_code: centre_code,
            centre_name: centre_name,
            short_name: short_name,
        });


        // Send Success Response
        return res.status(200).json({
            status: true,
            message: "Centre add successfully!",
            row : centre
        });

    } catch (error) {
        // Send error response
        return res.status(500).json({
            status: false,
            message: `Fail centre:- ${error}`,
      
        })
    }

}

// Update
async function update(req, res) {
    const { centreCode, centreName } = req.body;
    let centreId = req.params.id;
    try {
        //Check user login ?
        let centre = await Centre.findOne({
            where: { id: `${centreId}` }
        });

        if (!centre) {
            throw new Error("Centre n't found ");
        }

        let updateCentre = await Centre.update({ 
            centre_code: centreCode,
            centre_name: centreName
         }, {
            where: {
                id: centreId
            }
        });

        if (!updateCentre) {
            throw new Error("Centre not update successfully!");
        }

        return res.status(200).json({
            status: true,
            message: "User Updated Successfully!",
            date: updateCentre,
        })
    } catch (error) {
        return res.status(501).json({
            status: false,
            message: error.message
        })

    }
}



// Get Centre List
async function getCentreList(req, res) {
    Centre.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Get Single Data 
async function getCentreById(req, res) {
    let centreId = req.params.id;
    Centre.findAll({
        where: {
            id: centreId
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
async function deleteCentre(req, res) {
    try {
        let centreId = req.params.id;

        let data = await Centre.destroy({
            where: {
                id: centreId
            }
        });
        return res.status(200).json({
            status: true,
            message: 'Centre Delete Successfuly',

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
    deleteCentre,
    getCentreById,
    getCentreList,
    update
}