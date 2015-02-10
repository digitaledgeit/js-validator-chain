var ValidatorChain = require('..');

function required(value) {
  return value !== undefined && value !== null && value !== '';
}

function transferring() {
  return true; //get this from somewhere else
}

function fund_name(value) {
  return /^[a-zA-Z ]+$/.test(value);
}

ValidatorChain()
  .add(required,  'Please enter your current fund name',   transferring)
  .add(fund_name, 'Please enter a valid fund name',        transferring)
  .validate('Aus Gov Health!!!', function(err, valid, ctx) {
    console.log(arguments);
  })
;