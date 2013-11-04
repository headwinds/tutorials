define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'models/MainModel',
  'views/user/UserManagerView',
  'views/user/UserEditView',
  'collections/user/UserCollection'
], function($, 
            _, 
            Backbone, 
            Marionette,
            MainModel,
            UserManagerView,
            UserEditView,
            UserCollection
  ) {

  var UserManageRouter = Backbone.Marionette.AppRouter.extend({
    routes: {
      // Define some URL routes
      'new': 'showNewUser',
      'edit/:id': 'showEditUser',
      'verify': 'verifyParty', 
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function() {

    console.log("UserManageRouter - init");

    var userManageRouter = new UserManageRouter(); // in a large, restful application, you will probably want several routers which may be easier to maintain
    var mainModel = new MainModel(); 
    var userCollection = new UserCollection();

    var options = {model: mainModel, collection: userCollection}; 

    // EVENTS
    mainModel.get("vent").on("routerHome", function(){
      userManageRouter.navigate('', {trigger:true});
    }); 
   
    userManageRouter.on('route:showNewUser', function () {
      console.log("UserManageRouter - showNewUser");
      var userEditView = new UserEditView( options );
      var userObj = null; 

      userEditView.render( userObj );
    });

    userManageRouter.on('route:showEditUser', function (id) {
      
      console.log(userCollection, "UserManageRouter - showEditUser - id: " + id);
      
      var userModel = userCollection.get(id);
      options.userModel = userModel; 
      var userEditView = new UserEditView( options );
    
    });

    userManageRouter.on('route:verifyParty', function () {
  
      var bVerified = userCollection.verifyHeroes(); 

      console.log("UserManageRouter - verifyParty - bVerified: " + bVerified);

      if ( bVerified ) {
         
      } else {

      }
      
    });

    userManageRouter.on('route:defaultAction', function (actions) {
      var userManagerView = new UserManagerView(options); 

      console.log("UserManageRouter - defaultAction");
        
    });

  };

  //var updateURL: function(){
  //  console.log("UserManageRouter - updateURL");
  //};

  return { 
    initialize: initialize
    //updateURL: updateURL
  };

});