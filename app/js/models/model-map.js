'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  defaults: {
    mapOptions: {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 8,
      center: google.maps.LatLng(37.768,-122.510)
    }
  },

  initialize: function(){
    this.setStartLoc();
    console.log("mapOptions center when we call initialize: expect 51,0 " + this.get('mapOptions.center'));
  },

  setStartLoc: function() {
    if(navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
      navigator.geolocation.getCurrentPosition(function(position) {
        //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.set('mapOptions.center', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    } else {
      console.log("navigator.geolocation not supported");
    }
  },

  setLocation: function(position) {
    //this.set('mapOptions.center', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    console.log("mapOptions center after calling setLocation: expect seattle " + this.get('mapOptions.center'));
  },

  calcRoute: function() {
    console.log("calculating route called in model-map.js");
    /*
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
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    }); */
  }

});
