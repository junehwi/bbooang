'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var response = require('./common/response');

function login(params, callback) {
  async.waterfall([
    function (callback) {
      db.selectMember(params.email, params.password, callback);
    },
    function (member, callback) {
      db.updateLastLoginTime(member.memseq, function (err) {
        return callback(err, member);
      });
    }
  ], function (err, result) {
    if (err) {
      return callback(null, response.failure(err));
    }
    return callback(null, response.success(result));
  });
}

exports.login = login;