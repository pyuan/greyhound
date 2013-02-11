define([ 
		
		"jquery", 
		"backbone",
		"garlic",
		"kelpjsonview",
		"templateutils",
		"com/views/PageView",
		"com/models/Constants",
		"com/utils/JSONClassParser",
	
	], function( $, Backbone, Garlic, KelpJSONView, TemplateUtils, PageView, Constants, JSONClassParser ) {
		
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
        			var classes = JSONClassParser.getClasses(json);
        			console.log("Classes found:");
        			console.log(classes);
        			
        			//TODO: temporary code to show generated classes
        			var classesArray = [];
        			for(var className in classes){
        				classesArray.push(className);
        			}
        			var message = "Classes from JSON: " + classesArray.join(", ");
        			self._showJSONFeedbackMessage(message, Constants.ALERT_TYPE_SUCCESS);
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
        	
        	//click handler for the url button
        	var urlBtn = this.$el.find("#jsonEditControls #urlBtn");
        	$(urlBtn).off().on("click", function(){
        		if(!$(this).hasClass("btn-inverse")){
        			self._toggleURLField();
        		}
        	});
        	
        	//click handler for the fetch json from url button
        	var getJSONBtn = this.$el.find("#getJSONBtn");
        	$(getJSONBtn).off().on("click", function(){
        		var url = self.$el.find("#jsonURL").val();
        		self._getJSONFromURL(url);
        	});
        	
        	//select all url text on focus
        	var urlField = this.$el.find("#jsonURL");
        	$(urlField).off().on("focus", function(){
        		$(this).select();
        	}).on("mouseup", function(){
        		return false;
        	});
        	
        	//use localstorage to persist user json input
        	var jsonForm = this.$el.find("#jsonForm");
        	$(jsonForm).garlic();
        	
            return this; //Maintains chainability
        },
        
        /**
         * get json from a url
         * @param url, string
         */
        _getJSONFromURL: function(url) 
        {
        	if(url.indexOf("http") == -1){
        		url = "http://" + url;
        	}
        	
        	var self = this;
        	this._showJSONSpinner();
        	this._hideJSONAlert();
        	
        	//setup the global JSONP handler
        	window["jsonpCallback"] = function(data){
        		console.log("JSON Received:");
				console.log(data);
				self._showJSONEditView(JSON.stringify(data));
				self._hideJSONSpinner();
				self._showJSONFeedbackMessage(Constants.ALERT_JSON_FETCH_SUCCESS, Constants.ALERT_TYPE_SUCCESS);
				
				//trigger click to store json
				self.$el.find("#jsonEdit").trigger("change");
				
				//remove handler
				delete window["jsonpCallback"];
        	};
        	
        	//handler if request returns with error
        	var onError = function(jqXHR, textStatus)
        	{
        		var response = jqXHR.responseText;
				self._showJSONEditView(response);
				self._hideJSONSpinner();
				self._showJSONFeedbackMessage(Constants.ALERT_JSON_REQUEST_FAILED, Constants.ALERT_TYPE_ERROR);
				throw new Error("HomePageView._getJSONFromURL() error: " + textStatus);
        	};
        	
        	$.ajax({
				type: "GET",
				url: url,
				timeout: 2000,
				cache: false,
				dataType: "jsonp",
				jsonpCallback: "jsonpCallback",
				complete: function(jqXHR, textStatus) {
			        if (jqXHR.status == 0) {
			        	onError(jqXHR, textStatus);
			        }
			    },
				error: function(jqXHR, textStatus, errorThrown){
					onError(jqXHR, textStatus);
				}
			});	
        },
        
        /**
         * toggle show/hide of the url field
         * @param none
         */
        _toggleURLField: function()
        {
        	var urlField = this.$el.find("#jsonURLContainer");
        	$(urlField).slideToggle("fast");
        },
        
        /**
         * show the json field
         * @param jsonString, string [optiona], if set, populate the textarea with the string
         */
        _showJSONEditView: function(jsonString)
        {
        	var jsonPreviewView = this.$el.find("#jsonPreview").hide();
			var jsonEditView = this.$el.find("#jsonEdit").show();
			this._selectJSONButton(0);
			
			if(jsonString){
				$(jsonEditView).val(jsonString);
			}
        },
        
        /**
         * show the json preview
         * @param none
         */
        _showJSONPreviewView: function()
        {
        	var self = this;
        	var jsonPreviewView = this.$el.find("#jsonPreview").html("").show();
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
        	this._hideJSONAlert();
        	var jsonEditView = this.$el.find("#jsonEdit");
			var jsonString = $(jsonEditView).val();
			var json;
			
			try{
    			json = $.parseJSON(jsonString);
    			console.log("JSON is valid:");
    			console.log(json);
    		} catch(e){
    			jsonString.length == 0 ? 
    				this._showJSONFeedbackMessage(Constants.ALERT_JSON_NONE, Constants.ALERT_TYPE_WARN) : 
    				this._showJSONFeedbackMessage(Constants.ALERT_JSON_MALFORMED, Constants.ALERT_TYPE_ERROR);
    			console.log(e);
    			console.log("JSON input:");
    			console.log(jsonString);
    		}
    		
    		return json;
        },
        
        /**
         * show json feedback message
         * @param message, string, can be html
         * @param type, string constant
         */
        _showJSONFeedbackMessage: function(message, type)
        {
        	var jsonAlert = this.$el.find("#jsonAlert").html("");
        	var params = { html: message, type: type };
        	TemplateUtils.getTemplate("alert", params, function(html){
        		$(jsonAlert).html(html).fadeIn("fast");
        	});
        },
        
        /**
         * hide json alert
         * @param none
         */
        _hideJSONAlert: function()
        {
        	var jsonAlert = this.$el.find("#jsonAlert");
        	$(jsonAlert).fadeOut("fast");
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