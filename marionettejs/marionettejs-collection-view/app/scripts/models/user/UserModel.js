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
		 }, 

		 validate: function(attrs) {
		 	var that = this; 

		 	that.validationError = []; 

		 	if ( undefined === attrs.name || "undefined" === attrs.name ) {

		 		that.validationError.push("name cannot be undefined")
		 	}

		 	if ( undefined === attrs.race || "undefined" === attrs.race ) {

		 		that.validationError.push("race cannot be undefined")
		 	}

		 	if ( undefined === attrs.class || "undefined" === attrs.class ) {

		 		that.validationError.push("class cannot be undefined")
		 	}

		 	if ( that.validationError.length > 0 ) {

		 		that.trigger("invalid");
		 	} else {
		 		that.trigger("valid");
		 	}

		 }
	});

	return UserModel;
});