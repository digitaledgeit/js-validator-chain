var assert = require('assert');
var ValidatorChain = require('..');

describe('validator-chain', function() {

  describe('.validate()', function() {

    it('should not return immediately', function(done) {
      var after = false;

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          assert(after);
          done();
        })
      ;

      after = true;

    });

    it('should work with sync methods', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          done();
        })
      ;

    });

    it('should work with async methods', function(done) {

      function fn(value, next) {
        next(null, false);
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          done();
        })
      ;

    });

    it('should return an error when an error is thrown in a validator', function(done) {

      function fn(value) {
        throw new Error('Error!');
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          assert(err instanceof Error);
          done();
        })
      ;

    });

    it('should not return a context when the value is valid', function(done) {

      function fn(value) {
        return true;
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          assert.equal(ctx, undefined);
          done();
        })
      ;

    });

    it('should return a context when the value is invalid', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn, 'Error Message!')
        .validate('Hello World!', function(err, valid, ctx) {
          assert.equal(ctx, 'Error Message!');
          done();
        })
      ;

    });

    it('should return valid when the value is valid', function(done) {

      function fn(value) {
        return true;
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          assert(valid);
          done();
        })
      ;

    });

    it('should return invalid when the value is invalid', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .validate('Hello World!', function(err, valid, ctx) {
          assert(!valid);
          done();
        })
      ;

    });

    it('should run all the rules when the value is valid', function(done) {
      var called = 0;

      function fn(value) {
        ++called;
        return true;
      }

      ValidatorChain()
        .add(fn)
        .add(fn)
        .validate('Hello World!', function() {
          assert.equal(2, called);
          done();
        })
      ;

    });

    it('should only run the first rule when the value is invalid', function(done) {
      var called = 0;

      function fn(value) {
        ++called;
        return false;
      }

      ValidatorChain()
        .add(fn)
        .add(fn)
        .validate('Hello World!', function() {
          assert.equal(1, called);
          done();
        })
      ;

    });

    it('should return valid when the value is empty and validation is optional (bool)', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .optional(true)
        .validate('', function(err, valid, ctx) {
          assert(valid);
          done();
        })
      ;

    });

    it('should return invalid when the value is empty and validation is not optional (bool)', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .optional(false)
        .validate('', function(err, valid, ctx) {
          assert(!valid);
          done();
        })
      ;

    });

    it('should return valid when the value is empty and validation is optional (function)', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .optional(function() { return true; })
        .validate('', function(err, valid, ctx) {
          assert(valid);
          done();
        })
      ;

    });

    it('should return invalid when the value is empty and validation is not optional (function)', function(done) {

      function fn(value) {
        return false;
      }

      ValidatorChain()
        .add(fn)
        .optional(function() { return false; })
        .validate('', function(err, valid, ctx) {
          assert(!valid);
          done();
        })
      ;

    });

    it('should run a conditional rule when the condition is true', function(done) {
      var called = false;

      function fn(value) {
        return called = true;
      }

      function cond() {
        return true;
      }

      ValidatorChain()
        .add(fn, null, cond)
        .validate('Hello World!', function() {
          assert(called);
          done();
        })
      ;

    });

    it('should not run a conditional rule when the condition is false', function(done) {
      var called = false;

      function fn(value) {
        return called = true;
      }

      function cond() {
        return false;
      }

      ValidatorChain()
        .add(fn, null, cond)
        .validate('Hello World!', function() {
          assert(!called);
          done();
        })
      ;

    });

  });

});