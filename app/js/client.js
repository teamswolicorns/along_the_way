'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = require('./views/view-map');
var MapModel = require('./models/model-map');

var map = new Map();
var mapView = new MapView({model: map}); //makes a new map view and brings in the new map model (created above) to this new map view
$('#map').html(mapView.$el);

