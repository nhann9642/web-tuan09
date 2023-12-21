module.exports = function(req, res, next) { 
    if (req.session && req.session.auth) {
        return next();
    } else {
        res.render('login');
    }
}