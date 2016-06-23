var user = require('../public/scripts');
var error = require('./error');

module.exports = function(app) {
  app.use('/v1', user.register);
};
