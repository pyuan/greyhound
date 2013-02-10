define([ 
		
		"jquery", 
		"backbone",
		"garlic",
		"kelpjsonview",
		"com/views/PageView",
	
	], function( $, Backbone, Garlic, KelpJSONView, PageView ) {
		
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
        	var createBtn = this.$el.find("#createBtn"); 
        	$(createBtn).off().on("click", function(){
        		var json = self._validateCurrentJSON();
        		if(json){
        			console.log("Go!");
        		}
        		else{
        			console.log("invalid json");
        		}
        	});
        	
        	//click handler for edit button
        	var editBtn = this.$el.find("#jsonEditControls #editBtn"); 
        	$(editBtn).off().on("click", function(){
        		if(!$(this).hasClass("btn-inverse")){
        			self._showJSONEditView();
        		}
        	}).trigger("click"); //default view
        	
        	//click handler for preview button
        	var previewBtn = this.$el.find("#jsonEditControls #previewBtn");
        	$(previewBtn).off().on("click", function(){
        		if(!$(this).hasClass("btn-inverse")){
        			self._showJSONPreviewView();
        		}
        	});
        	
        	//use localstorage to persist user json input
        	var jsonForm = this.$el.find("#jsonForm");
        	$(jsonForm).garlic();
        	
            return this; //Maintains chainability
        },
        
        /**
         * show the json field
         * @param none
         */
        _showJSONEditView: function()
        {
        	var jsonPreviewView = this.$el.find("#jsonPreview").hide();
			var jsonEditView = this.$el.find("#jsonEdit").show();
			this._selectJSONButton(0);
        },
        
        /**
         * show the json preview
         * @param none
         */
        _showJSONPreviewView: function()
        {
        	var self = this;
        	var jsonPreviewView = this.$el.find("#jsonPreview").html("").hide();
			var jsonEditView = this.$el.find("#jsonEdit").hide();
			
			var json = this._validateCurrentJSON();
			if(json)
			{
				this._showJSONSpinner();
				setTimeout(function(){
					var jsonString = JSON.stringify(json);
					$.JSONView(jsonString, jsonPreviewView);
					$(jsonPreviewView).show();
					
					self._hideJSONSpinner();
					self._selectJSONButton(1);
				}, 250);
			}
			else {
				this._showJSONEditView();
			}
        },
        
        /**
         * select one of the buttons in the JSON edit controls button group
         * @param index, int
         */
        _selectJSONButton: function(index)
        {
        	var buttons = this.$el.find("#jsonEditControls button");
        	$(buttons).removeClass("btn-inverse");
        	$(buttons).find("i").removeClass("icon-white");
        	$(buttons).eq(index).addClass("btn-inverse").find("i").addClass("icon-white");
        },
        
        /**
         * validate if currently entered JSON is valid
         * @param none
         * @return json, object 
         */
        _validateCurrentJSON: function()
        {
        	var errorAlert = this.$el.find("#jsonErrorAlert").hide();
        	var jsonEditView = this.$el.find("#jsonEdit");
			var jsonString = $(jsonEditView).val();
			var json;
			
			try{
    			json = $.parseJSON(jsonString);
    			console.log("JSON is valid:");
    			console.log(json);
    		} catch(e){
    			$(errorAlert).fadeIn("fast");
    			console.log(e);
    			console.log("JSON input:");
    			console.log(jsonString);
    		}
    		
    		return json;
        },
        
        /**
         * show spinner for JSON viewer
         * @param
         */
        _showJSONSpinner: function()
        {
        	var spinner = this.$el.find("#jsonEditControls .spinner");
        	$(spinner).stop().show("fast");
        },
        
        /**
         * hide spinner for JSON viewer
         * @param none
         */
        _hideJSONSpinner: function()
        {
        	var spinner = this.$el.find("#jsonEditControls .spinner");
        	$(spinner).stop().fadeOut("fast");
        },

    });

    // Returns the View class
    return HomePageView;

});