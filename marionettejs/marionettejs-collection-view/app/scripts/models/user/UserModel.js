define([
	'underscore', 
	'backbone',
	 ], function(_, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		 urlRoot: '/users',
		 defaults: {
		 	name: "biblo",
		 	class: "burglar",
		 	race: "hobbit",
		 	position: 1
		 }
	});

	return UserModel;
});