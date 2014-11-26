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
	
    },
    isDirectory: function(path) {
	    
	  if (path.charAt(path.length - 1) == "/") return true;
	    
    },
    expandPath: function(path) {
	    var temp = "";
	    
	    if (path.indexOf("~") > -1) {
			 temp = path.replace("~", process.env.HOME);
			 return temp;
		} else if(path == "." || path == "..") {
		
			if (path == ".") {
				
				temp = path.replace(".", process.env.PWD);
				return temp;
				
			} else if(path == "..") {
				
				var dapath = "",
					temp = path.replace(".", process.env.PWD + "/");
					
				dapath = temp.split("/");
				
				// remove any empty array elements
				dapath = dapath.filter(Boolean);
				dapath = dapath.splice(0, dapath.length - 2);
				
				return "/" + dapath.join("/");
							
			}
			
		} else {
			
			return path;
			
		}
		
		
    }
}
