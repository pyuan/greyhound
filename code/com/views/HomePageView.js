define([ 
		
		"jquery", 
		"backbone",
		"garlic",
		"com/views/PageView",
	
	], function( $, Backbone, Garlic, PageView ) {
		
    // Extends PagView class
    var HomePageView = PageView.extend({
    	
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
        	PageView.prototype.initialize.call(this); //calling base class initialize method
        },

        /**
         * Renders UI
         * @param none
         */
        render: function() 
        {
        	PageView.prototype.render.call(this); //calling base class initialize method
        	
        	//setup the create classes button
        	var self = this;
        	var errorAlert = this.$el.find("#jsonErrorAlert");
        	this.$el.find("#createBtn").off().on("click", function(){
        		$(errorAlert).hide();
        		var jsonString = self.$el.find("#jsonField").val();
        		try{
        			var json = $.parseJSON(jsonString);
        			console.log(json);
        		} catch(e){
        			$(errorAlert).fadeIn("fast");
        			console.log(e);
        			console.log("Json input:");
        			console.log(jsonString);
        		}
        	});
        	
        	//use localstorage to persist json
        	var jsonForm = this.$el.find("#jsonForm");
        	$(jsonForm).garlic();
        	
            return this; //Maintains chainability
        }

    } );

    // Returns the View class
    return HomePageView;

} );