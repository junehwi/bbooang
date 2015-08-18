'use strict';

function makeResultFormat (result) {
  if (!result) {
    return [];
  }
  else if (Array.isArray(result)) {
    return result;
  }
  else {
    return [result];
  }
}

exports.success = function (result) {
  return {
    status: 'ok',
    result: makeResultFormat(result)
  };
}

exports.failure = function (err) {
  return {
    status: err,
    result: makeResultFormat()
  };
}
