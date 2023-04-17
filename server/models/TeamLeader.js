const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class TeamLeader extends Model {}

TeamLeader.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      employee_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    
}, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'TeamLeader' ,// We need to choose the model name
    tableName: 'team_leader',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {TeamLeader}