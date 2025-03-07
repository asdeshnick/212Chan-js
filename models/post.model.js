const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Post', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    board: DataTypes.STRING(10),
    name: DataTypes.STRING(50),
    text: DataTypes.TEXT,
    fname: DataTypes.STRING(255),
    op_id: DataTypes.BIGINT,
    subject: DataTypes.STRING(100),
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    last_bump: DataTypes.DATE
  }, {
    timestamps: false
  });
  
};