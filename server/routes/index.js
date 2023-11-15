const express = require('express');//fetch the already present instance of express
const router = express.Router();
const passport = require('passport');
//adding controller
const homeController = require('../controllers/home_controller');

router.get('/', passport.checkAuthentication, homeController.home);

router.use('/users', require('./users'));
router.use('/child', require('./child'));
router.use('/admin', require('./admin'));
module.exports = router;
