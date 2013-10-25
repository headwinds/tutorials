define([
	'underscore', 
	'backbone',
	 ], function(_, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		 urlRoot: '/users',
		 defaults: {
		 	name: "Biblo",
		 	class: "Burgler",
		 	race: "Hobbit",
		 	id: 0
		 }
	});

	return UserModel;
});