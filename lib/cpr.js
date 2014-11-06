#!/usr/bin/env node

// PURPOSE: to get the hang of how to integrate the 'optimist' module into a script

// set up command with options and usage info in the following order: 
	// basic command usage info
	// command required options
	// command option aliases
	// command option descriptions
	// command option defaults
	// command option argument types
var optim = require('optimist')
	.usage("\nUsage: cpr <action> [options]\n\nAn action is required and only one action may be specified. Valid actions are 'init', 'creep', 'fetch' or 'help'.\n\nFetchfiles are used by the package manager bundled with CPR to manage your project's dependencies. When you create your project if you \nchoose to have an empty Fetchfile created for you, it will be populated with comments detailing its usage or you can run \n\"touch Fetchfile\" to create the Fetchfile manually. Additionally, you can run \"cpr fetch --help\" to get information on how the\ncontents of the Fetchfile should be structured.")
    .demand(1)
	.alias('h', 'help')
	.alias('v', 'version')
	.alias('w', 'watch')
	.alias('c', 'compile')
	.alias('f', 'file')
	.describe({
		w: '[\'init\' action only] watch created files for changes',
		'html-engine': '[\'init\' action only] Possible values are \'html\', \'haml\' or \'markdown\'',
		'css-engine': '[\'init\' action only] Possible values are \'css\', \'sass\', \'scss\' or \'less\'',
		'js-engine': '[\'init\' action only] Possible values are \'js\', \'javascript\', \'cs\' or \'coffeescript\'',
		'css-folder-name': '[\'init\' action only] the name of the folder to put the css files for the project in',
		'js-folder-name': '[\'init\' action only] the name of the folder to put the js files for the project in',
		'img-folder-name': '[\'init\' action only] the name of the folder to put the images for the project in',
		'js-lint': '[\'init\' action only] validates javascript using JSLint',
		'fetch-file': '[\'init\' action only] create an empty Fetchfile with comments describing its usage',
		c: '[\'creep\' action only] Possible values are \'all\', \'htmlonly\', \'cssonly\' or \'jsonly\'',
		'refresh-browser': '[\'creep\' action only]',
		f: '[\'fetch\' action only] the name of or path to the Fetchfile'
	})
	.default('w', true)
	.default('html-engine', 'html')
	.default('css-engine', 'css')
	.default('js-engine', 'js')
	.default('css-folder-name', 'css')
	.default('js-folder-name', 'js')
	.default('img-folder-name', 'img')
	.default('js-lint', false)
	.default('fetch-file', true)
	.default('c', 'all')
	.default('refresh-browser', false)
	.default('f', './Fetchfile')
	.boolean('w')
	.boolean('js-lint')
	.boolean('fetch-file')
	.boolean('refresh-browser')
	.string('html-engine')
	.string('css-engine')
	.string('js-engine')
	.string('css-folder-name')
	.string('js-folder-name')
	.string('img-folder-name')
	.string('c')
	.string('f');
	
// more dependencies
var chalk = require("chalk"),
	request = require("request"),
	helper = require("./helper"),
	fs = require("fs");
	cmd = require("cmd-exec").init();	

// other optimist and fs accessors
var argv = optim.argv,
	action = argv._[0],
	version = JSON.parse(fs.readFileSync('../package.json')).version;
	
// checking to see if we've only been passed one 'action'
if (argv._.length == 1) {
	// we only have one 'action'
	
	if (action == 'init') {
		console.log(action);
	} else if (action == 'creep') {
		console.log(action);
	} else if (action == 'fetch') {
		console.log(action);
	} else if (action == 'help') {
		console.log("\nCurrent version: " + version);
		optim.showHelp();
	} else {
		console.log(chalk.white.bold.bgRed(' [ERROR] Unrecongized action "' + action + '" '));
		optim.showHelp();
	}
	
} else if (argv._.length > 1) {
	// WE CANT HAVE TWO ACTIONS (non-option arguments)
	
	console.log(chalk.white.bold.bgRed(' [ERROR] Numerous actions specified, only one is necessary. '));
	optim.showHelp();
	
}