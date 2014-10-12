#!/usr/bin/env node

// NOTES:
//
// maybe include defaults
// RUN npm install -g to build current version, then test it
// after testing, fix bugs, and push changes to github
//
// after I figure out what options I want to add for the "spy" and "fetch"...
// ...actions re-run h.create_help(<spy|fetch>) and re adjust spacing on...
// ...right side of option name, where the option name's description is...
// ...make sure the option descriptions on the right line up

// action here is not referring "init", "spy" or "fetch"
// it's refering to the function to call with the keys and values
// the function must take to arguments: one for the object's key...
// ...and the other for the objects value
function list_option_values(options, action) {

	for (var key in options) {
		for(var k in options[key]) {
				action(k, options[key][k]);
		}
	}
}

// requiring all our dependencies
var program = require("commander"),
	 chalk = require("chalk"),
	 request = require("request"),
	 h = require("./helper"),
	 fs = require("fs");

// necessary references
var	package = JSON.parse(fs.readFileSync("./package.json")),
	  opts = {};


// storing a list of the program's options for later use
h.set_opts({
	"global" : {
		"-i, --info" : h.desc("global","output action-specific usage information")
	},
	"init" : {
		"-n, --no-watch" : h.desc("init", "just create directory structure, don't start watching files for changes"),
		"-f, --file" : h.desc("init", "use an external JSON file for file structure creation options"),
		"-j, --js-lint" : h.desc("init", "use JSLint to examine JS code quality")
	},
	"spy" : {

	},
	"fetch" : {

	}
});

// get a local copy of the program options...
opts = h.get_opts();

h.create_docs("init");
return;

// get version of program from pacakge.json file
program.version(package.version)
			// create help docs, refer to docs in helper.js for more information...
			.usage(h.create_docs());

// loop through our local copy of the action options and apply...
// ...each one individually
list_option_values(opts, function(arg, desc){

		program.option(arg, desc);

});

program.parse(process.argv);

// where all the magic happens..
// ...if we have no action then show them the help docs, so they'll
// ...know what actions they can pass
if (!program.args.length) {
	program.help();
} else {
	if (program.args[0] == "init") {
		if(program.info){
			console.log(h.create_docs("init"));
		}

	} else if (program.args[0] == "spy") {

	} else if (program.args[0] == "fetch"){

	} else {
		console.log(chalk.white.bgRed(chalk.bold("[ERROR] \""+ program.args[0] + "\" isn't a valid action.") + " Please refer to the list of valid actions and their options below."));
		program.help();
	}
}
