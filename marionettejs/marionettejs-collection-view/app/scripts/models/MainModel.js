define([
	'underscore',
	'backbone'
], function(_, Backbone ) {
	
	var MainModel = Backbone.Model.extend({

		defaults: {
			vent: null 
		},

		initialize: function(options) {
			this.vent = options.vent; 
		},

	});

	return MainModel;
})