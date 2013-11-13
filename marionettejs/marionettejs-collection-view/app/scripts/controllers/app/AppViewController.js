define([
	'jquery',
	'underscore', 
	'backbone',
	'marionette'
], function($, _, Backbone, Marionette) {

    var AppViewController = Backbone.Marionette.Controller.extend({

	    currentView: null,

	    showView: function(view, bSelfRender ) {

	    	var that = this;

	    	if (that.currentView) {

	    		console.debug("AppViewController - view removed");

	      		that.currentView.remove();
	      		that.currentView.unbind();

	      		that.currentView = null;

	    	}
	 
	    	that.currentView = view;
	    	
	    	if (!bSelfRender) that.currentView.render();
	    }

   	});

	return AppViewController;

});