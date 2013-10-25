define([
  'underscore', 
  'backbone',
  'marionette', 
  'views/user/UserItemView', 
  'models/user/UserModel', 
  'collections/user/UserCollection'
], function(_, Backbone, Marionette, UserItemView, UserModel, UserCollection ) {
  
  var UserCollectionView = Backbone.Marionette.CollectionView.extend({

    el: "#users",
    tagName: "tbody",
    itemView: UserItemView,
    
    onAfterItemAdded: function(itemView){
          //console.log("UserCollectionView - item was added");
    },

    onRender: function(){
      var that = this;
        
      that.children.each(function(view){
        // you can also loop through items here...
      });
    }

  });

  return UserCollectionView;
});