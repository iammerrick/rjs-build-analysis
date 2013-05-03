var _ = require('lodash');
var parser = require('pegjs').buildParser(
  require('fs').readFileSync(__dirname+'/rjs.peg', 'utf8')
);

exports.parse = parser.parse;

exports.duplicates = function(text) {
  var bundles = exports.parse(text).bundles;
  var nodes = {};

  _.each(bundles, function(bundle) {
    _.each(bundle.children, function(child) {
      nodes[child] = nodes[child] || [];
      nodes[child].push(bundle.parent);
    });
  });

  return _.reduce(nodes, function(memo, list, key) {
    if (list.length > 1) {
      memo[key] = list;
    }
    return memo;
  }, {});
}
