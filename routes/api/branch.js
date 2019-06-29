var express = require('express');
var router = express.Router();
const fs = require('fs');

const branches = JSON.parse(fs.readFileSync('./banks.json'));

router.get('/:Bank_Code/:Branch_Code', function(req, res) {
  const bankCode = req.params.Bank_Code
  const branchCode = req.params.Branch_Code
  let currBranch;
  branches.forEach((branch, i) => {
    if(branch.Bank_Code[0] === bankCode && branch.Branch_Code[0] === branchCode ){
      currBranch = branch;
    }
  });
  if(currBranch == null){
    res.send('sorry, I could not find a branch that matches those details');
  } else {
    res.render('branch', { branch: currBranch});
  }
});

router.get('/', function(req, res) {
  res.send('sorry, you have to choose a bank and branch name');
});

router.get('/:bank_code', function(req, res) {
  res.send('sorry, you should type the branch code too');
});

module.exports = router;
