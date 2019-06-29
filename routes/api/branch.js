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
  res.render('branch', { branch: currBranch});
  //res.send(JSON.stringify(currBranch));
});


module.exports = router;
