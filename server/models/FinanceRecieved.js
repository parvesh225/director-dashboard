const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class FinanceRecieved extends Model {}

FinanceRecieved.init({    
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
      
    is_adjustment: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      },  
      year: {
      type: DataTypes.INTEGER,
      allowNull: false
      }, 
      amount_recieved: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amount_recieved_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount_remark: {
      type: DataTypes.TEXT,
      allowNull: true
      } 
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'FinanceRecieved' ,// We need to choose the model name
    tableName: 'finance_recieved',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {FinanceRecieved}