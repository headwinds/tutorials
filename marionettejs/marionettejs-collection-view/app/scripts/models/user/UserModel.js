define([
	'underscore', 
	'backbone',
	 ], function(_, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		 urlRoot: '/users',
		 defaults: {
		 	name: "Biblo",
		 	class: "burglar",
		 	race: "hobbit",
		 	id: 0
		 }
	});

	return UserModel;
});