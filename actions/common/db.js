var database = require('../../database');
var moment = require('moment');

exports.selectMember = function (email, password, callback) {
  database.queryToDatabase('SELECT memseq, email, name, phone, sex, uuid, lastLoginTime FROM member WHERE email=?AND password=?',
  [
    email,
    password
  ], 
  function (err, rows) {
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
  database.queryToDatabase('SELECT count(*) as count FROM member WHERE email=?', 
  [
    email
  ], 
  function (err, rows) {
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
  database.queryToDatabase('SELECT memseq, email, name, phone, sex, uuid, lastLoginTime FROM member WHERE memseq', 
  [
    memseq
  ], 
  function (err, rows) {
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
  ], 
  function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    callback(null, result);
  });
};


exports.insertMember = function (values, callback) {
  database.queryToDatabase('INSERT member SET ?', 
  values, 
  function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    callback(null, result);
  });
};

exports.updateMember = function (memseq, values, callback) {
  database.queryToDatabase('UPDATE member SET ? WHERE memseq=?', 
  [ 
    values, 
    memseq 
  ], 
  function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    callback(null, result);
  });  
};

exports.insertReservation = function (values, callback) {
  database.queryToDatabase('INSERT reservation SET ?', 
  values, 
  function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    database.queryToDatabase('SELECT * FROM reservation WHERE memseq=? AND designer=? AND type=?',
    [
      values.memseq,
      values.designer,
      values.type
    ], function (err, results) {
      if (err) {
        return callback('DatabaseError');
      }
      return callback(null, results[0]);
    });
  });
};

exports.selectDesigner = function (name, callback) {
  database.queryToDatabase('SELECT desseq, name FROM designer WHERE name=?',
  [
    name
  ], 
  function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, rows[0]);
  });
};

exports.selectReserved = function (name, callback) {
  database.queryToDatabase('SELECT designer, type, startTime, endTime FROM reservation WHERE designer=? AND reservationTime>=?',
  [
    name,
    moment.startOf('day')
  ], 
  function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, rows[0]);
  });
};

exports.selectAllType = function (callback) {
  database.queryToDatabase('SELECT * FROM type',
  [
  ], 
  function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, rows[0]);
  });  
};

exports.selectReservationByMemseq = function (memseq, callback) {
  database.queryToDatabase('SELECT * FROM reservation WHERE memseq=?',
  [
    memseq
  ], 
  function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, rows);
  });
};

exports.insertType = function (name, period, callback) {
  var values = {
    name: name,
    periodInMinites: period
  };

  database.queryToDatabase('INSERT type SET ?', 
  values, 
  function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, result);
  });
}

exports.updateType = function (name, period, callback) {
  database.queryToDatabase('UPDATE type SET name=?, periodInMinites=? WHERE name=?',
  [
    name,
    period,
    name
  ], 
  function (err, result) {
    if (err) {
      return callback('DatabaseError');
    }
    return callback(null, result);
  });
}

exports.selectType = function (name, callback) {
  database.queryToDatabase('SELECT typeseq, name, periodInMinites FROM type WHERE name=?',
  [
    name
  ], 
  function (err, rows) {
    if (err) {
      return callback('DatabaseError');
    }
    console.log(rows);
    return callback(null, rows[0]);
  });
};
