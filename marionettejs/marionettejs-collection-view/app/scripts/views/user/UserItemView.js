define([
	'underscore', 
	'backbone',
	'marionette', 
	'models/user/UserModel', 
	'text!templates/user/userItemTemplate.html'
], function(_, Backbone, Marionette, UserModel, userItemTemplate) {
	
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
			return _.template(userItemTemplate, serialized_model, {variable: 'data'});
		}, 

		onRender: function(){
		   //console.log(this.model, "UserItemView - onRender");
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