const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Board', {
    name: {
      type: DataTypes.STRING(10),
      primaryKey: true
    },
    long_name: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    hidden: DataTypes.BOOLEAN
  });
};