//view-map is a child of view-master
'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  type: "Map View", //tutorial I read says this is good for debugging, not sure yet how it's used
  id: 'content', //not sure if this id is necessary

  initialize: function() {
    var map = new google.maps.Map(
      this.el,
      this.model.get('mapOptions')
    );
    console.log('initialized from view-map.js... did the map load?');
    this.render();
  },

  render: function() {
    console.log("called view-map.js render function... did a map load?");
    var data = this.model.attributes;
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

