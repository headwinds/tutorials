 
page refresh 

<a href="#"></a>

will cause a page refresh and to prevent that ensure that the event is stopped once it reaches its handler 

     onVerifyClickHandler: function(e) {
        var that = this;

        e.preventDefault();
        e.stopPropagation(); 


render 


el: ".page", 

render: function(){
      console.log("UserManagerView - render" );

      var that = this;
      
      that.$el.empty(); 
      var compiledTemplate = _.template( userManagerTemplate, data, {variable: data } );

      that.$el.append(compiledTemplate);     
 }    

 collection not refreshing on fetch

 that.fetch( { success: successCallback, error:  errorCallback, remove: false } );

 testing with local storage - probably want to separate your test data from your real data

 localStorage: new Store("users") vs localStorage: new Store("test-users"),

  changeView: function(){
        var that = this; 

        var data = {trigger: false}; // importat to not trigger refresh and wreck your data state!
        that.model.get("vent").trigger("routerHome", data); 
      }


      PROBLEMS

      refresh on a url - I need to rebuild the right state
      /app not /app/ not /app/# 


      http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/ 

      “Whenever I hit the same route more than once, I end up getting seeing this call being made multiple times. It seems to accumulate another call every time I hit the route. What’s going on?”

      event stacking 
      Guilty 
      "For example, we could have a router with route methods that instantiate new views and simply replace the html of our main content area"

      currentView - amazing! 