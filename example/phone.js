var validator = require('validator-chain');

function isMobilePhone() {
  return true; //
}

function isNotMobilePhone() {
  return !isMobilePhone();
}

function validatephone_number(value) {
  return /^[0][1-9]{9}/.test(value);
}

validator()
  .add(required,        'Please enter your phone number')
  .add(phone_number,    'Please enter a valid mobile phone number', isMobilePhone)
  .add(phone_number,    'Please enter a valid landline number',     isNotMobilePhone)
  .validate('Aus Gov Health!!!', function(err, valid, ctx) {
    console.log(arguments);
  })
;
