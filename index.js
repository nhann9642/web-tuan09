const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { create } = require('express-handlebars');
const session = require('express-session')
const methodOverride = require('method-override')
const app = express();

const secret = 'somesecret';
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'somesecret',
  // cookie: {maxAge: 60000 }
}));

app.use(methodOverride('_method'))

app.use(express.static('public'));

const hbs = create({
  extname: '.hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

const siteRouter = require('./routes/site.router');
const apiRouter = require('./routes/api.router');
const userRouter = require('./routes/user.router');
const categoryRouter = require('./routes/category.router');

app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/category', categoryRouter);
app.use('/', siteRouter);

 
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
