define([ 
		
		"jquery", 
		"backbone",
		"scrollto",
	
	], function( $, Backbone, ScrollTo ) {
		
    // Extends Backbone.View
    var Header = Backbone.View.extend( {

        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() {
			this.render();
        },

        /**
         * Renders view
         * called whenever the collection is changed for this view
         * @param none
         */
        render: function() {
        	
        	//set click handler for header links
        	var headerLinks = this.$el.find("li");
        	$(headerLinks).off().on("click", function(){
        		$(headerLinks).removeClass("active");
        		$(this).addClass("active");
        		
        		var scrollTo = $(this).attr("data-scrollto");
        		if(scrollTo){
        			var scrollToElement = $(scrollTo);
        			$("body").scrollTo(scrollTo, 1000);
        		}
        	});
        	
            return this; //Maintains chainability
        },

    } );

    // Returns the View class
    return Header;

} );