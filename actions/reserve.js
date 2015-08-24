'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var moment = require('moment');
var response = require('./common/response');

function reserve(params, callback) {
  var values = {
    memseq: params.memseq,
    designer: params.designer,
    type: params.type,
    startTime: params.startTime,
    contents: params.contents
  };

  async.waterfall([
    function (callback) {
      db.selectMemberByMemSeq(params.memseq, callback);
    },
    function (member, callback) {
      db.selectType(params.type, callback);
    },
    function (type, callback) {
      values.endTime = moment(params.startTime).add('minute', type.periodInMinites).toDate();
      db.insertReservation(values, callback);
    }
  ], function (err, result) {
    if (err) {
      return callback(null, response.failure(err));
    } 
    return callback(null, response.success(result));
  });
}

exports.reserve = reserve;