define([
	'underscore', 
	'backbone',
	'marionette', 
	'views/contentCreation/question/ConnectQuestionItemView'
], function(_, Backbone, Marionette, ConnectQuestionItemView ) {
	
	var ConnectQuestionCollectionView = Backbone.Marionette.CollectionView.extend({

		tagName: "ul",
		itemView: ConnectQuestionItemView, 
		
		onAfterItemAdded: function(itemView){
        	//console.log("QuestionCollectionView - item was added");
        	
	    },

	    onRender: function(){
	        //console.log("QuestionCollectionView - render");   
	    }


	});

	return ConnectQuestionCollectionView;
});