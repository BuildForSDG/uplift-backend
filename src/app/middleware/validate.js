const { validationResult } = require('express-validator');
/**
 * @param { Array } rules - An array of validation rules created using express-validator.
 *
 * This is the generic validation logic shared across all
 * validators. This middleware takes an array of validation rules
 * and executes them against the current request object. If validation
 * fails, this middlewre returns a http 422 reponse code with the response
 * body containing the inputs that failed validation. If validation is successful
 * this middleware hands over to the middleware down the line.
 */
module.exports = (rules) => async (request, response, next) => {
  await Promise.all(rules.map((rule) => rule.run(request)));
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return response.status(422).json({
    status: 'error',
    errors: extractedErrors
  });
};
