define([
		
		"jquery", 
		"com/models/constants",
		
	], function($, Constants) {

	var JSONClassParser = {};
	
	/**
	 * get classes by parsing a json object
	 * @param json, object
	 * @param key, string, [optional] used to generate the class name
	 * @return classes, object of objects
	 */
	JSONClassParser.getClasses = function(json, key)
	{
		var classes = {};
		var cls = {};
		
		
		for(var i in json)
		{
			var type = typeof json[i];
			
			//if value is an array of object
			if(type == "object")
			{
				
				//if value is an object, not array
				if(!$.isArray(json[i])) 
				{
					if(json[i] != null)
					{
						var subClasses = JSONClassParser.getClasses(json[i], i);
						classes = JSONClassParser._mergeObjects(classes, subClasses);
						
						//indicate that field is an object instances of a class
						var subClassName = this._getClassName(i);
						var classObject = {};
						classObject[subClassName] = subClassName;
						cls[i] = classObject;
					}
				}
				
				//if value is an array with more than one item
				else if(json[i].length > 0)
				{
					
					//if first item in the array is a string or int, add to object
					if(typeof json[i][0] != "object")
					{
						cls[i] = json[i];
					}
					
					//otherwise item muse be another object, create into a class
					else
					{
						var subClasses = JSONClassParser.getClasses(json[i][0], i);
						classes = JSONClassParser._mergeObjects(classes, subClasses);
						
						//indicate that field is an array of instances of a class
						var subClassName = this._getClassName(i);
						cls[i] = [subClassName];
					}
				}
			}
			
			//if value is a string or int, set to object with key
			else {
				cls[i] = json[i];
			}
		}
		
		var className = key ? JSONClassParser._getClassName(key) : Constants.JSON_PARSER_ROOT_CLASS;
		classes[className] = cls;
		
		return classes;
	}
	
	/**
	 * merge obj2 into obj1, overwrites if same key is used, modifies existing objects
	 * @param obj1, object
	 * @param obj2, object
	 * @return merged, object
	 */
	JSONClassParser._mergeObjects = function(obj1, obj2)
	{
		for(var i in obj2) {
			obj1[i] = obj2[i];
		}
		
		var merged = obj1;
		return merged;
	}
	
	/**
	 * create name for a class
	 * @param key, String
	 * @return className, String
	 */
	JSONClassParser._getClassName = function(key)
	{
		var className = key[0].toUpperCase() + key.substring(1) + "Model";
		return className;
	}

	return JSONClassParser;

}); 