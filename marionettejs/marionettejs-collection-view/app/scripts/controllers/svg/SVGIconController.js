define([
	'jquery',
	'underscore', 
	'backbone',
	'marionette'
], function($, _, Backbone, Marionette) {

    var SVGIconController = Backbone.Marionette.Controller.extend({

    	svgClone: null, 
    	
	  	loadSVG: function( imgPath, styleObj, svgTarget ){

	 		var that = this;
	 			
 			var xhr = new XMLHttpRequest;
		    xhr.svgTarget = svgTarget;
		    
		    xhr.open('get', imgPath, true);

		    xhr.onreadystatechange = function(){
		      	
		      	if (xhr.readyState === 4) {
		      
			      	var svg = xhr.responseXML.documentElement;
			      	var svgClone = that.cloneToDoc(svg);
			      
			    	window.svgRoot = svgClone; // For reference by scripts

			       	d3.select(svgClone).attr("width", styleObj.width + "px" );
				   	d3.select(svgClone).attr("height", styleObj.height + "px");

				   	var paths = d3.select(svgClone).select("path"); 

				   	paths
				   		.attr("fill", function(d,i){ return styleObj.colors[i] } );

				   
				   	that.svgClone = svg;

				   	xhr.svgTarget.append(svgClone);

			       	delete window.svgRoot;
			     
			       	that.trigger("svgReady");
		       	};
		    };
		    
		    xhr.send();

	  	},

	  	getClone: function(){
	  		var that = this;
	  		return that.svgClone; 
	  	}, 

	   cloneToDoc: function( node, doc ){
	   		var that = this;

		    if (!doc) doc=document;
		    
		    var clone = doc.createElementNS(node.namespaceURI,node.nodeName);
		    
		    for (var i=0,len=node.attributes.length;i<len;++i){
		      var a = node.attributes[i];
		      if (/^xmlns\b/.test(a.nodeName)) continue; // IE can't create these
		      clone.setAttributeNS(a.namespaceURI,a.nodeName,a.nodeValue);
		    }
		    
		    for (var i=0,len=node.childNodes.length;i<len;++i){
		      var c = node.childNodes[i];
		      clone.insertBefore(
		        c.nodeType==1 ? that.cloneToDoc(c,doc) : doc.createTextNode(c.nodeValue),
		        null
		      )
		    }
		    return clone;
	  	}

    });

	return SVGIconController;
});