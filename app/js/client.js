'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapModel = require('./models/model-map');
var MapView = require('./views/view-map');


var map = new MapModel({});
var mapView = new MapView({model: map}); //makes a new map view and brings in the new map model (created above) to this new map view
$('#map').html(mapView.$el);

