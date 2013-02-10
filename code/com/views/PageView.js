define([ 
		
		"jquery", 
		"backbone",
		"com/views/Header",
	
	], function( $, Backbone, Header ) {
		
    // Extends Backbone.View
    var PageView = Backbone.View.extend( {
		
		_header: null,
		
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
        	
        	//create header
        	this._header = new Header({el: this.$el.find(".masthead")})
        	
            return this; //Maintains chainability
        },

    } );

    // Returns the View class
    return PageView;

} );