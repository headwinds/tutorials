define([
	'underscore', 
	'backbone',
	'models/user/UserModel',
	'backbone.localStorage'
	 ], function(_, Backbone, UserModel ) {
	
	var UserCollection = Backbone.Collection.extend({
		url: '/users',
		model: UserModel,
		localStorage: new Store("users"),
   		
		createDummyData: function() {
		 	var that = this; 

		 	if ( that.models.length === 0 ) {

			 	var userModel0 = new UserModel(); 
	    		var userModel1 = new UserModel( {name: "Legolas", race:"elf", class: "archer", id: 1} ); 
	    		var userModel2 = new UserModel( {name: "Gandalf", race:"man", class: "wizard", id: 2} ); 
	    		var models = [userModel0, userModel1, userModel2];

	    		_.each( models, function(model){
	    			that.add(model);
	    		})
	    		
	    	}

		 }

		 verifyHereos: function() {

		 	var count = 0;

		 	var hereos = [	"frodo",
						 	"samwise",
							"aragorn",
							"boromir",
							"gimli",
							"pippin",
							"merry",
							"legolas",
							"gandalf"];

			if ( count === 9 ) {
				var dimensionValue = 'verified all bearers';
				ga('set', 'dimension2', dimensionValue);

				_gaq.push(['_trackEvent', 'users', 'verified']);
			}				


		 } 
	});

	return UserCollection;
});