var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('donejs-jshint', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../default'))
      .inTmpDir()
      .withPrompts({
        'indent_style': 'tab'
      }).on('end', done);
  });

  it('created .jshintrc', function() {
    assert.file(['.jshintrc']);
    assert.fileContent('.jshintrc', /"latedef": "nofunc"/);
  });
  
  it('created .editorconfig with indent_style setting', function() {
    assert.file(['.editorconfig']);
    assert.fileContent('.editorconfig', /indent_style = tab/);
  });
});
