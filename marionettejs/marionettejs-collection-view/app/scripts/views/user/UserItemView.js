define([
	'underscore', 
	'backbone',
	'marionette', 
	'models/user/UserModel', 
	'controllers/svg/SVGImageController', 
	'text!templates/user/userItemTemplate.html'
], function(_, Backbone, Marionette, UserModel, SVGImageController, userItemTemplate) {
	
	var UserItemView = Backbone.Marionette.ItemView.extend({

		tagName: "tr",

		modelEvents: {
		    "change": "modelChangedHandler"
		},

		collectionEvents: {
		    "add": "onModelAddedHandler"
		},

		events: { 
			"click .btn" : "onEditBtnClickHandler"
		},

		template : function(serialized_model) {
			console.log(serialized_model);
			return _.template(userItemTemplate, serialized_model, {variable: 'data'});
		}, 

		onBeforeRender: function(){
			var that = this; 
		   	// console.log(that.model, "UserItemView - onBeforeRender");

		   	that.$el.hide(); 
		 
 		},

		onRender: function(){
		   var that = this; 

		   var iconController = new SVGImageController();

		   var imageName = that.model.get("class");

		   if ( undefined === imageName ) {
		   		console.log(imageName, "UserItemView - error - can't load the image with an undefined name");
		   		
		   		imageName = "warrior"; // don't break the UI - need a generic image 

		   		//return; // I could also not display anything 
		   } 
 
		   var imgPath = "images/" + imageName + ".svg"; 
		   var styleObj = { width: 50, height: 50, colors: ["#666", "0099CC"] };
		   var svgTarget = that.$el.find(".profession"); 

		   //svgTarget.hide();

		   iconController.loadSVG( imgPath, styleObj, svgTarget );

		   iconController.on("svgReady", function(){
		   		that.$el.delay( 250 ).fadeIn(); 
		   }); 
 		},

		onEditBtnClickHandler: function(e){
			var that = this;

			//e.preventDefault(); 
			//e.stopPropagation(); 
			console.log("UserItemView - click");
		},

		modelChangedHandler: function(e){
			console.log("UserItemView - modelChangedHandler");
		},

		onModelAddedHandler: function(e){
			console.log("UserItemView - onModelAddedHandler");
		}

	});

	return UserItemView;
});