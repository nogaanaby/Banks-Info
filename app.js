const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('https');
const parseString = require('xml2js').parseString;
const fs = require('fs');
const bodyParser = require('body-parser')


//const indexRouter = require('./routes');
const bankNamesRouter = require('./routes/api/bankNames');
const branchNamesRouter = require('./routes/api/branchNames');
const branchRouter = require('./routes/api/branch');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// bodyParser Middleware
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', bankNamesRouter);
app.use('/banks', bankNamesRouter);
app.use('/bank', branchNamesRouter);
app.use('/branch', branchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function getData(){
  const url = 'https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_dnld_he.xml';

//faches the xml and save the data
const req = http.get(url, function(res) {
  let xml = '';
  res.on('data', function(chunk) {
    xml += chunk;
  });

  res.on('end', function() {
    parseString(xml, function (err, result) {
      const data = JSON.stringify(result.BRANCHES.BRANCH)
      fs.writeFileSync('banks.json', data);
    });
  });

});

req.on('error', function(err) {
  console.log(err)
});
}




module.exports = app;
