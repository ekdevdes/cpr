#!/usr/bin/env node

// maybe include defaults

var program = require("commander"),
	chalk = require("chalk"),
	request = require("request"),
	h = require("./helper");

program.version("0.0.1")
	     .usage("<action> [options]\n\n  Actions:\n\n    init    create file structure and start watching files for changes\n\n    spy     start watching files for changes\n            useful if directory wasn't created by \"init\" action\n\n    fetch   fetch and install packages")
			 .option("-i, --info", "output action-specific usage information")
			 .option("-n, --no-watch", h.desc("init", "just create directory structure, don't start watching files for changes"))
			 .option("-f, --file", h.desc("init", "use an external JSON file for file structure creation options"))
			 .option("-j, --js-lint", h.desc("init", "use JSLint to examine JS code quality"))
			 .parse(process.argv);

if (!program.args.length) {
	program.help();
} else {
	if (program.args[0] == "init") {
		if(program.info){
			console.log("\n   Options:\n     -nw, --no-watch    just create directory structure, don't start watching files for changes\n     -\n");
		}

	} else if (program.args[0] == "spy") {

	} else if (program.args[0] == "fetch"){

	} else {
		console.log(chalk.white.bgRed(chalk.bold("[ERROR] \""+ program.args[0] + "\" isn't a valid action.") + " Please refer to the list of valid actions and their options below."));
		program.help();
	}
}
