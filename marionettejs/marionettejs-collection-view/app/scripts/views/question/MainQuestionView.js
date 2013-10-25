define([
	'underscore', 
	'backbone',
	'marionette', 
	'models/contentCreation/question/QuestionModel', 
	'collections/contentCreation/question/QuestionCollection',
	'views/contentCreation/question/ConnectQuestionCollectionView', 
	'text!templates/contentCreation/question/mainQuestionTemplate.html'
], function(_, Backbone, Marionette, QuestionModel, QuestionCollection, ConnectQuestionCollectionView, mainQuestionTemplate) {
	
	var MainQuestionView = Backbone.View.extend({

		el: null,
		langModel: null, 

		initialize:function(options){
		
			this.langModel = options.model.get("langModel"); 
			this.model = new QuestionModel( {mainModel: options.model });

			var vent = options.model.get("vent"); 
			vent.on("flashContent", this.onFlashContentHandler, this); 
		},

		render: function( elementId ) {
			var that = this;

			that.el = $("#" + elementId);
		    
		    var data = that.langModel.toJSON(); 	   

		    var compiledTemplate = _.template( mainQuestionTemplate, data, {variable: "data"} );
		    that.el.append(compiledTemplate);
		},

		onFlashContentHandler: function() {
			console.log("MainQuestionView - heard it");
		}

	});

	return MainQuestionView;
});