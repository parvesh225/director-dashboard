const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class ProjectPlan extends Model { }

ProjectPlan.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  centre_name: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  project_name: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  project_head: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  project_brief: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  work_order: {
    type: DataTypes.STRING,
    allowNull: false
  },
  funding_agency: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nodal_officer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_no: {
    type: DataTypes.STRING,
    allowNull: false
  },
  allocated_budget: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  }


}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'ProjectPlan',// We need to choose the model name
  tableName: 'project_plan',
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true
});


module.exports = { ProjectPlan }