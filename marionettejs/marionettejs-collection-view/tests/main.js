require.config({
  baseURL: '',
  shim: {
      
      d3: {
          exports: 'd3'
      },

      sinonchai: {
          exports: 'sinon'
      },

      mocha: {
          exports: 'mocha'
      }
  },
  paths: {
    jquery: "../bower_components/jquery/jquery",
    underscore: "../bower_components/underscore-amd/underscore",
    backbone: "../bower_components/backbone-amd/backbone", 
    "backbone.wreqr": "../bower_components/backbone.wreqr/lib/amd/backbone.wreqr", 
    "backbone.eventbinder": "../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder", 
    "backbone.babysitter": "../bower_components/backbone.babysitter/lib/amd/backbone.babysitter", 
    "backbone.localStorage": "../bower_components/backbone.localStorage/backbone.localStorage-min", 
    marionette: "../bower_components/marionette/lib/core/amd/backbone.marionette",
    d3: "../bower_components/d3/d3.min",
    text: '../bower_components/text/text',
    templates: '../templates',
    
    views: "../app/scripts/views",
    models: "../app/scripts/models",
    collections: "../app/scripts/collections",
    controllers: "../app/scripts/controllers",
    templates: "../app/templates",

    mocha: '../bower_components/mocha/mocha',
    should: 'should', // needs to be added to bower 
    chai: '../bower_components/chai/chai',
    sinonchai: '../bower_components/sinon-chai/lib/sinon-chai'
  }
});


require(['require', 'chai', 'sinonchai', 'mocha'], function( require, chai, sinon  ){

  ////////////////////////////////////////// MOCHA SETUP
 
  // Chai
  var should = chai.should();

  /*globals mocha */
  mocha.setup('bdd');
  mocha.setup({ignoreLeaks: true});

  ////////////////////////////////////////// VIZ


  var dataVizView;  

  require([ 'dataviz/TestDataVizView', 'userTests', 'd3' ], function(TestDataVizView) {
      dataVizView = new TestDataVizView();

      var runner = mocha.run();
    
      var testsPassed = 0;
      var testsFailed = 0;
      
      var onTestPasseHandler = function(e){
        testsPassed++;
        //console.log("onTestPasseHandler: " + e.title + " - passed:" + testsPassed);

        dataVizView.model.set("passed", testsPassed);

      };

      var onTestFailHandler = function(e){
        testsFailed++;
        //console.log("onTestFailHandler: " + e.title + " - failed:" + testsFailed);

        dataVizView.model.set("failed", testsFailed);

      };

      var onTestSuiteEndHandler = function(e){
        //console.log("onTestSuiteEndHandler: " + e.title);
      };

      runner.on("pass", onTestPasseHandler);
      runner.on("fail", onTestFailHandler);
      runner.on("suite end", onTestSuiteEndHandler);

       /**
       * Initialize a `Runner` for the given `suite`.
       *
       * Events:
       *
       *   - `start`  execution started
       *   - `end`  execution complete
       *   - `suite`  (suite) test suite execution started
       *   - `suite end`  (suite) all tests (and sub-suites) have finished
       *   - `test`  (test) test execution started
       *   - `test end`  (test) test completed
       *   - `hook`  (hook) hook execution started
       *   - `hook end`  (hook) hook complete
       *   - `pass`  (test) test passed
       *   - `fail`  (test, err) test failed
       *
       * @api public
       */

  });


 
});
