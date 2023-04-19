const { FundingAgency } = require("../../models/FundingAgency");

// Add New Centre 
async function insert(req, res) {

    try {
        const { agency_code, agency_name } = req.body;

        if (!agency_code || !agency_name) {
            throw new Error("Funding code and name is required");
        }

        // Create Funding Agency
        let agency = await FundingAgency.create({
            agency_code: agency_code,
            agency_name: agency_name,
        });


        // Send Success Response
        return res.status(200).json({
            status: true,
            message: "Funding Agency add successfully!",
            row : agency
        });

    } catch (error) {
        // Send error response
        return res.status(500).json({
            status: false,
            message: `Fail Funding Agency:- ${error}`
        })
    }

}

// Update
async function update(req, res) {
    const { funding_agency_code, funding_agency_name } = req.body;
    let fundingId = req.params.id;
    try {
        
        let funding = await FundingAgency.findOne({
            where: { id: `${fundingId}` }
        });

        if (!funding) {
            throw new Error("FundingAgency n't found ");
        }

        let updateFunding = await FundingAgency.update({ 
            funding_agency_code:funding_agency_code,
            funding_agency_name:funding_agency_name
         }, {
            where: {
                id: fundingId
            }
        });

        if (!updateFunding) {
            throw new Error("Funding agency not update successfully!");
        }

        return res.status(200).json({
            status: true,
            message: "Funding agency updated successfully!",
            date: updateFunding,
        })
    } catch (error) {
        return res.status(501).json({
            status: false,
            message: error.message
        })

    }
}



// Get Funding Agency List
async function getFundingAgencyList(req, res) {
    FundingAgency.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Get Single Data 
async function getFundingById(req, res) {
    let fundingId = req.params.id;
    FundingAgency.findAll({
        where: {
            id: fundingId
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
async function deleteFundingAgency(req, res) {
    try {
        let fundingId = req.params.id;

        let data = await FundingAgency.destroy({
            where: {
                id: fundingId
            }
        });
        return res.status(200).json({
            status: true,
            message: 'Funding agency Delete Successfuly',

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
    deleteFundingAgency,
    getFundingById,
    getFundingAgencyList,
    update
}