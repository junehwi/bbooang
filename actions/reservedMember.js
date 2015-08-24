'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var moment = require('moment');
var response = require('./common/response');

function reservedMember(params, callback) {
  async.series([
    function (callback) {
      db.selectReservationByMemseq(params.memseq, callback);
    }
  ], function (err, results) {
    if (err) {
      return callback(null, response.failure(err));
    } 
    return callback(null, response.success(results));
  });
}

exports.reservedMember = reservedMember;