const { DataTypes, Model } = require('sequelize');
const { db } = require('../utils/db.utill');

class Centre extends Model {}

Centre.init({    
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      centre_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    centre_name: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: true
      },  
  }, {
    // Other model options go here
    sequelize : db, // We need to pass the connection instance
    modelName: 'Centre' ,// We need to choose the model name
    tableName: 'centre',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored:true
  });


  module.exports = {Centre}