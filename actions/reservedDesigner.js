'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var moment = require('moment');
var response = require('./common/response');

function reservedDesinger(params, callback) {
  async.waterfall([
    function (callback) {
      db.selectDesigner(params.designer, callback);
    },
    function (designer, callback) {
      db.selectReserved(desinger.desseq, callback);      
    }
  ], function (err, results) {
    if (err) {
      return callback(null, response.failure(err));
    } 
    return callback(null, response.success(results));
  });
}

exports.reservedDesinger = reservedDesinger;