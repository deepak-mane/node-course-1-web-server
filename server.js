const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  // return 'Test';
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  // return 'Test';
  return text.toUpperCase()
});
// This will help to register handler to take care of the get request
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!');
  // res.send({
  //   name: 'Deepak',
  //   likes: [
  //     'Biking',
  //     'Hiking',
  //     'Playing Chess',
  //     'Playing Pool',
  //     'Programming'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'//,
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'//,
    // currentYear: new Date().getFullYear()
  });
});


// Bad Request Page
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to Handle Request'
  });
});
//This going to bind the app to port on machine
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
