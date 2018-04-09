const { JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_ENCRYPTION;

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const [err, user] = await User.findById(jwt_payload.user_id);

    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  }));
};
