const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/student');
    }
});

app.get('/cards', (req, res) => {
    res.render('cards', { prompt: "Who is buried in Grant's tomb?" });
});

app.get('/student', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('student');
  }
});

app.post('/student', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/bye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/student');
});

app.use((err, req, res, next) => {
//   res.locals.error = err;
  res.status(err.status);
  res.render('error', {error: err});
});

app.listen(3000, () => {
    console.log('Running at running on localhost:3000')
});