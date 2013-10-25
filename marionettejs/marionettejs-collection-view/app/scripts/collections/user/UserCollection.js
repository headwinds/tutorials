define([
	'underscore', 
	'backbone',
	 ], function(_, Backbone) {
	
	var UserCollection = Backbone.Collection.extend({
		 url: '/users'
	});

	return UserCollection;
});