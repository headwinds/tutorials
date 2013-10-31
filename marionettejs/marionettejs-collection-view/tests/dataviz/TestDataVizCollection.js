define([
	'underscore', 
	'backbone',
	'dataviz/TestDataVizModel',
	'backbone.localStorage'
	 ], function(_, Backbone, TestDataVizModel ) {
	
	var TestDataVizCollection = Backbone.Collection.extend({
		url: '/users',
		model: TestDataVizModel,
		localStorage: new Store("tests-marionettejs-collection-view"),

	});

	return TestDataVizCollection;
});