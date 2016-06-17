var utils = require('pomelo/lib/util/utils');
var kublaiService = require('../services/kublai.js')

var Component = function(app, opts) {
  if (!opts.khanUrl) {
    throw "Could not load kublai since no khan url was specified..."
  }
  this.app = app
  this.app.set('kublai', new kublaiService(opts.khanUrl, this.app, this))
};

Component.prototype.start = function(cb) {
  utils.invokeCallback(cb);
}

module.exports = function(app, opts) {
  return new Component(app, opts);
};