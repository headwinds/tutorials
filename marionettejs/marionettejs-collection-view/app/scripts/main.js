require.config({
  baseURL: 'scripts',
  
  shim: {
    jquery: {
      exports: ["$"]
    }
  },

  paths: {
    jquery: "../../bower_components/jquery/jquery",
    underscore: "../../bower_components/underscore-amd/underscore",
    backbone: "../../bower_components/backbone-amd/backbone", 
    "backbone.wreqr": "../../bower_components/backbone.wreqr/lib/amd/backbone.wreqr", 
    "backbone.eventbinder": "../../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder", 
    "backbone.babysitter": "../../bower_components/backbone.babysitter/lib/amd/backbone.babysitter", 
    "backbone.localStorage": "../../bower_components/backbone.localStorage/backbone.localStorage-min", 
    marionette: "../../bower_components/marionette/lib/core/amd/backbone.marionette",
    d3: "../../bower_components/d3/d3.min",
    text: '../../bower_components/text/text',
    templates: '../templates'
  }

});

require([
  'routers/UserManagerRouter',
  'Collections/user/UserCollection',
  'd3'
], function(UserManagerRouter, UserCollection){

  UserManagerApp = new Backbone.Marionette.Application();

  UserManagerApp.addInitializer(function(options){
    //new MyAppRouter();
    console.log( "MarionetteJS Collection View Tutorial");
         
    var userCollection = new UserCollection();

    console.log( userCollection.models );

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
