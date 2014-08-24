'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = require('./views/map_view');
var MapModel = require('./models/map_model');

var map = new Map();
var mapView = new MapView({model: map}); //makes a new map view and brings in the new map model (created above) to this new map view
$('#map').html(mapView.$el);

