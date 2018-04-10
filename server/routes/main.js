const express = require('express');
const passport = require('passport');

const router = express.Router();

const UserController = require('../controllers/UserController');

require('./../middleware/passport')(passport);

router.post('/users', UserController.create);
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);
// router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update);
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove);
router.post('/users/login', UserController.login);

module.exports = router;
