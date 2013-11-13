define([
	'underscore', 
	'backbone',
	'backbone.localStorage'
	 ], function(_, Backbone) {
	
	var UserModel = Backbone.Model.extend({
		 urlRoot: '/users',
		 localStorage: new Store("users"),
		 
		 defaults: {
		 	name: "bilbo",
		 	class: "burglar",
		 	race: "hobbit",
		 	position: 1
		 }, 

		 initialize: function(){
		 	_.bindAll(this, "validate");
		 },

		 validate: function(attrs) {
		 	var that = this; 

		 	that.validationError = []; 

		 	if ( "undefined" === String(attrs.name)  ) {

		 		that.validationError.push("name cannot be undefined")
		 	}

		 	if ( "undefined" === String(attrs.race)  ) {

		 		that.validationError.push("race cannot be undefined")
		 	}

		 	if ( "undefined" === String(attrs.class) ) {

		 		that.validationError.push("class cannot be undefined")
		 	}

		 	if ( that.validationError.length > 0 ) {
		 		that.trigger("invalid");
		 	} 

		 }
	});

	return UserModel;
});