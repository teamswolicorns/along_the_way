'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  defaults: {
    mapOptions: {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15,
      center: google.maps.LatLng(51.507,0.127) //using london as default
    }
  },

  initialize: function(){
    var self = this; //if 'this' isn't behaving as expected, do this
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('mapOptions.center', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          //Need to fake a location? The test .set below fakes location as a beach in Chicago
          //self.set('mapOptions.center', new google.maps.LatLng(41.759952, -87.545198));
      });
    } else {
      console.log("navigator.geolocation not supported");
    }
  },

  //work in progress for polyline
  calcRoute: function() {
    console.log("calculating route called in model-map.js");
    //this is commented out because it's work in progress for building the route
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
    });
  */
  }

});
