'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var response = require('./common/response');

function reserve(params, callback) {
  var values = {
    memseq: params.memseq,
    designer: params.designer,
    type: params.type,
    reservationTime: params.reservationTime,
    contents: params.contents
  };

  async.series([
    function (callback) {
      db.selectMemberByMemSeq(params.memseq, callback);
    },
    function (callback) {
      db.insertReservation(values, callback);
    }
  ], function (err, results) {
    if (err) {
      return callback(null, response.failure(err));
    } 
    return callback(null, response.successful(result));
  });
}

exports.reserve = reserve;