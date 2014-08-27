'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//set up directionsService in the model (the render component is in the view)

module.exports = Backbone.Model.extend({
  defaults: {
    mapOptions: {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15,
      center: new google.maps.LatLng(51.459684, -3.160270) //using cardiff as default because nerd
    },
    //placeTypes:['gym','spa','bicycle_store'],
    placeTypes:['gym'],
    end: new google.maps.LatLng(45.520791, -122.647899)//using portland as a hardcoded end
    //end: new google.maps.LatLng(47.595077, -122.324769)//using seattle as a hardcoded end
  },

  initialize: function() {
    var self = this; //if 'this' isn't behaving as expected, do this

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.set('mapOptions.center', new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        //Need to fake a start location? The test .set below fakes location as a beach in Chicago
        //self.set('mapOptions.center', new google.maps.LatLng(41.759952, -87.545198));
      });
    } else {
      console.log("navigator.geolocation not supported");
    }
  },

});
