const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class FinanceBudget extends Model { }

FinanceBudget.init({
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
  finance_id: {
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
  
  received_amt: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  date: {
    type:DataTypes.DATE,
    allowNull: true
  },
  expenditure: {
    type: DataTypes.FLOAT,
    allowNull:true
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull:true
  },
  utilization: {
    type: DataTypes.STRING,
    allowNull:true
  }
  
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'FinanceBudget',// We need to choose the model name
  tableName: 'finance_budget',
  createdAt: "created_at",
  updatedAt: "updated_at",
  underscored: true
});


module.exports = { FinanceBudget }