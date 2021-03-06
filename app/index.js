const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.answers = await this.prompt([

            { // module name
                type: 'input',
                name: 'moduleName',
                message: 'What\'s the name of your module ?',
                default: this.appname.replace(/\s/g, '-'),
                validate: answer => answer.length !== 0 && /\s/.test(answer) === false,
                prefix: '-'
            },

            { // description
                type: 'input',
                name: 'description',
                message: 'Give a short description for your module: ',
                default: "my awesome module",
                validate: answer => answer.length !== 0,
                prefix: '-'
            },

            { // author
                type: 'input',
                name: 'author',
                message: 'What\'s your name ?',
                validate: answer => answer.length !== 0,
                prefix: '-'
            }
        ]);
    }

    writing() {

        // .vscode settings
        this.fs.copy(
            this.templatePath('_vscode'),
            this.destinationPath('.vscode')
        );

        // .gitignore settings
        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore')
        );

        // package.json
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this.answers
        );

        // license
        this.fs.copyTpl(
            this.templatePath('_LICENSE'),
            this.destinationPath('LICENSE'),
            this.answers
        );

        // readme
        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.answers
        );

        // mocha options
        this.fs.copy(
            this.templatePath('mocha.opts'),
            this.destinationPath('mocha.opts')
        );

        // typescript configs
        this.fs.copy(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json')
        );

        // tslint configs
        this.fs.copy(
            this.templatePath('tslint.json'),
            this.destinationPath('tslint.json')
        );

        // initial source files
        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath('src')
        );

        // initial test files
        this.fs.copy(
            this.templatePath('tests'),
            this.destinationPath('tests')
        );
    }

    installing() {
        this.npmInstall();
    }
};

