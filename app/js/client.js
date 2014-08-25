'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapModel = require('./models/model-map');
var MapView = require('./views/view-map');


$(function() {
   //makes a new map view and brings in the new map model (created above) to this new map view
  var mapModel = new MapModel({});
  var mapView = new MapView({model: mapModel});
});
