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
      console.log("UserManagerView - init");

      this.model = options.model; 
      this.collection = options.collection; 

      var that = this;
      
      var successCallback = function(collection, response, options) {
          that.render(); 
      }

      var errorCallback = function(collection, response, options) {
          console.log(arguments, "UserManagerView - errorCallback");
          
          if ( collection.models.length === 0 ) {
            that.collection.createDummyData(); 
          }

          that.render(); 
      }

      //console.log( )

      this.collection.loadData( successCallback, errorCallback ); 

    },

    render: function(){
      var that = this;
      
      var compiledTemplate = _.template( userManagerTemplate );
      that.$el.html( compiledTemplate ); 

      var userCollectionView = new UserCollectionView({collection: that.collection});
      userCollectionView.render(); 

      that.updateInstructions(); 

    },

    updateInstructions: function() {
        var that = this;
        
        var instructionsText = "Can you list the 9 main characters who attempted to deliver the one ring to Mount Doom?";  

        $("#instructions").text(instructionsText); 
      }, 
    

  });

  return UserManagerView;
});