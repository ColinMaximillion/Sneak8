'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{foreignKey:'categories_id'})
      Product.belongsTo(models.User, {foreignKey: 'users_id'})
    }

    get inRupiah() {
      var reverse = this.price.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return `Rp.${ribuan}`
    }
  };
  Product.init({
    users_id: {type:DataTypes.INTEGER,allowNull:false},
    order_date: {type:DataTypes.DATE},
    photo: {type:DataTypes.TEXT,allowNull:false,validate:{
      notEmpty: {
        msg: 'Foto harus diisi'
      }
    }},
    name: {type:DataTypes.TEXT,allowNull:false,validate:{
        notEmpty: {
          msg: 'Nama harus diisi'
        }
      }},
    size: {type:DataTypes.STRING,allowNull:false,validate:{
      notEmpty: {
        msg: 'Size harus diisi'
      }
    }},
    price: {type:DataTypes.INTEGER,allowNull:false,validate:{
      notEmpty: {
        msg: 'Price harus diisi'
      }
    }},
    stock: {type:DataTypes.INTEGER,allowNull:false,validate:{
      notEmpty:{
        msg: 'Stock harus diisi'
      }
    }},
    categories_id:{type:DataTypes.INTEGER,allowNull:false,validate:{
      notEmpty:{
        msg: 'category harus diisi'
      }
    }},
    sold: {type:DataTypes.INTEGER}
  }, {
    hooks: {
      beforeCreate:(product, options)=> {
        product.order_date = new Date();
        product.sold = 0
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};