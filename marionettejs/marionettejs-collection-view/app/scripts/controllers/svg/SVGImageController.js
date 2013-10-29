define([
	'jquery',
	'underscore', 
	'backbone',
	'marionette'
], function($, _, Backbone, Marionette) {

    var SVGImageController = Backbone.Marionette.Controller.extend({

    	svgClone: null, 
    	
	  	loadSVG: function( imgPath, styleObj, svgTarget ){

	 		var that = this;
	 			
 			var xhr = new XMLHttpRequest();
		    xhr.svgTarget = svgTarget;
		    
		    xhr.open('get', imgPath, true);

		    xhr.onreadystatechange = function(){
		      	
		      	if (xhr.readyState === 4) {

		      		// xhr.responseXML.documentElement <-- worked locally but when I put it on the server it's null 
		      		// props: 
		      		// http://stackoverflow.com/questions/3781387/responsexml-always-null
		      		// http://stackoverflow.com/questions/10732013/ajax-retrieving-xml-response
		     
		      		var xmlDoc = xhr.responseText;
            		xmldom = (new DOMParser()).parseFromString(xmlDoc, 'text/xml');

            		node = xmldom.documentElement; // lucky guess ;-D

			      	var svgClone = that.cloneToDoc(node);
			      
			    	window.svgRoot = svgClone; // for reference by scripts

			       	d3.select(svgClone).attr("width", styleObj.width + "px" );
				   	d3.select(svgClone).attr("height", styleObj.height + "px");

				   	var paths = d3.select(svgClone).select("path"); 

				   	paths
				   		.attr("fill", function(d,i){ return styleObj.colors[i] } );

				   	that.svgClone = svgClone;

				   	xhr.svgTarget.append(svgClone);

			       	delete window.svgRoot;
			     
			       	that.trigger("svgReady"); // optional 
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

	return SVGImageController;
});