const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class ProjectMasterActivity extends Model {}


ProjectMasterActivity.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
      type: DataTypes.STRING,
      allowNull: false
    },
      
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'ProjectMasterActivity' ,// We need to choose the model name
    tableName: 'project_master_activity',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {ProjectMasterActivity}