const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class Team extends Model { }

Team.init({
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

  position: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary_slab: {
    type: DataTypes.STRING,
    allowNull: true
  },
  employee_code: {
    type: DataTypes.STRING,
    allowNull: true,
    // unique: true,

  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true
  },
  team_strength_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'Team',// We need to choose the model name
  tableName: 'teams',
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true
});


module.exports = { Team }