const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userController');

require('./../middleware/passport')(passport);

router.post('/users', userController.create);
router.get('/users', passport.authenticate('jwt', { session: false }), userController.get);
router.put('/users', passport.authenticate('jwt', { session: false }), userController.update);
router.delete('/users', passport.authenticate('jwt', { session: false }), userController.remove);
router.post('/users/login', userController.login);
// router.post('/users/renew', userController.renew);

module.exports = router;
