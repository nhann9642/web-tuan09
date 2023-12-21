const router = require('express').Router();
const apiController = require('../controllers/api.controller');

router.get('/user/check-username', apiController.checkUsername)

module.exports = router;