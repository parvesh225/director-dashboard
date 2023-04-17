const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class ProjectActivitie extends Model {}

ProjectActivitie.init({    
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
      type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    activities: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    progress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'ProjectActivitie' ,// We need to choose the model name
    tableName: 'project_activities',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = { ProjectActivitie }