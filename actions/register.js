'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('./common/db');
var response = require('./common/response');

function register(params, callback) {
  var now = new Date();
  var data = {
    email: params.email,
    password: params.password,
    name: params.name,
    platform: params.platform,
    phone: params.phone,
    sex: params.sex,
    uuid: params.uuid,
    creationTime: now,
    lastLoginTime: now
  };

  async.series([
    function (callback) {
      db.selectMemberByEmail(params.email, callback);
    },
    function (callback) {
      db.insertMember(data, callback);
    },
    function (callback) {
      db.selectMember(params.email, params.password, callback);
    }
  ], function (err, results) {
    if (err) {
      return callback(null, response.failure(err));
    }
    return callback(null, response.success(results[2]));
  });
}

exports.register = register;