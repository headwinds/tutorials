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
   		
		 initialize: function(){
		 	this.createUsers(); 
		 }, 

		 createUsers: function() {
		 	var that = this; 

		 	// try to fetch the data first from local storage - it should be empty the first time 

		 	that.fetch(); 

		 	console.log(that.models, "UserCollection - first fetch");

		 	// if the list is empty, create dummy data

		 	if ( that.models.length === 0 ) {

			 	var userModel0 = new UserModel(); 
	    		var userModel1 = new UserModel( {name: "Legolas", race:"elf", class: "archer", id: 1} ); 
	    		var userModel2 = new UserModel( {name: "Gandalf", race:"man", class: "wizard", id: 2} ); 
	    		var models = [userModel0, userModel1, userModel2];

	    		_.each( models, function(model){
	    			that.add(model);
	    			model.save();
	    		})
	    		
	    	}

	    	// that.fetch()
	    	// console.log(that.models, "UserCollection - second fetch");
	    	// the second fetch should not be empty and log the above models
	    	// now the next time you run this app you should see both the first and second fetch log models

		 }
	});

	return UserCollection;
});