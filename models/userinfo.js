'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Userinfo.belongsTo(models.User,{foreignKey:'user_id'})
    }
  };
  Userinfo.init({
    user_id: DataTypes.INTEGER,
    customer_name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Userinfo',
  });
  return Userinfo;
};