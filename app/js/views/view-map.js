//view-map is a child of view-master
'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var map;
module.exports = Backbone.View.extend({
  type: "Map View", //tutorial I read says this is good for debugging, not sure yet how it's used
  id: 'content',

  initialize: function() {
    this.model.on("change mapOptions.center", this.render, this); //attach a listener
    map = new google.maps.Map(this.el,this.model.get('mapOptions'));
  },

  getDirections: function(map) {
    console.log("called getDirections in view-map.js");
    var directionService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    var request = {
      origin: this.model.get('mapOptions.center'),
      destination: this.model.get('end'),
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    this.render();
  },

  render: function() {
    map.setCenter(this.model.get('mapOptions.center'));
    return this;
  },

});

