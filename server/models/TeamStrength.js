const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class TeamStrength extends Model { }

TeamStrength.init({
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
  team: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary_slab: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'TeamStrength',// We need to choose the model name
  tableName: 'team_strength',
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true
});


module.exports = { TeamStrength }