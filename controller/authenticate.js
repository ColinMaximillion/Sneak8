const passwordCheck = require('../helper/compareSync')
const {Category, Product, User, Userinfo}= require('../models/index')

class Authentication {
  static formLogin (req, res) {
    res.render('login')
  }
  static postLogin(req, res) {
    let {email, login} = req.body
    
    User.findOne({
      where: { customer_email: email}
    })
    .then (data => {
      if (data == null) {
        res.render('login', {msg: `You're not registered yet`})
      }
      else {
        let check = passwordCheck(login, data.password)
        if(check == true) {
          // console.log(req.session);
          req.session.email = data.customer_email
          req.session.userId = data.id
          req.session.name = data.customer_name
          req.session.isLogin = true
          req.session.role = "User"
          res.redirect('/')

        }
      }
    })
    .catch(err=> res.send(err))
  }

  static register (req, res) {
    res.render('register')
  }
  static postRegister (req, res) {
    let {customer_name, customer_size, customer_email, phone_number, password} = req.body
    User.create({customer_name, customer_email, customer_size, phone_number, password})
    .then(data => res.render('login', {msg: 'Register complete! Please Insert your account detail'}))
    .catch(err => res.send(err))
  }

  static logout (req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}

module.exports = Authentication