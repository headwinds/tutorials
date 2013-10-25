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
    },

    render: function( userCollection ){
      var that = this;
      
      var compiledTemplate = _.template( userManagerTemplate );
      that.$el.html( compiledTemplate ); 

      var userCollectionView = new UserCollectionView({collection: userCollection});
      userCollectionView.render(); 

    }
    

  });

  return UserManagerView;
});