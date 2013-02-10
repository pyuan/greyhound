define([
		
		"jquery", 
		"backbone"
		
	], function($, Backbone) {

	var Constants = Backbone.Model.extend({
	
	},
	
	{
		
		FOLDER_TEMPLATES : "assets/templates/",
		EXTENSION_TEMPLATES : ".handlebars",
			
	});

	return Constants;

}); 