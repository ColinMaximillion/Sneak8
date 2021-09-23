function isLoginMiddleware (req, res, next) {
  if(req.session.isLogin) {
    console.log('have logged in', req.session);
    next()
  }
  else {
    console.log('please log in');
    res.redirect('/login')
  }
}

module.exports = isLoginMiddleware