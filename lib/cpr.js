#!/usr/bin/env node

// maybe include defaults

var program = require("commander"),
	chalk = require("chalk"),
	request = require("request"),
	h = require("./helper");

	
program.version("0.0.1")
	   //.usage("<action> [options]\n\n  Actions:\n\n    init\n      -f, --file                 use a file for configuration options instead of command line arguments\n      -c, --css-folder-name      change the css folder name\n      -w, --watch                watch the project and re-compile changes on save\n    compile\n    package")
	    .usage("<action> [options]\n\n  Actions:\n\n    init      create file structure and start watching files for changes\n\n    spy     start watching files for changes\n            useful if directory wasn't created by \"init\"\n\n    fetch     fetch and install packages")
		.option("-nw, --no-watch", h.desc("init", "just create directory structure, don't start watching files for changes"))
		.option("-f, --file", h.desc("init", "use an external JSON file for file structure creation options"))
		.option("-jl, --js-lint", h.desc("init", "use JSLint to examine JS code quality"))
		.parse(process.argv);
	
if (!program.args.length) {
	program.help();
} else {
	if (program.args[0] == "init") {
		console.log("init");
	} else if (program.args[0] == "spy") {
		console.log("spy");
	} else if (program.args[0] == "fetch"){
		console.log("fetch");
	} else {
		console.log(chalk.white.bgRed(chalk.bold("[ERROR] \""+ program.args[0] + "\" isn't a valid action.") + " Please refer to the list of valid actions and their options below."));
		program.help();
	}
}