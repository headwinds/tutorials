define([
  'underscore', 
  'backbone',
  'models/user/UserModel', 
  'collections/user/UserCollection',
  'views/user/UserCollectionView', 
  'text!templates/user/userEditTemplate.html'
], function(_, Backbone, UserModel, UserCollection, UserCollectionView, userEditTemplate ) {

var UserEditView = Backbone.View.extend({
      
      vent: null, 
      id: null, 
      el: '.page',
      
      events: {
        'submit .edit-user-form': 'onUpdateUserHandler',
        'click .delete': 'onDeleteUserHandler'
      },

      initialize: function(options){
        this.collection = options.collection;
        this.vent = options.vent; 
        this.model = options.model; 
      }, 

      onUpdateUserHandler: function (e) {
        var that = this;
 
        var userName = $(".edit-user-form").find("#userName").val();
        var userRace = $(".edit-user-form").find("#userRace").val();
        var userClass = $(".edit-user-form").find("#userClass").val();

        that.collection.add([ { name: userName, race: userRace, class: userClass, id: that.id } ], { merge: true } );
        
        //e.preventDefault(); 
        //e.stopPropagation(); 

        //var user = new UserModel({ name: name, race: race, class: class, id:  that.id });
        
        
        ///user.save(userDetails, {
        // success: function (user) {
        //   router.navigate('', {trigger:true});
        //  }
        //});

        //return false;

      },

      onDeleteUserHandler: function (e) {
        this.user.destroy({
          success: function () {
            console.log('destroyed');
            router.navigate('', {trigger:true});
          }
        });
        return false;
      },

      render: function (options) {
        var that = this;

        var user = options.user; 

        var template = _.template(userEditTemplate, {user: user});
        that.$el.html(template);

        that.id = user.id; 


        /*
        if(options.id) {
          that.user = new UserModel({id: options.id});
          that.user.fetch({
            success: function (user) {  
              console.log(user, "UserEditView - success");  
              var template = _.template(userEditTemplate, {user: user});
              that.$el.html(template);
            }
          })
        } else {
          var template = _.template($('#edit-user-template').html(), {user: null});
          that.$el.html(template);
        }
        */

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