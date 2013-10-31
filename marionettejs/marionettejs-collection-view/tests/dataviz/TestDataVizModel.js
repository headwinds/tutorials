define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone ) {

	var TestDataVizModel = Backbone.Model.extend({

		defaults: {
			passed: 0,
			failed: 0,
			duration: 0,
			percent: 100
		},

		intialize:function() {

			console.log(mocha, "TestDataVizModel"); 

		}

	});

	return TestDataVizModel;

});

	

