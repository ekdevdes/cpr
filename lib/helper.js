module.exports = {
	// holds useful info on the command line arguments each actions takes
	options : {

	},
	// formats our action's option description message
	desc : function(action, description) {
		if (action == "global") {
			return "[global, all actions] " + description;
		} else {
			return "[\"" + action + "\" action only] " + description;
		}
	},
	set_opts: function(o) {
		this.options = o;
		return this;
	},
	get_opts: function() {
		return this.options;
	},
	// generates all the help text given this.options
	// action is optional and if not specified...
	// ..., will assume you want general help text for the entire program
	create_docs: function(action) {
		var text = "";

		if (!action) {
			// generate help text for the program, keeping in mind its going to have...
			// ...an options section already with all the programs options and their specified descriptions
			text += "<action> [options]\n\n  Actions:\n\n";
			for (var key in this.options) {
				if (key == "init") {
					text += "    " + key;
					text += "    " + "create file structure and start watching files for changes" + "\n\n";
				} else if (key == "spy") {
					text += "    " + key;
					text += "     " + "start watching files for changes" + "\n" + "            " + "useful if directory structure wasn't created by \"init\" action" + "\n\n";
				} else if (key == "fetch") {
					text += "    " + key;
					text += "   " + "fetch and install packages";
				}
			}
		} else {

			var descs = [];

			text += "\n" + "   " + "Options:" + "\n\n";

			for (var key in this.options) {
				if (key == action) {
					for (var k in this.options[key]) {
						descs.push(k + ";" + this.options[key][k]);
					}
				}
			}

			for (var desc in descs) {
				var obj = descs[desc],
						item = obj.split(';');

					text += "     " + item[0];

					// modify this spacing as needed per action/desc index
					if (action == "init" && desc == 1) {
						text += "        ";
					} else if (action == "init" && desc == 2) {
						text += "     ";
					} else {
						text += "    ";
					}

					text += item[1] + "\n";
			}

			console.log(text);
		}

		return text;
	}
}
