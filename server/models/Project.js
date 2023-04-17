const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class Project extends Model {}

Project.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      project_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    
    
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'Project' ,// We need to choose the model name
    tableName: 'project',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {Project}