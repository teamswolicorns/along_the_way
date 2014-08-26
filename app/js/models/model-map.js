'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  defaults: {
    startLat: 0,
    startLong: 0,
    zoom: 8,
    mapOptions: {
      locationArray: [],
      startLat: 0,
      startLong: 0,
      zoom: 8,
      center: new google.maps.LatLng(51.5072, 0.1275)
    }
  },

  initialize: function(){
    var self = this;
    console.log("model initialized");
    this.setStartLoc();
    console.log('initializing model-map.js - this is here to ensure it is not called multiple times');
    // this.set('mapOptions.center', new google.maps.LatLng(self.get('startLat'), self.get('startLong')));
  },
  setStartLoc: function() {
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
    } else {
      alert("navigator.geolocation not supported");
    }
  },
  setLocation: function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(this.get('startLat'));
    console.log(this.get('startLong'));
    this.set('mapOptions.center', new google.maps.LatLng(latitude, longitude));
    console.log("This is the mmapOptions center" + this.get('mapOptions.center'));
  },

  calcRoute: function() {
  //if you need to pass something from the view to the model, you can do so in this function
  //we don't need to in this case, just a note for later
    console.log("calculating route called in model-map.js");

    var currentDestination = this.get('destination');
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
