/**
 * A validator chain
 * @constructor
 * @returns {ValidatorChain}
 */
function ValidatorChain() {

  if (!(this instanceof ValidatorChain)) {
    return new ValidatorChain();
  }

  this._validators = [];
}

/**
 * Add a validator to the chain
 * @param   {function(*, [function])}   fn        The validator function
 * @param   {Object}                    [ctx]     The validator context
 * @param   {function()}                [when]    The validator condition
 * @returns {ValidatorChain}
 */
ValidatorChain.prototype.add = function(fn, ctx, when) {
  this._validators.push({
    fn:   fn,
    ctx:  ctx,
    when: when
  });
  return this;
};

/**
 * Check whether a value matches the rules
 * @param   {*}             value
 * @param   {function()}    callback
 * @returns {ValidatorChain}
 */
ValidatorChain.prototype.validate = function(value, callback) {
  var self = this, count = 0, validator = null;

  function next(err, valid) {

    //there's an error, now we can finish
    if (err) {
      return callback(err, valid, validator.ctx);
    }

    //the value is invalid, now we can finish
    if (!valid) {
      return callback(err, valid, validator.ctx);
    }

    //we've run all the validators, now we can finish
    if (count >= self._validators.length) {
      return callback(err, valid);
    }

    //get the next validator
    validator = self._validators[count++];

    //if the rule is conditional
    if (validator.when && !validator.when()) {
      return next(undefined, valid); //skip validation if the condition is not true
    }

    //run the validator
    var fn = validator.fn;
    if (fn.length > 1) {

      //async
      fn(value, next);

    } else {

      var fnError, fnValid;
      try {
        fnValid = fn(value); //sync
      } catch(err) {
        fnError = err;
      }
      next(fnError, fnValid);

    }

  }

  //don't release "Zalgo" - http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony
  setTimeout(function() { next(undefined, true); }, 0);

  return this;
};

module.exports = ValidatorChain;