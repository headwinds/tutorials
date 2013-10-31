define([
  'underscore', 
  'backbone',
  'models/user/UserModel', 
  'collections/user/UserCollection',
  'views/user/UserCollectionView', 
  'text!templates/user/userEditTemplate.html'
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
        }

      }, 

      render: function (userModel) {
        var that = this;

        var races = [ {title: "man", isSelected: false}, 
                      {title: "dwarf", isSelected: false}, 
                      {title: "hobbit", isSelected: false}, 
                      {title: "elf", isSelected: false}]; 

        var professions = [ {title: "warrior", isSelected: false}, 
                            {title: "archer", isSelected: false}, 
                            {title: "ranger", isSelected: false}, 
                            {title: "wizard", isSelected: false}, 
                            {title: "burglar", isSelected: false}];    
       
        if (null !== userModel) {

          _.each( races, function(race) {
             if ( userModel.get("race") === race.title ) race.isSelected = "selected"; 
          }); 

          _.each( professions, function(profession) {
             if ( userModel.get("class") === profession.title ) profession.isSelected = "selected"; 
          }); 

        }
                    
        var data = { races: races, professions: professions, userModel: userModel, _:_ };

        console.log(professions, "render edit");

        var template = _.template(userEditTemplate, data, {variable: "data"});

        that.$el.html(template);

        that.userModel = userModel;

      },

      onUpdateUserHandler: function (e) {
        var that = this;
        
        that.updateUser(); 
      
      },

      updateUser: function(){

        var userName = $(".edit-user-form").find("#userName").val();
        var userRace = $(".edit-user-form").find("#userRace").val();
        var userClass = $(".edit-user-form").find("#userClass").val();

        if ( null !== that.userModel ) {

          var updateUserDetails = { name: userName, race: userRace, class: userClass, id: that.userModel.get("id") }; 

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

          var newUserDetails = { name: userName, race: userRace, class: userClass, id: that.collection.models.length }; 

          var userModel = new UserModel(newUserDetails);

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

        }
      }, 

      onDeleteUserHandler: function (e) {
        var that = this;

        that.deleteUser(); 
        
        //return false;
      },

      deleteUser: function(){
        that.userModel.destroy({
          success: function () {
            console.log('destroyed');
            var data = {trigger:true}; 
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

/*
function htmlEncode(value){
      return $('<div/>').text(value).html();
    }

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};
*/