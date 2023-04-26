const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class OtherActivitie extends Model {}

OtherActivitie.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    project_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
   
    activities: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'OtherActivitie' ,// We need to choose the model name
    tableName: 'other_activities',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = { OtherActivitie }