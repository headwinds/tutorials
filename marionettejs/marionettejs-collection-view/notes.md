 
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