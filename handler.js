'use strict';

function findAction(operator) {
  try {
    var module = require('./actions/' + operator);
    return module[operator];
  } catch (exception) {
    console.error("Error in findAction: " + exception);
    return actionNotFoundAction;
  }
}

exports.handle = function (req, res) {
  var operator = req.params.action
  var params = {};
  if (req.method === 'POST') {
    params = req.body;
  } else {
    params = req.query;
  }

  var action = findAction(operator);

  return action(params, function (err, result) {
    return res.send(result);
  });
};
