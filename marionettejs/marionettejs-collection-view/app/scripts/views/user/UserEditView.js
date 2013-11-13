define([
  'underscore', 
  'backbone',
  'models/user/UserModel', 
  'collections/user/UserCollection',
  'views/user/UserCollectionView', 
  'text!templates/user/userEditTemplate.html',
  'backbone.localStorage'
], function(_, Backbone, UserModel, UserCollection, UserCollectionView, userEditTemplate ) {

var UserEditView = Backbone.View.extend({
      
      userModel: null,
      newUserRequest: false,  
      
      events: {
        'click #createBtn': 'onCreateUserHandler',
        'click #updateBtn': 'onUpdateUserHandler',
        'click #deleteBtn': 'onDeleteUserHandler',
        'click #cancelBtn': 'onCancelClickHandler',
      },

      initialize: function(options){

        var that = this;

        that.collection = options.collection;
        that.model = options.model; // main model 
        that.userModel = options.userModel; // selected user model that needs to be updated
        that.newUserRequest = options.newUserRequest;

        var successCallback = function() {
          that.render(); 
        }

        that.collection.loadData( successCallback );

        _.bindAll(this, "onCreateUserHandler", "onUpdateUserHandler", "onDeleteUserHandler", "onCancelClickHandler");

      }, 

      render: function () {
        var that = this;


        var characters = [{name: "bilbo", isSelected: false}, 
                          {name: "legolas", isSelected: false}, 
                          {name: "saruman", isSelected: false}, 
                          {name: "frodo", isSelected: false}, 
                          {name: "samwise", isSelected: false}, 
                          {name: "aragorn", isSelected: false}, 
                          {name: "boromir", isSelected: false},
                          {name: "gimli", isSelected: false}, 
                          {name: "arthas", isSelected: false}, 
                          {name: "pippin", isSelected: false}, 
                          {name: "merry", isSelected: false}, 
                          {name: "gandalf", isSelected: false},
                          {name: "ryu", isSelected: false}]; 

        var races = [ {title: "man", isSelected: false}, 
                      {title: "dwarf", isSelected: false}, 
                      {title: "hobbit", isSelected: false},
                      {title: "lich", isSelected: false},  
                      {title: "elf", isSelected: false}]; 

        var professions = [ {title: "warrior", isSelected: false}, 
                            {title: "archer", isSelected: false}, 
                            {title: "ranger", isSelected: false},
                            {title: "plumber", isSelected: false},  
                            {title: "wizard", isSelected: false}, 
                            {title: "burglar", isSelected: false}];    
       
        var modelToRender = null;

        if ( !that.newUserRequest ) {

           _.each( characters, function(character) {
             if ( that.userModel.get("name") === character.name ) character.isSelected = "selected"; 
          }); 

          _.each( races, function(race) {
             if ( that.userModel.get("race") === race.title ) race.isSelected = "selected"; 
          }); 

          _.each( professions, function(profession) {
             if ( that.userModel.get("class") === profession.title ) profession.isSelected = "selected"; 
          }); 

          modelToRender = that.userModel;

        } 
                    
        var data = { characters: characters, races: races, professions: professions, userModel: modelToRender, _:_ }; 
        
        $( ".page" ).empty(); 
        var compiledTemplate = _.template(userEditTemplate, data, {variable: "data"});
        that.$el.append(compiledTemplate); // add it to the standard div first
        that.$el.appendTo( ".page" );

        that.updateInstructions(); 

        that.delegateEvents();

      },

      /*
      update: function(options) {
        var that = this;

        that.render(options);

      },
      */

      updateInstructions: function() {


        var that = this;

        var maxCharacters = 9; 
        var totalCharacters = that.collection.models.length; 
        var remaining = maxCharacters - totalCharacters; 

        var instructionsText = "You need to add " + remaining + " more heroes to your party";  

        $("#instructions").text(instructionsText); 

        //console.log( that.collection, 'updateInstructions');
      }, 

      onUpdateUserHandler: function (e) {
        var that = this;

        console.log("UserEditView - onUpdateUserHandler");

        e.preventDefault();
        e.stopPropagation(); 
        
        that.updateUser(); 
      
      },

      onCreateUserHandler: function (e) {
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 
        
        that.createUser(); 
      
      },

      getUserDetails: function() {
        var that = this; 

        var userName = $(".edit-user-form").find("#userNameList option:selected").text();
        var userRace = $(".edit-user-form").find("#userRaceList option:selected").text();
        var userClass = $(".edit-user-form").find("#userClassList option:selected").text();

        userName = userName.toLowerCase();
        userRace = userRace.toLowerCase();
        userClass = userClass.toLowerCase();

        var newUserDetails = { name: userName, race: userRace, class: userClass, position: that.collection.models.length };

         return newUserDetails;
      },


      createUser: function(){

        //console.log("UserEditView - creating");
        var that = this; 

        // creating new hero 
        var newUserDetails = that.getUserDetails();

        var userModel = new UserModel( newUserDetails, { validate: true } );

        userModel.on("invalid", function(){
          //console.log("UserEditView - model invalid")            
        }); 

        // http://backbonejs.org/#Model-save 
        //  "If the model has a validate method, and validation fails, the model will not be saved."
        // if the save is successful, then add... 
        
        var successCallback = function(){
          //console.log("UserEditView - model saved successfully");  
          that.displaySuccessMessage("Hero created - click Cancel to view your current party");      
          that.collection.add(userModel);
        };

        var errorCallback = function(){ 
          //console.log("UserEditView - model save error");     
          that.displayErrorMessage("problem saving the model");
        };

        userModel.save({}, {success: successCallback, error: errorCallback} );

        that.collection.updatePositions(); 

        // track this create attempt in google analytics
        ga('send', 'event', 'users', 'create attempt');

      },

      updateUser: function(){

        var that = this; 

        console.log("UserEditView - updateUser");

        if ( null !== that.userModel && undefined !== that.userModel) {

          //console.log(that.collection, "UserEditView - updating")

          // updating existing hero
          var updateUserDetails = that.getUserDetails();

          // validate details
          var deetsCount = 0;
          for ( var ix in updateUserDetails ) {
            
            if ( updateUserDetails[ix] === "" ) {
              //console.log(updateUserDetails, "UserEditView - updateUserDetails - ERROR!") ;
              that.displayErrorMessage("There was a problem updating this hero");
            } else {
              deetsCount++;
            }

          };

          console.log("UserEditView - updateUserDetails - deetsCount: " + deetsCount);
          if ( deetsCount === 4 ) {

            console.log("UserEditView - updateUserDetails - saving...");

            that.userModel.save(updateUserDetails, {
               success: function (user) {
                  
                  //console.log(user, "update success")
                  that.displaySuccessMessage("hero updated - click cancel to view your current group of weary travellers");
                  that.changeView(); 

                },
                error: function () {
                  //console.log(arguments, "update error!")
                  that.displayErrorMessage("update error: unable to update model");
                }
            });
          } 
          


        } 

        that.collection.updatePositions(); 
        
        // track this create attempt in google analytics
        ga('send', 'event', 'users', 'update attempt');

      },

      onDeleteUserHandler: function (e) {
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 

        that.deleteUser(); 
        
      },

      deleteUser: function(){
        var that = this;

        that.userModel.destroy({
          success: function () {
            //console.log('UserEditView - model destroyed');
            that.changeView();
          }, 
          error: function () {
            //console.log(arguments, "delete error!")
            that.displayErrorMessage("delete error: Unable to delete model");
          }
        });
      },

      onCancelClickHandler: function(e) {
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 

        that.changeView()

      }, 

      displaySuccessMessage: function(messageStr){
         //console.log("UserEditView - displaySuccessMessage"); 
         
         $("#editFeedback").fadeOut(200, function(){
            $("#editFeedback").text(messageStr);
            $("#editFeedback").fadeIn(); 
         }); 

         $("#editFeedback").animate( { color: "#000" }, 400 );

      },

      displayErrorMessage: function(messageStr){
         $("#editFeedback").text(messageStr);

         $("#editFeedback").animate( { color: "#990000" }, 400 );
      },

      changeView: function(){
        var that = this; 
        console.log("UserEditView - changeView")

        var data = {trigger: true}; // importat to not trigger refresh and wreck your data state!
        that.model.get("vent").trigger("routerHome", data); 
      }

    });

return UserEditView;

});