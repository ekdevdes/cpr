#!/usr/bin/env node

// NOTES:
//
// RESTRUCTURE ENTIRE FILE TO PARSE OPTION THE "optimist" WAY NOT THE "commander" WAY
//
// maybe include defaults
// THE ACTION SPECIFIC TEXT (init SPECIFICALLY) IS BEING...
// ...OUTPUTTED FOR THE USAGE INFO (.usage()) FIX THAT

// after I figure out what options I want to add for the "spy" and "fetch"...
// ...actions re-run h.create_help(<spy|fetch>) and re adjust spacing on...
// ...right side of option name, where the option name's description is...
// ...make sure the option descriptions on the right line up

// requiring all our dependencies
var program = require("commander"),
	chalk = require("chalk"),
	request = require("request"),
	h = require("./helper"),
	fs = require("fs");
	cmd = require("cmd-exec").init();

// necessary references
var	package = JSON.parse(fs.readFileSync("./package.json")),
	prog_usage_txt = "";


prog_usage_txt += "<action> [options]\n\n  Actions are \"init\", \"spy\" and \"fetch\"";

// get version of program from pacakge.json file
// program.version(package.version)
// 			.usage(prog_usage_txt)
// 			.option('-i, --info', '[global] outputs action-specific usage information')
// 			.option('-o, --options', '[global] use a JSON object string as the format for these action-specific options.\n\t\t    If "-o" and "-f" options are both specified than the options in the file passed in via the "-f" option will be used.\n\n\t\t    init\n\t\t    ----\n\n\t\t    html_engine: [string] "haml","markdown" or "html"\n\t\t    css_engine: [string] "less","sass", "scss" or "css"\n\t\t    js_engine: [string] "coffeescript", "cs", "js", "javascript"\n\t\t    css_folder_name: [string] the name of the folder to put the css files for the project in. Defaults to "css"\n\t\t    img_folder_name: [string] the name of the folder to put the images for the project in. Defaults to "img"\n\t\t    js_folder_name: [string] the name of the folder to put the javascript files for the project in. Defaults to "js"\n\t\t    use_js_lint: [string] "true" or "false". Defaults to "false" Whether or not to use JSLint javascript validator\n\t\t    create_fetchfile: [string] whether or not to create an empty Fetchfile upon initialization with comments describing, \n\t\t\t                       in detail the expected format of the Fetchfile. Fetchfiles are used by the package manager\n\t\t\t                       bundled with CPR. They list a project\'s depedencies. The format of the Fetchfile is also \n\t\t\t\t               documented under the "cpr fetch -i" command. Default is "true".\n\n\n\t\t    spy\n\t\t    ----\n\n\t\t    compile: [string] "all", "css-only","js-only" or "html-only". Default is "all"\n\t\t    refresh_browser: [string] "true" or "false". Default is "false"\n')
// 			.option('-f, --file', '[global] Use a file on disk for the previous for previous option\'s input\n\t\t    Most common usasge, "cpr <action> -of". This tells CPR to use an external file for the action-specific specific options specified above\n')
// 			.option('-n, --no-watch', '[init only] just create directory structure, don\'t start watching files for changes');

program.parse(process.argv);

// where all the magic happens..
// ...if we have no action then show them the help docs, so they'll
// ...know what actions they can pass
if (!program.args.length) {
	program.help();
} else {
	if (program.args[0] == "init") {
		if (program.options && program.file) {
			console.log("using a file for \"init\"'s action-specific options");
		}
		
		if (program.info) {
			console.log(h.create_docs("init"));
		}

	} else if (program.args[0] == "spy") {

	} else if (program.args[0] == "fetch"){

	} else {
		console.log(chalk.white.bgRed(chalk.bold("[ERROR] \""+ program.args[0] + "\" isn't a valid action.") + " Please refer to the list of valid actions and their options below."));
		program.help();
	}
}
