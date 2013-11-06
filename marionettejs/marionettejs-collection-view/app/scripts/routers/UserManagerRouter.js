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

  var initialize = function() {

    console.log("UserManageRouter - init");

    var userManageRouter = new UserManageRouter(); // in a large, restful application, you will probably want several routers which may be easier to maintain
    var mainModel = new MainModel(); 
    var userCollection = new UserCollection();

    // views
    var userManagerView = null;
    var userEditView = null;


    userCollection.on('sync', function() {
      console.log('UserManagerView - sync succesful!');
    });

    var options = {model: mainModel, collection: userCollection}; 

    // EVENTS
    mainModel.get("vent").on("routerHome", function(){
      
      console.log(arguments, "UserManageRouter - vent - routerHome");

      userManageRouter.navigate('', {trigger:true} );

      //var domain = document.domain + "/app/"; 
      //window.location.href = "http://" + domain + 
    }); 
   
    userManageRouter.on('route:showNewUser', function () {
      
      console.log("UserManageRouter - showNewUser");
       $(".page").empty(); 

      if (userManagerView ) {
        userManagerView.remove();
        userManagerView = null; 
      }
      
      var userEditView = new UserEditView( options ); // once the collection is ready, this view will render itself
      var userObj = null; 


    });

    userManageRouter.on('route:showEditUser', function (id) {
      
      console.log(userCollection, "UserManageRouter - showEditUser - id: " + id);
       $(".page").empty(); 
         
      var userModel = userCollection.get(id);
      options.userModel = userModel; 
    
      if ( null === userEditView) {
        console.log("UserManageRouter - defaultAction - new");
        userEditView = new UserEditView( options );
      } else {
        console.log("UserManageRouter - defaultAction - update");
        userEditView.update( options ); 
      }
    
    });

    userManageRouter.on('route:defaultAction', function (actions) {

      console.log("UserManageRouter - defaultAction - new");

      $(".page").empty(); 
      
      if ( null === userManagerView) {
        console.log("UserManageRouter - defaultAction - new");
        userManagerView = new UserManagerView(options); 
      } else {
        console.log("UserManageRouter - defaultAction - update");
        userManagerView.update(); 
      }

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