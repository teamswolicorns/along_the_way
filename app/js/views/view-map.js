//view-map is a child of view-master
'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//declare these vars out here so multiple view-map methods can access them
var directionsService;
var directionsDisplay;
var map;

module.exports = Backbone.View.extend({
  type: "Map View", //tutorial I read says this is good for debugging, not sure yet how it's used
  id: 'content',

  initialize: function() {
    /*
    attach listener for a change to mapOptions.center, and when that change occurs, use this.centerMap
    create a new map with mapOptions
    */
    this.model.on("change mapOptions.center", this.centerMap, this);
    map = new google.maps.Map(this.el,this.model.get('mapOptions'));
  },

  centerMap: function() {
    /*
    centerMap centers the map based on data in the model
    it also attaches a little "you are here" flag
    */
    var infowindow = new google.maps.InfoWindow({
        map: map,
        position: this.model.get('mapOptions.center'),
        content: 'You are here'
    });
    map.setCenter(this.model.get('mapOptions.center')); //moved from render() because having it in render prevented the polyline from working
    this.render();
  },

  getDirections: function() {
    /*
    getDirections is lifted almost verbatim from the maps API
    except it pulls data from our model where appropriate
    */
    console.log("called getDirections in view-map.js");

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    var request = {
      origin: this.model.get('mapOptions.center'),
      destination: this.model.get('end'),
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log("status was okay, displaying directions now...");
        directionsDisplay.setDirections(response);
      }
    });
    this.render();
  },

  render: function() {
    return this;
  },

});

