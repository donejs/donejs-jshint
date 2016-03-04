var generator = require('yeoman-generator');

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
