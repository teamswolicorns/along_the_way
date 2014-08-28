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
var rboxer = new RouteBoxer();
var placeInfoWindow;
var placeService;

module.exports = Backbone.View.extend({

  type: "Map View", //tutorial I read says this is good for debugging, not sure yet how it's used
  // id: 'content',

  initialize: function() {
    var template = require('../templates/template-map.hbs');
    var data = this.model.attributes;
    this.$el.html(template(data));
    /*
    attach listener for a change to mapOptions.center, and when that change occurs, use this.centerMap
    create a new map with mapOptions
    */
    this.model.on("change mapOptions.center", this.centerMap, this);
    this.mapInit();
    this.autoComplete();
  },

  mapInit: function() {
    map = new google.maps.Map(this.$('#map').get(0),this.model.get('mapOptions'));
    placeService = new google.maps.places.PlacesService(map);
  },

  centerMap: function() {
    /*
    centerMap centers the map based on data in the model
    it also attaches a little "you are here" flag
    */
    // var infowindow = new google.maps.InfoWindow({
    //     map: map,
    //     position: this.model.get('mapOptions.center'),
    //     content: 'You are here'
    // });
    map.setCenter(this.model.get('mapOptions.center')); //moved from render() because having it in render prevented the polyline from working
    this.render();
  },

  saveCheckboxData: function() {
    //new checkbox code for team review!
    var checkBoxes = $("form input:checkbox");
    var checkBoxesArray = [];
    for (var i = 0; i < checkBoxes.length; i ++) {
      if (checkBoxes[i].checked) {
        checkBoxesArray.push(checkBoxes[i].value);
      }
    }
    this.model.set('placeTypes', checkBoxesArray);
    console.log("setting placeTypes in the model to: " + this.model.get('placeTypes'));
  },


  getDirections: function() {

    var self = this;
    /* makes a line between point A and point B */
    this.mapInit();
    this.saveCheckboxData();

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    /* route request options */
    var routeRequest = {
      origin: this.model.get('mapOptions.center'),
      destination: this.model.get('end'),
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(routeRequest, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        self.createBoxRegions(response);
      }
    });
    this.$el.children('#map').css('opacity',1);

    this.render();
  },

  createBoxRegions: function(response) {
    var route = response.routes[0];
    var distance = 0.5; //km 0.6 was a good default

    var path = response.routes[0].overview_path;
    var boxes = rboxer.box(path, distance);
    //this.drawBoxRegions(boxes); //comment to turn off boxes

    this.getPlacesInBox(boxes, 0);
  },

  getPlacesInBox: function(boxes, boxi) {
    //thanks for help with this solution is owed to https://gist.github.com/aisapatino/88d99e78abf55e7de051
    console.log("getting places in this box: " + boxes[boxi]);

    if (boxi == boxes.length) {
      console.log("all boxes populated");
      return;
    }

    var boxCenter = this.findMidpoint(boxes[boxi]);
    var self = this;
    var placesRequest = {
      location: new google.maps.LatLng(boxCenter[0], boxCenter[1]),
      radius:1000, //meters
      types: this.model.get('placeTypes'),
      rankBy: google.maps.places.RankBy.PROMINENCE
    };

    //make an info window and run the placesRequest search
    placeInfoWindow = new google.maps.InfoWindow();
    placeService.nearbySearch(placesRequest, function(results, status) {
      /* handle the place services status */
      /* throttle too-fast requests with a one second wait */
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('places status ok, making markers...');
        self.makeMarkersLoop(results);
        self.getPlacesInBox(boxes, boxi + 1);
      } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
          setTimeout(function() {
            console.log("over query limit, waiting 2 seconds");
            self.getPlacesInBox(boxes, boxi); //try again in the same box
          }, 2000);
      } else {
        self.getPlacesInBox(boxes, boxi + 1);
      }
    });
  },

  autoComplete: function() {
    var self = this;
    var input = this.$('#destinationLocInput').get(0);

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

  /**** Utility functions *****/

  makeMarkersLoop: function(results) {
    for (var i = 0; i < results.length; i++) {
      this.createMarker(results[i]);
    }
  },

  findMidpoint: function(box) {
    //find the midpoint of the box region that was passed in
    var northeast = box.getNorthEast();
    var southwest = box.getSouthWest();

    var lat1 = northeast.lat();
    var lat2 = southwest.lat();

    var long1 = northeast.lng();
    var long2 = southwest.lng();

    var centerlat = (lat1 + lat2) / 2;
    var centerlng = (long1 + long2) / 2;

    return [centerlat, centerlng];
    //var bounds = new google.maps.LatLngBounds(southwest,northeast);
  },

    drawBoxRegions: function(boxes) {
    //draw the array of boxes as polylines on the map
    var boxpolys = null;
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
      boxpolys[i] = new google.maps.Rectangle({
        bounds: boxes[i],
        fillOpacity:0,
        strokeOpacity: 1.0,
        strokeColor: '#000000',
        strokeWeight:1,
        map:map
      });
    }
  },

  createMarker: function(place) {
    /* just a map marker factory */
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      placeInfoWindow.setContent(place.name);
      placeInfoWindow.open(map, this);
    });
  },

  render: function() {
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

