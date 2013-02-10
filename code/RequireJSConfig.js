// Sets the require.js configuration for your application.
require.config({

	// 3rd party script alias names 
	paths : {
		
		"jquery"		: "http://code.jquery.com/jquery-1.9.1.min",
		"underscore"	: "libs/underscore/underscore-min",
		"backbone"		: "libs/backbone/backbone-min",
		"handlebars"	: "libs/handlebars/handlebars",
		"bootstrap"		: "libs/bootstrap/js/bootstrap.min",
		"scrollto"		: "libs/scrollto/jquery.scrollTo-1.4.3.1-min",
		"garlic"		: "libs/garlic/garlic.min",
		"kelpjsonview"	: "libs/kelpjsonview/kelpjsonview",
		"templateutils"	: "com/utils/TemplateUtils",

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim : {
		
		"backbone" : {
			"deps" : ["underscore", "jquery"],
			"exports" : "Backbone" //attaches "Backbone" to the window object
		},
		"handlebars" : {
			"deps" : ["jquery"],
			"exports" : "Handlebars"
		},
		"bootstrap" : ["jquery"],
		"scrollto" : ["jquery"],
		"garlic" : ["jquery"],

	} 

});

// Includes File Dependencies
require([
	
		"jquery", 
		"backbone",
		"bootstrap",
	
	], function($, Backbone, Bootstrap) {
	
	
	$(function() {
		
		var pageClassName = $("body").attr("data-class");
		require([ pageClassName ], function(PageClass){
			
			this.page = new PageClass({el: $("body")});
			
		});
		console.log("document ready!");
		
	});	
	
}); 

