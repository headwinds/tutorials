({
    baseUrl: "app/scripts",
    paths: {
        jquery: "../../bower_components/jquery/jquery",
	    underscore: "../../bower_components/underscore-amd/underscore",
	    backbone: "../../bower_components/backbone-amd/backbone", 
	    "backbone.wreqr": "../../bower_components/backbone.wreqr/lib/amd/backbone.wreqr", 
	    "backbone.eventbinder": "../../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder", 
	    "backbone.babysitter": "../../bower_components/backbone.babysitter/lib/amd/backbone.babysitter", 
	    "backbone.localStorage": "../../bower_components/backbone.localStorage/backbone.localStorage-min", 
	    marionette: "../../bower_components/marionette/lib/core/amd/backbone.marionette",
	    text: '../../bower_components/text/text',
	    templates: '../templates'
    },
    name: "main",
    out: "dist/main-built.js"
})