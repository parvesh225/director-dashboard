const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class ProjectActivity extends Model {}

ProjectActivity.init({    
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
      project_master_activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    project_master_activity_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      project_master_sub_activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    project_master_sub_activity_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
     
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    expected_entries: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    current_entries: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    quarter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    original_file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tasks: {
      type: DataTypes.VIRTUAL
    },
    project_master_sub_activity:{
      type: DataTypes.VIRTUAL
    }

  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'ProjectActivity' ,// We need to choose the model name
    tableName: 'project_activity',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = { ProjectActivity }