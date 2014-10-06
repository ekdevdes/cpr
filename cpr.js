#!/usr/bin/env node

var program = require("commander"),
	chalk = require("chalk"),
	request = require("request");
	
program.version("0.0.1")
	   //.usage("<action> [options]\n\n  Actions:\n\n    init\n      -f, --file                 use a file for configuration options instead of command line arguments\n      -c, --css-folder-name      change the css folder name\n      -w, --watch                watch the project and re-compile changes on save\n    compile\n    package")
	    .usage("<action> [options]\n\n  Actions:\n\n    init      create file structure and start watching files for changes\n\n    watch     start watching files for changes\n              useful if directory wasn't created by \"init\"\n\n    fetch     fetch and install packages")
		.parse(process.argv);
	
if (!program.args.length) {
	program.help();
} else {
	// we have args!!!
}