const {Category, Product, User, Userinfo}= require('../models/index')
const { Op } = require("sequelize");
const { orderBy } = require('lodash');
class Controller {
  static home (req, res) {
    let user = req.session
    Product.findAll({
      include: Category,
      order: [['name','Desc']],
      where: {
        users_id: Number(user.userId)
      }
    })
    .then(data => {
      // console.log(req.session);
      res.render('home', {data: data, session: user})
    })
    .catch(err => res.send(err))
  }
  static orderBy(req,res){
    let text = req.query.by
    if (text == 'title'){
    console.log(text);
    let user = req.session
    Product.findAll({include: Category, order:[['name','Asc']],where: {
      users_id: Number(user.userId)
    }})
    .then(data=>res.render('home',{data:data,session: user}))
    .catch(err=>res.send(err))}
    else if(text == 'price'){
      let user = req.session
      Product.findAll({include: Category,order:[['price','Desc']],where: {
        users_id: Number(user.userId)
      }})
      .then(data=>res.render('home',{data:data,session: user}))
      .catch(err=>res.send(err))
    }
  }
  static orderbyPrice(req,res){
    let user = req.session
    Product.findAll({include: Category,order:[['price','Desc']],where: {
      users_id: Number(user.userId)
    }})
    .then(data=>res.render('home',{data:data,session: user}))
    .catch(err=>res.send(err))
  }
  static addShoes(req,res){
    res.render('addForm',{id: req.params.id})
  }
  static insertShoes (req,res){
    let {id, name, price,category,photo,size, stock}=req.body
    let newProduct = {users_id: id , name:name, price:price,categories_id:category,photo:photo,size:size, stock: stock}
    Product.create(newProduct)
    .then(data=>res.redirect('/'))
    .catch(err=>{
      err = err.errors.map(x=>{
        return x.message
      })
      res.send(err)})
  }
  static sell(req,res){
    Product.increment('stock',{by:-1,where:{id:req.params.id}})
    .then(data=>{
        Product.increment('sold',{by:+1,where:{id:req.params.id}})
        .then(data=>{
          
          res.redirect('/')
        })
        .catch(err=>res.send(err))
        })
    .catch(err=>res.send(err))
  }
  static delete (req,res){
    Product.destroy({where:{id:{
      [Op.eq]: req.params.id
    }}})
    .then(data=>res.redirect('/'))
    .catch(err=>res.send(err))
  }

  static performance(req, res) {
    let user = req.session
    Product.findAll({
      include: Category,
      orderBy: ['name', 'DESC'],
      where: {
        users_id: Number(user.userId)
      }
    })
    .then(data => {
      let cha = '' 
      data.forEach(el => {
        cha += el.name + ',' + el.sold + ':'
      }) 
      
      res.render('performance', {cha: cha})
    })
    .catch(err => res.send(err))
  }
}

module.exports = Controller