var express = require('express');
var router = express.Router();
const fs = require('fs');

const branches = JSON.parse(fs.readFileSync('./banks.json'));
const banksNames = new Set();
branches.forEach((branch, i) => {
  banksNames.add(branch.Bank_Name[0]);
});


router.get('/', function(req, res, next) {
  res.send(Array.from(banksNames));
});

module.exports = router;
