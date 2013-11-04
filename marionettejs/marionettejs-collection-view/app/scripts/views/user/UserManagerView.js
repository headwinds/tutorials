define([
  'underscore', 
  'backbone',
  'views/user/UserCollectionView', 
  'text!templates/user/userManagerTemplate.html'
], function(_, Backbone, UserCollectionView, userManagerTemplate ) {
  
  var UserManagerView = Backbone.View.extend({

    el: ".page", 
    tagName: "div",
    
    initialize:function(options){
      this.model = options.model; 

      var that = this;
      var successCallback = function() {
          that.render(); 
      }

      this.collection.loadData( successCallback ); 

    },

    render: function(){
      var that = this;
      
      var compiledTemplate = _.template( userManagerTemplate );
      that.$el.html( compiledTemplate ); 

      var userCollectionView = new UserCollectionView({collection: that.collection});
      userCollectionView.render(); 

    }
    

  });

  return UserManagerView;
});