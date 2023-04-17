const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class FundingAgency extends Model {}

FundingAgency.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      funding_agency_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    funding_agency_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'FundingAgency' ,// We need to choose the model name
    tableName: 'funding-agency',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {FundingAgency}