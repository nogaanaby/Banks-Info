var express = require('express');
var router = express.Router();
const fs = require('fs');

const branches = JSON.parse(fs.readFileSync('./banks.json'));
const banksNames = new Set();
const branchNames = [];
branches.forEach((branch, i) => {
  banksNames.add(branch.Bank_Name[0]);
  branchNames.push(branch.Branch_Name[0]);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', bankNames: Array.from(banksNames), branchNames: branchNames });
});

router.post('/', function(req, res, next) {
  const bankName = req.body.bankName
  console.log(bankName)
  res.render('index', { title: bankName, bankNames: Array.from(banksNames), branchNames: branchNames });
});

module.exports = router;
