'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product,{foreignKey:'users_id'})
      User.hasOne(models.Userinfo,{foreignKey:'user_id'})
    }
  };
  User.init({
    customer_name: DataTypes.TEXT,
    customer_email: DataTypes.STRING,
    customer_size: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        let salt = bcrypt.genSaltSync(8)
        var hash = bcrypt.hashSync(User.password, salt)
        User.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};