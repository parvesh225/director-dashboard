const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class ProjectActivityTask extends Model {}

ProjectActivityTask.init({    
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
      project_activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      task: {
        type: DataTypes.STRING(1000) ,
        allowNull: false
      },
   
    
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'ProjectActivityTask' ,// We need to choose the model name
    tableName: 'project_activity_tasks',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = { ProjectActivityTask }