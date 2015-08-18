var database = require('../../database');

exports.selectMember = function (email, password, callback) {
  database.queryToDatabase('SELECT memseq, email, name, phone, sex, uuid, lastLoginTime FROM member ' +
    'WHERE email=?AND password=?', [
    email,
    password
  ], function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    } else if (rows[0] === undefined) {
      return callback('NoSuchMember');
    } else {
      return callback(null, rows[0]);
    }
  });
};

exports.selectMemberByEmail = function (email, callback) {
  database.queryToDatabase('SELECT count(*) as count FROM member WHERE email=?', [
    email
  ], function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    } else if (rows[0].count > 0) {
      return callback('AlreadyRegistered');
    } else {
      return callback(null, rows[0].count);
    }
  });
};

exports.selectMemberByMemSeq = function (memseq, callback) {
  database.queryToDatabase('SELECT memseq, email, name, phone, sex, uuid, lastLoginTime FROM member ' +
    'WHERE memseq', [
    memseq
  ], function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, rows[0]);
  });
};

exports.updateLastLoginTime = function (seq, callback) {
  var now = new Date();
  database.queryToDatabase('UPDATE member SET lastLoginTime=? WHERE memseq=?', [
    now,
    seq
  ], function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    callback(null, result);
  });
};


exports.insertMember = function (values, callback) {
  database.queryToDatabase('INSERT member SET ?', values, function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    callback(null, result);
  });
};

exports.insertReservation = function (values, callback) {
  database.queryToDatabase('INSERT reservation SET ?', values, function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    callback(null, result);
  });
}

