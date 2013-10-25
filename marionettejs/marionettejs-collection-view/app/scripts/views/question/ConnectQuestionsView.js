define([
	'underscore', 
	'backbone',
	'marionette', 
	'views/common/button/ButtonVectorView', 
	'models/contentCreation/question/QuestionModel', 
	'collections/contentCreation/question/QuestionCollection', 
	'views/contentCreation/question/ConnectQuestionCollectionView', 
	'text!templates/contentCreation/question/connectQuestionsTemplate.html'
], function(_, Backbone, Marionette, ButtonVectorView, QuestionModel, QuestionCollection, ConnectQuestionCollectionView, connectQuestionsTemplate) {
	
	var ConnectQuestionsView = Backbone.View.extend({

		el: null,
		connectQuestionCollectionView: null,

		events: {
			"click #addQuestionBtn" : "onAddBtnClickHandler"
		},

		initialize:function(options){

			this.model = new QuestionModel( {mainModel: options.model });
		},

		render: function( elementId ){
			var that = this;

			that.el = $("#" + elementId);
		    
		    var data = that.model.get("mainModel").get("langModel").toJSON(); 	   
		    console.log(data);
		    var compiledTemplate = _.template( connectQuestionsTemplate, data, {variable: "data"} );
		    that.el.append(compiledTemplate);
		},

		displayQuestions: function() {
			var that = this;

			var mainModel = that.model.get("mainModel");

			var itemModel0 = new QuestionModel( { question: "What credit card does intellibank offer?", mainModel: mainModel, state: "entry", isChecked: true });
			var itemModel1 = new QuestionModel( { question: "What's the best credit card for me?", mainModel: mainModel, state: "entry", isChecked: false });
			var itemModel2 = new QuestionModel( { question: "What credit card do you offer?", mainModel: mainModel, state: "entry", isChecked: true });
			var itemModel3 = new QuestionModel( { question: "What credit card does intellibank offer?", mainModel: mainModel, state: "entry", isChecked: true });
			var itemModel4 = new QuestionModel( { question: "What's the best credit card for me?", mainModel: mainModel, state: "entry", isChecked: false });
			var itemModel5 = new QuestionModel( { question: "What credit card do you offer?", mainModel: mainModel, state: "entry", isChecked: true });
			var itemModel6 = new QuestionModel( { question: "What credit card does intellibank offer?", mainModel: mainModel, state: "entry", isChecked: true });
			var itemModel7 = new QuestionModel( { question: "What's the best credit card for me?", mainModel: mainModel, state: "entry", isChecked: false });
			var itemModel8 = new QuestionModel( { question: "What credit card do you offer?", mainModel: mainModel, state: "entry", isChecked: true });	
			var itemModel9 = new QuestionModel( { question: "What credit card does intellibank offer?", mainModel: mainModel, state: "entry", isChecked: true });
			var itemModel10 = new QuestionModel( { question: "What's the best credit card for me?", mainModel: mainModel, state: "entry", isChecked: false });
			

			var models = [itemModel0, 
						  itemModel1, 
						  itemModel2, 
						 ];

			var questionCollection = new QuestionCollection( models );

			that.connectQuestionCollectionView = new ConnectQuestionCollectionView({ 
															model: that.model.get("mainModel"), 
															collection: questionCollection, 
															el: "#questionsList" }); 
			that.connectQuestionCollectionView.render(); 

			that.displayToolbar(); 
		},

		addQuestion: function(){
			console.log("ConnectQuestionsView - addClicked!");
			var that = this; 

			var mainModel = that.model.get("mainModel"); 

			var questionText = $("#addQuestionTxt").val(); 
			var itemModel = new QuestionModel( { question: questionText, mainModel: mainModel, state: "entry", isChecked: true });
		
			that.connectQuestionCollectionView.collection.add(itemModel); 
		}, 

		onAddBtnClickHandler: function(e){
			console.log("ConnectQuestionsView - addClicked!");

			e.preventDefault(); 
			e.stopPropagation();
		}, 

		displayToolbar: function() {

			var attrObj = { width: 20, height: 20, color: "#e88a4f" };  

		    var addNoteIconView = new ButtonVectorView( {svgPath: "images/common/add.svg",
		    												imageId: "addNoteIcon",
		    												styleObj: attrObj } );

		    var addRelatedIconView = new ButtonVectorView( {svgPath: "images/common/add.svg",
		    												imageId: "addRelatedIcon",
		    												styleObj: attrObj } );
		}

	});

	return ConnectQuestionsView;
});