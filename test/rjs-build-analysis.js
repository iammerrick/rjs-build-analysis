var expect = require('chai').expect;
var analyzer = require('../index');

function fixture(name) {
  return require('fs').readFileSync(__dirname+'/fixtures/'+name+'.txt', 'utf8');
}

describe('rjs-build-analysis', function() {
  describe('parse', function() {
    it('should parse the build output', function() {
      var output = analyzer.parse(fixture('single-build'));
      
      expect(output).to.deep.equal({
        bundles: [
          {
            parent: 'ApplicationBootstrap.js', 
            children: [
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
      var output = analyzer.parse(fixture('multiple-build'));

      expect(output).to.deep.equal({
        bundles: [
          {
            parent: 'ApplicationBootstrap.js', 
            children: [
              'common/cookie.js',
              'application/csrf.js',
              'application/EventBus.js',
              'vendor/moment.js'
            ]
          },
          {
            parent: 'OtherApp.js',
            children: [
              'text!some-template.handlebars',
              'controller/SomeCtrl.js',
              'models/Some.js'
            ]
          }
        ]
      });
    });
  });

  describe('duplicates', function() {
    it('should check for duplicates across modules', function() {
      var output = analyzer.duplicates(fixture('duplicates-build'));
      expect(output).to.deep.equal({
        'common/cookie.js': ['ApplicationBootstrap.js', 'OtherApp.js'],
        'another/duplicate.js': ['ApplicationBootstrap.js', 'OtherApp.js', 'YetOtherApp.js']
      });
    }); 
  });
});
