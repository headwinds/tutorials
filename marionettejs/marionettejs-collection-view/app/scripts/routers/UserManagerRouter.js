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
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function( options ) {

    //console.log("UserManageRouter - init");

    var viewController = options.viewController; 
    var userManageRouter = new UserManageRouter(); // in a large, restful application, you will probably want several routers which may be easier to maintain
    var mainModel = new MainModel(); 
    var userCollection = new UserCollection();
    
    userCollection.on('sync', function() {
      //console.log('UserManageRouter - sync succesful');
    });

    var options = {model: mainModel, collection: userCollection}; 

    
    mainModel.get("vent").on("routerHome", function(){
      
      //console.log("UserManageRouter - vent - routerHome");
      userManageRouter.navigate('', { trigger: true } ); // update the url and trigger an event so the router can listen to create the new view 
    }); 

     mainModel.get("vent").on("routerAddHero", function(){
      
      //console.log("UserManageRouter - vent - addHero");
      userManageRouter.navigate('new', { trigger: true } ); 

    }); 
   
    userManageRouter.on('route:showNewUser', function () {
      
      console.log("UserManageRouter - showNewUser");

      if ( null !== options && undefined !== options ) {

        options.newUserRequest = true; 

        var userEditView = new UserEditView( options );
        var bSelfRender = true;

        viewController.showView ( userEditView, bSelfRender );  
        
      } else {
        //console.log("UserManageRouter - showNewUser - ERROR: options null or undefined");
      } 
    });

    userManageRouter.on('route:showEditUser', function (id) {
      
      //console.log(arguments, "UserManageRouter - showEditUser - id: " + id);
        
      options.userModel = userCollection.get(id); 

      if ( null !== options.userModel && undefined !== options.userModel ) {
        
        options.newUserRequest = false; 

        var userEditView = new UserEditView( options );
        var bSelfRender = true;

        viewController.showView ( userEditView, bSelfRender );  
        
      } else {
        //console.log("UserManageRouter - showEditUser - ERROR: problem getting the userModel");
      }
    
    });

    userManageRouter.on('route:defaultAction', function (actions) {

      //console.log("UserManageRouter - defaultAction - new");
      var userManagerView = new UserManagerView( options ); 
      var bSelfRender = true;

      viewController.showView ( userManagerView, bSelfRender );  

    });

  };

  return { 
    initialize: initialize
  };

});