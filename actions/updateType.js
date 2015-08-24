'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var response = require('./common/response');

function updateType(params, callback) {
  async.waterfall([
    function (callback) {
      db.selectType(params.name, callback);
    },
    function (type, callback) {
      if (type === undefined) {
        db.insertType(params.name, params.period, callback);
      } else {
        db.updateType(params.name, params.period, callback);
      }
    }
  ], function (err) {
    if (err) {
      return callback(null, response.failure(err));
    } 
    return callback(null, response.success([]));
  });
}

exports.updateType = updateType;