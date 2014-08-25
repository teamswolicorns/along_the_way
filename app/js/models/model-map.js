var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var map = Backbone.Model.extend({
  defaults: {
    origin:{lat:47.60,lng:-122.33},
    destination:{lat:45.20,lng:-122.68},
    zoom: 13,
    center:'',
    mapOptions:{}
  },

  initMap: function() {


  }

});

module.exports = map;
