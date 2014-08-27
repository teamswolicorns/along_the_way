//view-map is a child of view-master
'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// TODO we should not have global variables
//declare these vars out here so multiple view-map methods can access them
var directionsService;
var directionsDisplay;
var map;

module.exports = Backbone.View.extend({
  type: "Map View", //tutorial I read says this is good for debugging, not sure yet how it's used
  // id: 'content',

  initialize: function() {
    this.model.on("change", this.modelChanged, this);

    var template = require('../templates/template-map.hbs');
    var data = this.model.attributes;
    this.$el.html(template(data));
    /*
    attach listener for a change to mapOptions.center, and when that change occurs, use this.centerMap
    create a new map with mapOptions
    */
    this.model.on("change mapOptions.center", this.centerMap, this);
    map = new google.maps.Map(this.$('#map').get(0),this.model.get('mapOptions'));
    this.autoComplete(map);
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

  autoComplete: function() {
    var self = this;
    var input = this.$('#destinationLocInput').get(0);
    //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
    var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
          // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);

        // set end point for route - john

        self.model.set('end', new google.maps.LatLng(place.geometry.location.k, place.geometry.location.B));

        self.model.get('end');
        console.log('Longitude is ' + place.geometry.location.B); //John
        console.log('Latitude is ' + place.geometry.location.k); //John
      }
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);
   });
  },

  render: function() {
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});
