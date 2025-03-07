const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Board = sequelize.define('Board', {
    name: {
      type: DataTypes.STRING(10),
      primaryKey: true
    },
    long_name: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  return Board; // Явный возврат модели
};