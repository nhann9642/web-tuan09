const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    // GET /user/signup
    getSignup: (req, res) => {
        res.render('signup');
    },

    // POST /user/signup
    async postSignup(req, res) {
        const { username } = req.body;

        const userFound = await User.findOne(username);

        if (userFound)
            res.json({ message: "Username existed" })
        else {
            const hash = bcrypt.hashSync(req.body.password, saltRounds);

            const user = new User({ ...req.body, password: hash });
            await User.insert(user);
            
            res.redirect('/user/login');
        };
    },

    // GET user/login
    getLogin: (req, res) => {
        res.render('login', {
            errorPw: '',
            username: '',
            password: ''
        });
    },

    // POST user/signup
    async postLogin(req, res) {
        const { username, password, remember } = req.body;

        const user = await User.findOne(username);
        let auth = false;

        let errorUsername = 'Username is not exist';
        let errorPw = '';

        if (user) {
            auth = bcrypt.compareSync(password, user.Password);
            errorUsername = '';
            errorPw = 'Password is not correct';
        }
        
        if (remember === 'true' ) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        } 

        req.session.auth = auth;
        req.session.username = username;

        if (auth) {
            res.redirect('/');
        } else {
            res.render('login', {
                errorPw,
                errorUsername,
                username,
                password,
            });
        }
    },

    // GET user/logout
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect('/');
        })
    }
}