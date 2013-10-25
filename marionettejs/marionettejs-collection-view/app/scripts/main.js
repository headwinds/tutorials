require.config({
  baseURL: 'scripts',
  
  shim: {
      jquery: {
        exports: ["$"]
      }
  },

  paths: {
    jquery: "../bower_components/jquery/jquery",
    underscore: "../bower_components/underscore-amd/underscore",
    backbone: "../bower_components/backbone-amd/backbone", 
    "backbone.wreqr": "../bower_components/backbone.wreqr/lib/amd/backbone.wreqr", 
    "backbone.eventbinder": "../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder", 
    "backbone.babysitter": "../bower_components/backbone.babysitter/lib/amd/backbone.babysitter", 
    marionette: "../bower_components/marionette/lib/core/amd/backbone.marionette",
    text: 'libs/require/text',
    templates: '../templates'
  }

});

require([
  'routers/UserManagerRouter', 
  'models/user/UserModel', 
  'collections/user/UserCollection'
], function(UserManagerRouter, UserModel, UserCollection){

  UserManagerApp = new Backbone.Marionette.Application();

  UserManagerApp.addInitializer(function(options){
    //new MyAppRouter();
    console.log( "MarionetteJS Collection View Tutorial");
         
    var userModel0 = new UserModel(); 
    var userModel1 = new UserModel( {name: "Legolas", race:"elf", class: "archer", id: 1} ); 
    var userModel2 = new UserModel( {name: "Gandalf", race:"man", class: "wizard", id: 2} ); 
    var models = [userModel0, userModel1, userModel2];

    var userCollection = new UserCollection(models);

    var options = { userCollection: userCollection}; 

    UserManagerRouter.initialize( options );
  

    userCollection.on("change", function(){
       console.log(userCollection, "UserManagerApp - change");
       var options = { userCollection: userCollection}; 
       UserManagerRouter.initialize( options );
    });

    Backbone.history.start();
  
  });

  UserManagerApp.start(); 
  
});
