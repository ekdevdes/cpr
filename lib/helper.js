module.exports = {
	// formats our command description message
	desc : function(action, description){
		return "[\"" + action + "\" action only] " + description;
	}
}