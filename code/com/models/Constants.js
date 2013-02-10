define([
		
		"jquery", 
		"backbone"
		
	], function($, Backbone) {

	var Constants = Backbone.Model.extend({
	
	},
	
	{
		
		/**** template constants ****/
		FOLDER_TEMPLATES : "../assets/templates/",
		EXTENSION_TEMPLATES : ".handlebars",
		
		/**** alert constants ****/
		ALERT_TYPE_SUCCESS : "alert-success", 
		ALERT_TYPE_WARN : "", //empty string because this is the default type
		ALERT_TYPE_ERROR : "alert-error",
		ALERT_JSON_MALFORMED : "<b>Oh snap!</b> Your JSON is malformed, fix it plz.",
		ALERT_JSON_REQUEST_FAILED : "<b>Oh snap!</b> Your JSON requst failed for some reason.",
		ALERT_JSON_NONE : "Put some JSON to make delicious JS classes...",
		ALERT_JSON_FETCH_SUCCESS : "<b>Success!</b> We got your sexy JSON. ;)",

	});

	return Constants;

}); 