var express = require('express');
var router = express.Router();
const fs = require('fs');

const branches = JSON.parse(fs.readFileSync('./banks.json'));

router.get('/:Bank_Code', function(req, res) {
  const currentBranchesNames=[]
  const bankCode = req.params.Bank_Code
  branches.forEach((branch, i) => {
    if(branch.Bank_Code[0] === req.params.Bank_Code){
      currentBranchesNames.push(branch.Branch_Name[0])
    }
  });
  if(currentBranchesNames.length == 0){
    res.send('sorry, there is no bank that matches this code');
  } else {
    res.render('index', { action: `/bank/${bankCode}`, bankNames: currentBranchesNames});
  }

});

router.post('/:Bank_Code', function(req, res, next) {
  const bankCode = req.params.Bank_Code
  console.log("from the second post func: ", bankCode)
  const branchName = req.body.bankName
  let branchCode = 0;
  branches.forEach((branch, i) => {
    if(branch.Bank_Code[0] === bankCode && branch.Branch_Name[0].split(' ').join('') === branchName ){
      branchCode = branch.Branch_Code[0];
    }
  });
  console.log(branchCode)
  res.redirect(`/branch/${bankCode}/${branchCode}`);
});

module.exports = router;
