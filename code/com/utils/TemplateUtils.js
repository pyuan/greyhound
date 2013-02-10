define([
		
		"jquery", 
		"handlebars",
		"com/models/Constants",
		
	], function($, Handlebars, Constants) {

	var TemplateUtils = {};
	
	/**
	 * process a handlebar template
	 * @param template, name string to the template without the extension
	 * @param params, object to process the handlebar template
	 * @param onTemplateHandler, function to received the post processed html of the template
	 */
	TemplateUtils.getTemplate = function(template, params, onTemplateHandler)
	{
		$.ajax({
			type: "GET",
			url: Constants.FOLDER_TEMPLATES + template + Constants.EXTENSION_TEMPLATES,
			async: true,
			cache: true,
			success: function(data){
				
				//dont escape params with the key "html"
				Handlebars.registerHelper('html', function() {
					return new Handlebars.SafeString(this.html);
				});
				
				var template = Handlebars.compile(data);
				var html = template(params);
				
				if(onTemplateHandler){
					onTemplateHandler(html);
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				throw new Error("TemplateUtils.getTemplate() error: " + textStatus);
			}
		});	
	}

	return TemplateUtils;

}); 