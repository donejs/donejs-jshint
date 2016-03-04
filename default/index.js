var generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = generator.Base.extend({
  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    
    this.files = [
      '.editorconfig',
      '.jshintrc'
    ];
  },
  
  prompting: function () {
    var done = this.async();
   
    this.prompt([{
      type: 'list',
      name: 'indent_style',
      message: 'What indentation style do you want to use?',
      default: 'tab',
      choices: [
        {
          name: 'Tabs',
          value: 'tab'
        },
        {
          name: 'Spaces',
          value: 'space'
        }
      ]
    }], function (answers) {
      this.props = answers;
      done();
    }.bind(this));
  },
  writing: function () {
    var pkg = this.pkg;
    
    pkg.scripts = _.extend(pkg.scripts, {
      test: 'npm run jshint && ' + pkg.scripts,
      jshint: 'jshint --config ' + _.get(pkg, 'system.directories.lib', 'src') + '/.'
    });
    
    this.fs.writeJSON('package.json', pkg);
    this.npmInstall([ 'jshint' ], { saveDev: true});
    
    this.files.forEach(function(file) {
      this.log('Copying file to ' + this.destinationPath(file));
      
      this.fs.copyTpl(
  			this.templatePath(file),
  			this.destinationPath(file),
  			this.props
  		);
    }.bind(this));
  }
});
