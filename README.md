# validator-chain

A simple validator chain for running multiple validators on a single input value.

## Features

- sync and async validators
- conditional validaiton
- error handling

## Installation

NPM:

    npm install --save @digitaledgeit/validator-chain

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

#### .optional(fn|bool)

Whether an empty value is considered valid and the validators should not be run.


#### .add(fn, ctx, when)

Add a new validator to the chain.

- fn - the validation method
- ctx - the validation context - optional and can be anything e.g. a message string
- when - a validation condition - if provided, the validation method is only run when the condition is true - optional function that returns a boolean

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
    
## License

The MIT License (MIT)

Copyright (c) 2015 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.