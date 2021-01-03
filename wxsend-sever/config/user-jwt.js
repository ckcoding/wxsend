const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys')
var db = Keys.db()
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secret
module.exports = passport => {
passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
      var userSql = 'SELECT * FROM `send`'
      db.query(userSql, (err, user) => {
        if (user) return done(null, user)
          return done(null, false)
      })
      db.end();
    }));
}