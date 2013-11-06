define([
  'underscore', 
  'backbone',
  'views/user/UserCollectionView', 
  'text!templates/user/userManagerTemplate.html'
], function(_, Backbone, UserCollectionView, userManagerTemplate ) {
  
  var UserManagerView = Backbone.View.extend({

    el: ".page", 
    tagName: "div",

    events: {
      "click #verifyBtn" : "onVerifyClickHandler"
    }, 
      
    initialize:function(options){
      console.log("UserManagerView - init");

      /*
        
        I got into the habit of using: 
        var that = this
        in each of function but sometimes I still lose the scope of this
        and then lean on the bindAll approach where you can add many 
        functions and trap the scope of this 
      
         _.bindAll(this, 
                    "render", 
                    "onVerifyClickHandler", 
                    "updateInstructions"); 

      */

      _.bindAll(this, "onVerifyClickHandler"); 

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

      this.collection.loadData( successCallback, errorCallback ); 

    },

    render: function(){
      console.log("UserManagerView - render" );

      var that = this;
      
      var compiledTemplate = _.template( userManagerTemplate );

      that.$el.append(compiledTemplate); 

      console.log("UserManagerView - render" );

      var userCollectionView = new UserCollectionView({collection: that.collection});
      userCollectionView.render(); 

      that.updateInstructions(); 

      //$("#verifyBtn").on("click", that.onVerifyClickHandler); 
      that.delegateEvents(); // once you render and add elements, call delegateEvents to setup up the event listeners for new elements that weren't previously on the

    },

    updateInstructions: function() {
        var that = this;
        
        var instructionsText = "Can you list the 9 main characters who attempted to deliver the one ring to Mount Doom?";  

        $("#instructions").text(instructionsText); 
      }, 

      onVerifyClickHandler: function(e) {
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 

        console.debug("UserManagerView - verify");

        var result = that.collection.verifyHeroes(); 

        var correctMessage = "You've assembled the right ring party! Now remember one does simply walk into Mordor...";
        var wrongMessage = "Sorry, this lot would never make it out of the Shire.";
          
        var feedbackStr = (result) ? correctMessage : wrongMessage; 

         $("#verifyFeedback").text(feedbackStr); 
      }, 

      update: function(){
        var that = this;
        console.log("UserManagerView - update - collection.length: " + that.collection.length );

        that.render();
      },

      remove: function() {
        var that = this;

        //$(".page").empty();

        console.debug("UserManagerView - remove");

        that.stopListening();


        return that;
      }
    

  });

  return UserManagerView;
});