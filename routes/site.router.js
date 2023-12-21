const router = require('express').Router();
const siteController = require('../controllers/site.controller');
const requireLogin = require('../middlewares/requiresLogin');

router.get('/', requireLogin, siteController.getHome);
// router.get('/', siteController.getHome);

module.exports = router;