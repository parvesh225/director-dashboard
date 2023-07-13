const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class Finances extends Model { }

Finances.init({
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
  
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  budget_head: {
    type: DataTypes.STRING,
    allowNull: false
  },
  allocated_fund: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  milestone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expenditure: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'Finances',// We need to choose the model name
  tableName: 'finances',
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true
});


module.exports = { Finances }