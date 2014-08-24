var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Map = Backbone.Model.extend({
  defaults: {
    origin:{lat:47.60,lng:-122.33},
    destination:{lat:45.20,lng:-122.68},
    filters:[],
    radius:'',
    position:{},
    zoom: 13,
    maxZoom:16,
    minZoom:10 // these are all variables that google map api expects you to have
  },

  //puts the map in the screen

  initialize: function(position) {
    this.set('position',position);
    var currentLatLng = new.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.set('currentLatLng',currentLatLng);
    var mapOptions = {
      zoom: this.get('zoom'),
      minZoom: this.get('minZoom'),
      maxZoom: this.get('maxZoom'),
      center: currentLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };
    this.set('mapOptions',mapOptions);
  } // have to use getters and setters with backbone

});

module.exports = Map;
