define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'models/MainModel',
  'views/user/UserManagerView',
  'views/user/UserEditView'
], function($, 
            _, 
            Backbone, 
            Marionette,
            MainModel,
            UserManagerView,
            UserEditView
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

    //var vent = _.extend({}, Backbone.Events);
    var userManageRouter = new UserManageRouter(); // in a large, restful application, you will probably want several routers which may be easier to maintain

    var mainModel = new MainModel(); 

    var userCollection = options.userCollection;
    var options = {vent:vent, model: mainModel, collection: userCollection}; 

    console.log(options, "UserManageRouter - initialize");

    // EVENTS
    vent.on("routerHome", function(){
      userManageRouter.navigate('', {trigger:true});
    }); 
   
    userManageRouter.on('route:showNewUser', function () {
      console.log("UserManageRouter - showNewUser");
      var userEditView = new UserEditView( options );
      var userObj = null; 

      userEditView.render( userObj );
    });

    userManageRouter.on('route:showEditUser', function (id) {
      console.log("UserManageRouter - showEditUser");
      var userEditView = new UserEditView( options );
      var userModel = userCollection.get(id);

      userEditView.render( userModel );

    });

    userManageRouter.on('route:defaultAction', function (actions) {
      var userManagerView = new UserManagerView(options); 

      console.log("UserManageRouter - defaultAction");
      userManagerView.render( userCollection );
        
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