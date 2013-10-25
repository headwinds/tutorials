define([
	'underscore', 
	'backbone',
	'marionette', 
	'views/common/button/ButtonVectorView', 
	'models/contentCreation/question/QuestionModel', 
	'text!templates/contentCreation/question/connectQuestionItemTemplate.html'
], function(_, Backbone, Marionette, ButtonVectorView, QuestionModel, connectQuestionItemTemplate) {
	
	var ConnectQuestionItemView = Backbone.Marionette.ItemView.extend({

		tagName: "li",

		modelEvents: {
		    "change": "modelChangedHandler"
		},

		collectionEvents: {
		    "add": "onModelAddedHandler"
		},

		events: { 
			"click .questionTitle" : "onQuestionTitleClickHandler", 
			"mouseover .questionTitle" : "onQuestionTitleMouseOverHandler", 
			"mouseout .questionTitle" : "onQuestionTitleMouseOutHandler"
		},

		template : function(serialized_model) {
			//console.log(serialized_model);
			
			var langObj = serialized_model.mainModel.get("langModel").toJSON(); 

			serialized_model.contentCreation = langObj.contentCreation; 
			serialized_model.common = langObj.common; 

			return _.template(connectQuestionItemTemplate, serialized_model, {variable: 'data'});
		}, 

		onRender: function(){
		   //
		   // add the icon 
		   var that = this; 
		   var attrObj = { width: 20, height: 20, color: "#16989b" };  

		   var svgPath = "images/common/close.svg";

		   var addNoteIconView = new ButtonVectorView();

		   addNoteIconView.on("svgReady", function(){

		   		var svgClone = addNoteIconView.svgClone;
				//console.log( that, "<-- svgClone ConnectQuestionItemView - onRender & svgReady");

				d3.select(svgClone).attr("width", attrObj.width + "px" );
				d3.select(svgClone).attr("height", attrObj.height + "px");
				d3.select(svgClone).attr("fill", attrObj.color);

		   		$(that.el).find(".questionActionBtn").append(svgClone); 

		   }); 

		   addNoteIconView.loadStyledSVG(svgPath, attrObj); 
		   
 		},

		onQuestionTitleClickHandler: function(e){
			var that = this;

			console.log("QuestionItemView - click");

			e.preventDefault(); 
			e.stopPropagation(); 

			that.remove(); 

			//var vent = that.model.get("mainModel").get("vent");
			//var data = { well: "well"}; 

			//vent.trigger( "flashContent", data);
		},

		onQuestionTitleMouseOverHandler: function(e){
			
			var that = this;
			d3.select( that.el ).select(".questionActionBtn").select("svg").attr("fill", "#fff");
		}, 

		onQuestionTitleMouseOutHandler: function(e){
			
			var that = this;
			d3.select( that.el ).select(".questionActionBtn").select("svg").attr("fill", "#16989b");
		}, 

		modelChangedHandler: function(e){
			console.log("QuestionItemView - modelChangedHandler");
		},

		onModelAddedHandler: function(e){
			console.log("QuestionItemView - onModelAddedHandler");
		}

	});

	return ConnectQuestionItemView;
});