const express = require("express");
const Authentication = require("../controller/authenticate");
const Controller = require("../controller/controller");
const isLoginMiddleware = require("../middlewares/isLoginMiddleware");
const router = express.Router()


router.get('/login',Authentication.formLogin)
router.post('/login',Authentication.postLogin)
router.get('/register', Authentication.register)
router.post('/register', Authentication.postRegister)
router.get('/logout',Authentication.logout)

router.use(isLoginMiddleware)
router.get('/performance', Controller.performance)
router.get('/', Controller.home)
router.get('/sort',Controller.orderBy)
router.get('/add/:id',Controller.addShoes)
router.post('/add',Controller.insertShoes)
router.get('/sell/:id', Controller.sell)
router.get('/delete/:id', Controller.delete)
module.exports = router