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
		bDummyData: false,

		loadData:function( parentSuccessCallback ){
			var that = this; 

			var successCallback = function(collection, response, options){
				console.log("UserCollection - successCallback"); 
				
				if ( collection.models.length === 0 ) {
					that.createDummyData();  
				}

				parentSuccessCallback(); 
			};

			var errorCallback = function(collection, response, options){
				console.log("UserCollection - errorCallback"); 
			}

			that.fetch( { success: successCallback, error:  errorCallback } );
		}, 

		destroyData: function(){

			// http://stackoverflow.com/questions/18392874/backbone-model-destroy-limited/18395310#18395310
			var that = this; 

			that.each(function(model, i) {
			    that.remove(model);
			    model.destroy();
			});

		}, 
   		
		createDummyData: function() {
		 	var that = this; 

		 	console.log("UserCollection - createDummyData");

		 	//that.fetch(); // get the models from the local storage and don't create anymore if some already exist 

		 	var userModel0 = new UserModel(); 
    		var userModel1 = new UserModel( {name: "legolas", race:"elf", class: "warrior", position: 2} ); 
    		var userModel2 = new UserModel( {name: "saruman", race:"man", class: "wizard", position: 3} ); 
    		var models = [userModel0, userModel1, userModel2];

    		_.each( models, function(model){
    			that.add(model);
    			model.save(); 
    		})
	    		


	    	that.bDummyData = true; 

		 },

		 verifyHeroes: function() {

		 	console.log("UserCollection - verifyHeroes");

		 	var that = this; 

		 	var count = 0;

		 	var heroes = [	{name: "frodo", race:"hobbit", class: "burglar"},
		 					{name: "samwise", race:"hobbit", class: "burglar"},
		 					{name: "aragorn", race:"man", class: "ranger"},
		 					{name: "boromir", race:"man", class: "warrior"},
		 					{name: "gimli", race:"dwarf", class: "warrior"},
		 					{name: "pippin", race:"hobbit", class: "burglar"},
		 					{name: "merry", race:"hobbit", class: "burglar"},
		 					{name: "legolas", race:"elf", class: "archer"},
		 					{name: "gandalf", race:"man", class: "wizard"}];


		 	var jsonModelList = [];

		 	_.each( that.models, function(model){
		 		var jsonModel = model.toJSON(); 
		 		jsonModelList.push(jsonModel); 
		 	})

		 	// are there 9 models?

		 	//if ( jsonModelList.length !== 9 ) return false;

		 	// can I find each model in the list of heroes knowing that I have two lists of 9 items?

		 	_.each(heroes, function(hero){
		 			
		 		var result = _.findWhere(jsonModelList, hero); // _.findWhere(publicServicePulitzers, {newsroom: "The New York Times"});

		 		if ( undefined !== result ) count++; 

		 		console.log("UserCollection - verifyHeroes - result: " + result);

		 	});

		 	console.log("UserCollection - verifyHeroes - count: " + count);
						 	
			if ( count === 9 ) {

				console.log("UserCollection - verifyHeroes - verified all bearers!" );

				var dimensionValue = 'verified all bearers';
				ga('set', 'dimension2', dimensionValue);

				_gaq.push(['_trackEvent', 'users', 'verified']);

				return true;

			} else {
				return false;
			}				


		 } 
	});

	return UserCollection;
});