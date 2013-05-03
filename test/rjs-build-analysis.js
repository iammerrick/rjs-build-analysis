var expect = require('chai').expect;
var analyzer = require('../index');
var read = require('fs').readFileSync;

describe('rjs-build-analysis', function() {
  describe('parse', function() {
    it('should parse the build output', function() {
      var output = analyzer.parse(read(__dirname+'/fixtures/single-build.txt', 'utf8'));
      
      expect(output).to.deep.equal({
        bundles: [
          {
            parent: 'ApplicationBootstrap.js', 
            files: [
              'common/cookie.js',
              'application/csrf.js',
              'application/EventBus.js',
              'vendor/moment.js'
            ]
          }
        ]
      });
    });

    it('should parse build output with multiple modules', function() {
      var output = analyzer.parse(read(__dirname+'/fixtures/multiple-build.txt', 'utf8'));

      expect(output).to.deep.equal({
        bundles: [
          {
            parent: 'ApplicationBootstrap.js', 
            files: [
              'common/cookie.js',
              'application/csrf.js',
              'application/EventBus.js',
              'vendor/moment.js'
            ]
          },
          {
            parent: 'OtherApp.js',
            files: [
              'text!some-template.handlebars',
              'controller/SomeCtrl.js',
              'models/Some.js'
            ]
          }
        ]
      });
    });
  });
});
