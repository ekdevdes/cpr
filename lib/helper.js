module.exports = {
    language_name: function(lang) {
	
	if (lang == "md" || lang == "sass" || lang == "javascript" || lang == "cs") {
	    
	    if (lang == "md") {
		return "markdown";
	    } else if (lang == "sass") {
		return "scss";
	    } else if (lang == "javascript") {
		return "js";
	    } else if (lang == "cs") {
		return "coffeescript";
	    }

	} else {
	    return lang;
	}
    }
}
