const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secret
var db = Keys.db()
module.exports = passport => {
passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
      var userSql = 'SELECT * FROM `send`'
      db.query(userSql, (err, user) => {
        if (user) return done(null, user)
          db.end();
          return done(null, false)
      })
      
    }));
}