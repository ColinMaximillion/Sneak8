const bcrypt = require('bcryptjs')

function passwordCheck(password, db) {
  return bcrypt.compareSync(password, db)
}

module.exports = passwordCheck