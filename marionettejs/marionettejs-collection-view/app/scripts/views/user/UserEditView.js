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
      
      el: '.page',
      userModel: null,  
      
      events: {
        'submit .edit-user-form': 'onUpdateUserHandler',
        'click .delete': 'onDeleteUserHandler',
        'click #cancelBtn': 'onCancelClickHandler',
      },

      initialize: function(options){

        if ( options ) {
          this.collection = options.collection;
          this.model = options.model; // main model 
          this.userModel = options.userModel; 
        }

        var that = this;
        var successCallback = function() {
          that.render(); 
        }

        this.collection.loadData( successCallback ); 

      }, 

      render: function () {
        var that = this;

        console.log(that.userModel, "UserEditView"); 

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
                          {name: "ryu", isSelected: false},
                          {name: "bolg", isSelected: false}]; 

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
       
        if ( null !== that.userModel && undefined !== that.userModel) {

           _.each( characters, function(character) {
             if ( that.userModel.get("name") === character.name ) character.isSelected = "selected"; 
          }); 

          _.each( races, function(race) {
             if ( that.userModel.get("race") === race.title ) race.isSelected = "selected"; 
          }); 

          _.each( professions, function(profession) {
             if ( that.userModel.get("class") === profession.title ) profession.isSelected = "selected"; 
          }); 

        }
                    
        var data = { characters: characters, races: races, professions: professions, userModel: that.userModel, _:_ };

        var template = _.template(userEditTemplate, data, {variable: "data"});

        that.$el.html(template);

        that.updateInstructions(); 

      },

      updateInstructions: function() {
        var that = this;

        var maxCharacters = 9; 
        var totalCharacters = that.collection.models.length; 
        var remaining = maxCharacters - totalCharacters; 

        var instructionsText = "You need to add " + remaining + " more heroes to your party";  

        $("#instructions").text(instructionsText); 
      }, 

      onUpdateUserHandler: function (e) {
        var that = this;
        
        that.updateUser(); 
      
      },

      updateUser: function(){

        var that = this; 

        var userName = $(".edit-user-form").find("#userNameList option:selected").text();
        var userRace = $(".edit-user-form").find("#userRaceList option:selected").text();
        var userClass = $(".edit-user-form").find("#userClassList option:selected").text();

         console.log("UserEditView - name: " + userName)

        if ( null !== that.userModel ) {

          console.log(that.collection, "UserEditView - updating")

          // updating existing hero
          var updateUserDetails = { name: userName, race: userRace, class: userClass }; 

          console.log(updateUserDetails); 

          that.userModel.save(updateUserDetails, {
           success: function (user) {
              
              console.log(user, "update success")
              var data = {trigger:true}; 
              that.model.get("vent").trigger("routerHome", data); 

            },
            error: function () {
              console.log(arguments, "update error!")
              that.displayErrorMessage("update error: unable to update model");
            }
          });

        } else {

          console.log(that.collection, "UserEditView - creating")

          // creating new hero 
          var newUserDetails = { name: userName, race: userRace, class: userClass, position: that.collection.models.length }; 

          var userModel = new UserModel( newUserDetails, { validate: true } );

          userModel.on("invalid", function(){
            console.log("UserEditView - model invalid")            
          }); 

          userModel.on("valid", function(){
            console.log("UserEditView - model valid")   

            that.collection.add(userModel);

            userModel.save(null, {
             success: function (user) {
                console.log(user, "save success")
                var data = {trigger:true}; 
                that.model.get("vent").trigger("routerHome", data); 
              },
              error: function () {
                console.log(arguments, "save error!")
                that.displayErrorMessage("save error: unable to save model");
              }
            });

            // track this create attempt in google analytics
            var dimensionValue = 'create bearer attempt';
            ga('set', 'dimension2', attempt);

            _gaq.push(['_trackEvent', 'users', 'create attempt']);

          });

          

        }

        

      }, 

      onDeleteUserHandler: function (e) {
        var that = this;

        that.deleteUser(); 
        
        //return false;
      },

      deleteUser: function(){
        var that = this;

        that.userModel.destroy({
          success: function () {
            console.log('UserEditView - model destroyed');
            var data = {trigger:true}; 

            //var localStorageName = "users"; 
            //that.localStorage().removeItem( localStorageName + "-" + model.id );
            
            that.model.get("vent").trigger("routerHome", data); 
          }, 
          error: function () {
            console.log(arguments, "delete error!")
            that.displayErrorMessage("delete error: Unable to delete model");
          }
        });
      },

      onCancelClickHandler: function(e) {
        var that = this;

        var data = {trigger:true}; 
        that.model.get("vent").trigger("routerHome", data); 

      }, 

      displayErrorMessage: function(messageStr){
         $("#serverMessage").val(messageStr);
      }

    });

return UserEditView;

});