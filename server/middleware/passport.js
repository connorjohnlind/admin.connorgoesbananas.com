const { JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_ENCRYPTION;

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    let user;
    try {
      user = await User.findById(jwt_payload.user_id);
      if (user) return done(null, user);
    } catch (e) {
      return done(e, false);
    }
    return done(null, false);
  }));
};
