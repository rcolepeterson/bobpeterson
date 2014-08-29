## Angular-Boilerplate

This app tries to adhere to the Angular best practices, as defined by Google, and uses a modular structure to organize the code.
[Angular Best Practice for App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

This code base is a port of the MeanJS clent code base and it's docs can be used as a reference. [Meanjs Docs](http://meanjs.org/docs.html#angularjs-modules). 

To run app ... get code and ...

$ npm install
$ bower install
grunt serve

###App Structure
app/
  scripts/
  	> application.js *-initializes the app*
  	> config.js  *-application configuration module for AngularJS application*
  	> common/  *-common code*
  	> modules/
  	> styles/
	index.html


### Module Structure
So how should you add a new module?

To add a new module create a new folder in the app/scripts/modules folder. The directory structure should look something like this:

modules/
	about/
		>config/
		>controllers/
		>css/
		>directives/
		>filters/
		>images/
		>services/
		>tests/
		>views/
		about.module.js

In each folder you'll include the appropriate module entities.

Add your module.js file, which should look something like this:

//Use Application configuration module to register a new module and dependencies.
ApplicationConfiguration.registerModule('about',['about.directives']);

The registerModule method will create your module and push it to the dependencies list of your AngularJS main application module.

### Build Process

The build process is a port of the yeoman/generator-angular build process and it's docs can be used as a reference. [yeoman/generator-angular](https://github.com/yeoman/generator-angular). 


###TODO: Format app structure in this file.
###TODO: Figure out how to best deal with module > images.
###TODO: Figure out how to grab scss from multiple directories and compile into one main.css file, so that each module is in charge of it's own sass file and I do not have to import them in the main.scss file.

cole.peterson@possible.com

