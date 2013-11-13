define([
  'jquery',
  'underscore',
  'backbone',
  'dataviz/TestDataVizModel',
  'dataviz/TestDataVizCollection'
], function($, _, Backbone, TestDataVizModel, TestDataVizCollection) {

	var TestDataVizView = Backbone.View.extend({

		players: null, 
		playersData: null, 
		force: null,
		svg: null, 

		el: "#datavizContainer",

		events: {
			
		},

		initialize:function( options ){
			
			this.model = new TestDataVizModel();
			this.listenTo(this.model, "change:passed", this.onModelPassedChangeHandler);
			this.listenTo(this.model, "change:failed", this.onModelFailedChangeHandler);
			this.listenTo(this.model, "change:duration", this.onModelChangeHandler);
			this.listenTo(this.model, "change:percent", this.onModelChangeHandler);			

			this.render(); 
		},

		render: function(){
			var that = this;
			that.createViz(); 
		},

		onPassesChangedHandler: function(e){
			console.log("TestDataVizView - onPassesChangedHandler");
		}, 

		onModelPassedChangeHandler: function(){
			console.log("TestDataVizView - onModelPassedChangeHandler");
			var that = this;

			that.movePlayers();
		}, 

		onModelFailedChangeHandler: function(){
			console.log("TestDataVizView - onModelFailedChangeHandler");
			var that = this;
		}, 

		onModelChangeHandler: function(){
			//console.log("TestDataVizView - onModelChangeHandler");
		}, 

		createViz: function(){

			var that = this; 

			window.DataVizView = that; // hack - d3 only provides 2 arguments - I want to pass 3: event name, function, sope
		
			var width = 960,
			    height = 100;

			var fill = d3.scale.category10();

			that.playersData = d3.range(3).map(function(i) {
			  return {index: i, name: "passes" + i};
			});

			that.force = d3.layout.force()
			    .nodes(that.playersData )
			    .size([width, height])
			    .on("tick", that.onTickHandler)
			    .start();

			that.svg = d3.select("#datavizContainer").append("svg")
			    .attr("width", width)
			    .attr("height", height)
			    .style("border", "1px solid grey")
			    .style("width", "100%");

			that.players = that.svg.selectAll(".node")
			    .data(that.playersData )
			  .enter().append("circle")
			    .attr("class", "node")
			    .attr("cx", function(d) { return d.x; })
			    .attr("cy", function(d) { return d.y; })
			    .attr("r", 18)
			    .attr("transform", "translate(50,40) scale(0.5)")
			    //.style("fill", function(d, i) { return fill(i & 3); })
			    .style("fill", "olivedrab")
			    //.style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
			    .call(that.force.drag)
			    .on("mousedown", function() { d3.event.stopPropagation(); });

			that.svg.style("opacity", 1e-6)
			  .transition()
			    .duration(1000)
			    .style("opacity", 1);
		},

		onTickHandler: function(e){

			// Push different nodes in different directions for clustering.
			 var that = this;
			  
			  if ( undefined !== that.playersData ) {

			  	 var k = 6 * e.alpha;

				  that.playersData.forEach(function(o, i) {
				    o.y += i & 1 ? k : -k;
				    o.x += i & 2 ? k : -k;
				  });

				  that.players.attr("cx", function(d) { return d.x; })
			      		.attr("cy", function(d) { return d.y; });

				}

		}, 
		
		movePlayers: function(){
			var that = this;

			var myScope = window.DataVizView; 

			if ( undefined !== myScope.playersData ) {

				myScope.playersData.forEach(function(o, i) {
				    o.x += (Math.random() - .5) * 80;
				    o.y += (Math.random() - .5) * 80;
				  });
				
			
				myScope.players = myScope.svg.selectAll("circle")
			    	.data(myScope.playersData )
			     		.transition()
			    			    .attr("cx", function(d) { return d.x; })
							    .attr("cy", function(d) { return d.y; })
							    .attr("r", 18);
			  

			    myScope.force.resume();
			}

		 }

	});
	
	return TestDataVizView;

});
