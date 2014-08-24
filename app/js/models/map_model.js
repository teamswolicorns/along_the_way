var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var mapModel = Backbone.Model.extend({
  defaults: {
    origin:{lat:47.60,lng:-122.33},
    destination:{lat:45.20,lng:-122.68},
    filters:[],
    radius:''
  },


});
