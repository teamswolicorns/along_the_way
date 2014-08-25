var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var map = Backbone.Model.extend({
  defaults: {
    mapOptions: {
      zoom: 8,
      center: new google.maps.LatLng(47.601, -122.333) //needs a 3 digit decimal
      //might need a type?
    }
  },

});

module.exports = map;
