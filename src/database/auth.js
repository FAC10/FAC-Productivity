const connect = require('./connect')
const bcrypt = require('bcrypt')

module.exports = (username, password, callback) => {
  connect.query(`
    SELECT username, password FROM auth
    WHERE username = $1;`, [username], (err, { rows: user }) => {

    if (err) return callback(new Error('Error getting user from database'))

    // If user exists then run bcrypt on the password
    user[0] ?
      bcrypt.compare(password, user[0].password, (err, authenticated) => {
        // If error then log and supply a nice message to the frontend
        err ? console.log(err) : ''
        err ? callback(new Error('Error authenticating user')) :
        // If password incorrect then supply an error message to the frontend
        !authenticated ? callback(new Error('Incorrect password')) :
        // If auth successful then callback true
        callback(null, true)
      }) :
    // Else error when no user
    callback(new Error('User not found'))

  })
}
