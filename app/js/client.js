'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapModel = require('./models/model-map');

var MasterView = require('./views/view-master');
var SearchView = require('./views/view-search');
var MapView = require('./views/view-map');

$(function() {
   //makes a new map view and brings in the new map model (created above) to this new map view
  var mapModel = new MapModel({});

  var searchView = SearchView({});
  var masterView = MasterView({});
  var mapView = new MapView({model: mapModel});

  //$('#mapDiv').html(mapView.el);
  $('content').html(mapView.el);
});
