var express = require('express');
var router = express.Router();
const fs = require('fs');

const branches = JSON.parse(fs.readFileSync('./banks.json'));


router.get('/:Bank_Code', function(req, res) {
  const currentBranchesNames=[]
  branches.forEach((branch, i) => {
    if(branch.Bank_Code[0] === req.params.Bank_Code){
      currentBranchesNames.push(branch.Branch_Name[0])
    }
  });
  if(currentBranchesNames.length == 0){
    currentBranchesNames[0] = "sorry, there's no bank with this bank code"
  }
  res.send(currentBranchesNames);
});

module.exports = router;
