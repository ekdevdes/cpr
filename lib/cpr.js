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
		'html-engine': '[\'init\' action only] Possible values are \'html\', \'haml\', \'markdown\' or \'md\'',
		'css-engine': '[\'init\' action only] Possible values are \'css\', \'sass\', \'scss\' or \'less\'',
		'js-engine': '[\'init\' action only] Possible values are \'js\', \'javascript\', \'cs\' or \'coffeescript\'',
		'css-dir': '[\'init\' action only] the name of the folder to put the css files for the project in',
		'js-dir': '[\'init\' action only] the name of the folder to put the js files for the project in',
		'img-dir': '[\'init\' action only] the name of the folder to put the images for the project in',
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
	.default('css-dir', 'css')
	.default('js-dir', 'js')
	.default('img-dir', 'img')
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
//
// YAML dependency is for Fetchfile
// Fetchfile will be written in YAML and converted to JSON at compile time because YAML is easier to write than JSON
var chalk = require("chalk"),
    request = require("request"),
    helper = require("./helper"),
    fs = require("fs"),
    cmd = require("cmd-exec").init(),
    yaml = 	

// other optimist and fs accessors
//
// basic file structure
//
// index.html
// css/styles.css
// js/styles.css
// Fetchfile     
var argv = optim.argv,
    action = argv._[0],
    version = JSON.parse(fs.readFileSync('../package.json')).version,
    files = ["index.{{html-ext}}",
	         "{{css-folder-name}}/styles.{{css-ext}}",
	         "{{js-folder-name}}/scripts.{{js-ext}}",
	         "Fetchfile"];
	
// checking to see if we've only been passed one 'action'
if (argv._.length == 1) {
	// we only have one 'action'
	
	if (action == 'init') {
	    console.log("HTML Engine: " + helper.language_name(argv['html-engine']) +
			"\nCSS Engine: " + helper.language_name(argv['css-engine']) +
			"\nJS Engine: " + helper.language_name(argv['js-engine']) +
			"\nCSS Folder Name: \"" + argv['css-folder-name'] + "\"" + 
			"\nJS Folder Name: \"" + argv['js-folder-name'] + "\"" +                         
			"\nImage Folder Name: \"" + argv['img-folder-name'] + "\"" + 
			"\nWill Use JSLint Javascript Validation" + 
			"\nWill Create Empty Fetchfile\n");
	    
	    for (var i = 0; i < files.length; i++) {
		var tempfile = files[i],
		    file = "";
		
		if (tempfile.indexOf("{{html-ext}}") > -1) {
		    file = tempfile.replace("{{html-ext}}", helper.language_name(argv['html-engine']));
		} else if (tempfile.indexOf("{{css-folder-name}}") > -1 && tempfile.indexOf("{{css-ext}}") > -1) {
		    file = tempfile.replace("{{css-folder-name}}", argv['css-folder-name']).replace("{{css-ext}}", helper.language_name(argv['css-engine']));
		} else if (tempfile.indexOf("{{js-folder-name}}") > -1 && tempfile.indexOf("{{js-ext}}") > -1) {
		    file = tempfile.replace("{{js-folder-name}}", argv['js-folder-name']).replace("{{js-ext}}", helper.language_name(argv['js-engine']));
		}

		console.log(file, tempfile);

     	    }
	    
      	} else if (action == 'creep') {

	} else if (action == 'fetch') {

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