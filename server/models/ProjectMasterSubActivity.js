const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class ProjectMasterSubActivity extends Model {}


ProjectMasterSubActivity.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      project_activty_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subactivy_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
      
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'ProjectMasterSubActivity' ,// We need to choose the model name
    tableName: 'project_master_sub_activity',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {ProjectMasterSubActivity}