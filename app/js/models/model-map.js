'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Map = Backbone.Model.extend({
  defaults: {
    mapOptions: {
      zoom: 8,
      center: new google.maps.LatLng(47.601, -122.333), //needs a 3 digit decimal
      //might need a type?
      start:'47.601, -122.333', //probably formatted wrong
      destination: '50.601, -150.333',
    }
  },

  initialize: function() {
    console.log('initializing model-map.js - this is here to ensure it is not called multiple times');
  },

  calcRoute: function(e) {
    e.preventDefault();
    console.log("calculating route called in model-map.js");
    //var currentDestination = this.get('destination');
    console.log("currentDestination is: " + currentDestination);
    var start = this.get('start');
    var destination = this.get('destination');
    var request = {
      origin:start,
      destination:destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

});

module.exports = Map;
