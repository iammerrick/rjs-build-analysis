var parser = require('pegjs').buildParser(
  require('fs').readFileSync(__dirname+'/rjs.peg', 'utf8')
);

exports.parse = parser.parse;
