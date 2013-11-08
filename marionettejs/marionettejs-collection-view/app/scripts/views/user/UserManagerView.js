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
      "click #addHeroBtn" : "onAddHeroClickHandler", 
      "click #removeAllHeroesBtn" : "onRemoveAllHerosClickHandler", 
      "click #verifyBtn" : "onVerifyClickHandler", 
    }, 
      
    initialize:function(options){
      console.log("UserManagerView - init");

      /*
        
        I got into the habit of using: 
        var that = this
        in each of function but sometimes I still lose the scope of this
        and then lean on the bindAll approach where you can add many 
        functions and trap the scope of this like so:
      
         _.bindAll(this, 
                    "render", 
                    "onVerifyClickHandler", 
                    "updateInstructions"); 

        and still I lose this handle sometimes if I don't keep things simple            

      */

      _.bindAll(this, "onVerifyClickHandler"); 

      this.model = options.model; 
      this.collection = options.collection; 

      var that = this;
      
      var successCallback = function(collection, response, options) {

          console.log(that.collection, "UserManagerView - load success");

          that.render(); 
      }

      var errorCallback = function(collection, response, options) {
          console.log(arguments, "UserManagerView - errorCallback");
          
          // probably should display a error message here too...

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

      that.$el.empty(); 
      var compiledTemplate = _.template( userManagerTemplate );

      that.$el.append(compiledTemplate); 

      var userCollectionView = new UserCollectionView({collection: that.collection});
      userCollectionView.render(); 

      that.updateInstructions(); 

      that.delegateEvents(); // once you render and add elements, call delegateEvents to setup up the event listeners for new elements that weren't previously on the
      //$("#verifyBtn").on("click", that.onVerifyClickHandler); if that fails, you can always use jquery ;-D
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

      onAddHeroClickHandler: function(e){
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 

        console.log("UserManagerView - onAddHeroClickHandler" );

        that.model.get("vent").trigger("routerAddHero"); 
        
      }, 

      onRemoveAllHerosClickHandler: function(e){
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 

        console.log("UserManagerView - onRemoveAllHerosClickHandler");

        that.collection.destroyData(); 

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