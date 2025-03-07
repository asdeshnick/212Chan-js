module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Moderator', {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      permissions: DataTypes.JSON
    });
  };