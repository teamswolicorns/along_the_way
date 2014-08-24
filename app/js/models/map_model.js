var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var mapModel = Backbone.Model.extend({
  url: '',
  defaults: {
    origin:{lat:47.60,lng:-122.33},
    destination:{lat:45.20,lng:-122.68},
    filters:[],
    radius:''
  },

  //puts the map in the screen

  initialize: function() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var start = new google.maps.LatLng(41.850033, -87.6500523); //stubbed as Chicago, need to replace with user's actual geographic location
    var end = new google.maps.LatLng(37.76839, -122.510894); //stubbed as ocean beach, replace with user's input
    var markers = [];
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
  }

});
