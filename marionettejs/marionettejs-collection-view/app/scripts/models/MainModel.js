define([
	'underscore',
	'backbone'
], function(_, Backbone ) {
	
	var MainModel = Backbone.Model.extend({

		defaults: {
			vent: _.extend({}, Backbone.Events);  
		}
		
	});

	return MainModel;
})