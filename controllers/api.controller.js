const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    // GET /api/user/check-username?username=...
    async checkUsername(req, res) {
        const { username = '' } = req.query;
        const isExisted = (await User.findOne(username) === null ? false : true);

        res.json({ isExisted });
    },


}