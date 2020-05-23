const express = require('express');

const router = express.Router();

/**
 *
 * @param {*} controller - an instance of the controller responsible
 * for handling requests directed to endpoints defined in this route object
 *
 * @return {router} - an instance of the express router object;
 */
module.exports = (controller) => {
  router.get('/', controller.index);
  return router;
};
