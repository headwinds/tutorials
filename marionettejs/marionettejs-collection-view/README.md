### MarionetteJS Collection View 

After contributing to this awesome set of [Backbone Tutorials](https://github.com/thomasdavis/backbonetutorials), I've realized that I enjoy writing/editing tutorials so much that I've decided it's time branch out of my own and do a bit of piracy in the process. I've swiped his first beginner tutorial and levelled it up a bit.   

I've completely refactored the base Backone views into more specific MarionetteJS Item and Collection Views; applied the RequireJS module loading approach; and, within the ItemView,  there is a little D3 icon experiment.

If an app is built with vector graphics, you should have little worry about how they will respond to different resolutions; the only fear is browsers older than IE9, but they can be backed up with raster fallbacks.

#### DEMO

[View Demo](http://www.headwinds.net/projects/tutorials/marionettejs/marionette-collection-view/)

#### LIBRARIES

[RequireJS](http://requirejs.org/]) is a JavaScript file and module loader

[MarionetteJS](http://marionettejs.com/) make backbone dance

[Backbone.localStorage](http://backbonejs.org/docs/backbone-localstorage.html) plugin to better manage local storage

[Yeoman](http://yeoman.io/) workflow involving Bower and Grunt 

[D3](http://d3.org/) SVG

#### BOWER

To get started, you will first need to need open a terminal and use Bower to install the missing libraries:

bower install  

Bower will then look at the bower.json and install all the dependencies. 


If you go to create your own app, when you need to install new libraries, you can use Bower to install them and update its bower.json at the same time. 

1. initialize the bower app 

	$ bower init 

2. add each library  

$ bower install jquery --save or bower install jquery -S <-- note the capital S
$ bower install backbone.babysitter --save
etc

3. review your bower.json and ensure the libraries have been added to the dependency section. 

#### BUILD

	$ r.js -o build.js

#### License 

(The MIT License)

Copyright (c) 2013 Brandon Flowers @headwinds;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
