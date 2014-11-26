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
	.alias('r', 'root')
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
		r: '[\'init\' action only] the path to the projects root directory',
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
	.default('r', '.')
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
	.string('f')
	.string('r');
	
// more dependencies
//
// YAML dependency is for Fetchfile
// Fetchfile will be written in YAML and converted to JSON at compile time because YAML is easier to write than JSON
// example Fetchfile is at ~/Fetchfile.example
var chalk = require("chalk"),
    request = require("request"),
    helper = require("./helper"),
    fs = require("fs"),
    cmd = require("cmd-exec").init(),
    yaml = require("yamljs"),
    mp = require("mkdirp"),
    sv = require("semver");

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
    version = "0.0.1",
    files = ["index.{{html-ext}}",
	         "{{css-dir}}/styles.{{css-ext}}",
	         "{{js-dir}}/scripts.{{js-ext}}",
	         "{{img-dir}}/",
	         "Fetchfile"],
	newfiles = ["Fetchfile"];
	
// checking to see if we've only been passed one 'action'
if (argv._.length == 1) {
	// we only have one 'action'
	
	if (action == 'init') {
		
		var output = "HTML Engine: " + helper.language_name(argv['html-engine']) +
			"\nCSS Engine: " + helper.language_name(argv['css-engine']) +
			"\nJS Engine: " + helper.language_name(argv['js-engine']) +
			"\nCSS Folder Name: \"" + argv['css-dir'] + "\"" + 
			"\nJS Folder Name: \"" + argv['js-dir'] + "\"" +                         
			"\nImage Folder Name: \"" + argv['img-dir'] + "\"";

		(argv['js-lint']) ? output += "\nJS Lint: true" : output += "\nJS Lint: false";
		(argv['fetch-file']) ? output += "\nCreate Empty Fetchfile: true" : output += "\nCreate Empty Fetchfile: false";
		output += "\nProject Root: ";
		output += argv.r;
		output += "\n";
	    console.log(output);
	    
	    for (var i = 0; i < files.length; i++) {

			var tempfile = files[i],
			    file = "";
			
			if (tempfile.indexOf("{{html-ext}}") > -1) {
			    file = tempfile.replace("{{html-ext}}", helper.language_name(argv['html-engine']));
			} else if (tempfile.indexOf("{{css-dir}}") > -1 && tempfile.indexOf("{{css-ext}}") > -1) {
			    file = tempfile.replace("{{css-dir}}", argv['css-dir']).replace("{{css-ext}}", helper.language_name(argv['css-engine']));
			} else if (tempfile.indexOf("{{js-dir}}") > -1 && tempfile.indexOf("{{js-ext}}") > -1) {
			    file = tempfile.replace("{{js-dir}}", argv['js-dir']).replace("{{js-ext}}", helper.language_name(argv['js-engine']));
			} else if (tempfile.indexOf("{{img-dir}}") > -1) {
				file = tempfile.replace("{{img-dir}}", argv['img-dir']);
			} else if (tempfile == "Fetchfile"){
				console.log(chalk.white.bold("Will create \"Fetchfile\" ..."));
			}
			
			newfiles.push(file);
			if(file) console.log(chalk.white.bold("Will create \"" + file + "\" ..."));
		
     	}
     	console.log("\n");
     	
     	for(var j = 0; j < newfiles.length; j++) {
    		var f = helper.expandPath(argv.r) + "/" + newfiles[j];
			
			console.log(f);
			if (helper.isDirectory(f)) {
				// only creates the "img" directory -________-
				
				mp.mkdirp(f, function(err){
					
					if (err) {
						console.log(chalk.white.bold.bgRed(' [ERROR] ' + err));
					} else {
						console.log(chalk.green.bold('Created \"' + newfiles[j] + '\"'));
					}
					
				});
			} else {
				
				// create the file if its a file
				
			} 	
     	}
     	
     	if (argv.w) {    	
	    	
	    	// begin watching the files for changes...then re-compiling them when they do using node-watch
	    		
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