# validator-chain

A simple validator chain for running multiple validators on a single input value.

## Features

- sync and async validators
- conditional validaiton
- error handling

## Installation

NPM:

    npm install --save validator-chain

Component:

    component install digitaledgeit/js-validator-chain

## Usage

A simple example:

    var validator = require('validator-chain');

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

    // Outputs ":) Yay! You can type"

See the [examples](./example) folder for more.

## API

### Methods

#### new ValidatorChain()

Create a new validation chain.

#### .add(fn, ctx, when)

Add a new validator to the chain.

- fn - the validation method
- ctx - the validation context - optional and can be anything e.g. a message string
- when - a validation condition - the validation method is only run when the condition is true - optional and must be a function that returns a boolean

#### .validate(value, callback)

Run the validation methods on a value and call the callback with the result.

Callback arguments:

- err - a error thrown by a sync method or a error returned by an async validation method e.g. problems connecting to a server that performs a unique validation
- valid - whether the value is valid or not
- ctx - the context of the failing validation method

### Writing a validator

There are many existing validation methods you can make use of
(e.g. [validator](https://www.npmjs.com/package/validator), [validation-methods](https://github.com/nib-components/validation-methods) or [validate-date](https://github.com/nib-health-funds/validate-date))
but if you require some custom logic then it's easy to create your own.

#### Sync

    function validator(value) {
        //throw new Error();    //return an error
        return true;            //return whether the value is valid
    }

#### Async

    function validator(value, next) {
        //next(new Error());    //return an error
        next(null, true);       //return whether the value is valid
    }