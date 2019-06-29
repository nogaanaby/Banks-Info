var express = require('express');
var router = express.Router();
const fs = require('fs');

const branches = JSON.parse(fs.readFileSync('./banks.json'));
const banksNames = new Set();
const banksCodes = new Set();
branches.forEach((branch, i) => {
  banksNames.add(branch.Bank_Name[0]);
  banksCodes.add(branch.Bank_Code[0]);
});

router.get('/', function(req, res, next) {
  res.render('index', { action: '/', bankNames: Array.from(banksNames)});
});

router.post('/', function(req, res, next) {
  const bankName = req.body.bankName
  const currentBranchNames = [];
  let bankCode;
  branches.forEach((branch, i) => {
    if(branch.Bank_Name[0].split(' ').join('') === bankName ){
      currentBranchNames.push(branch.Branch_Name[0]);
      bankCode = parseInt(branch.Bank_Code[0]);
    }
  });
  console.log(bankName)
  console.log(bankCode)
  res.redirect(`/bank/${bankCode}`);
});

module.exports = router;
