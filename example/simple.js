var validator = require('..');

function required(value) {
  return value !== '';
}

function digits(value) {
  return /^[0-9]+$/.test(value);
}

function length(value) {
  return value.length === 10;
}

validator()
  .add(required,    'Please enter a phone number')
  .add(digits,      'A phone number may only contain digits')
  .add(length,      'A phone number may only contain 10 digits')
  .validate('0123456789', function(err, valid, ctx) {
    if (err) return console.log(':( Uh oh an error occurred whilst trying to validate that phone number');
    if (valid) return console.log(':) Yay! You can type');
    if (!valid) return console.log(':( Try again: "'+ ctx+'"');
  })
;