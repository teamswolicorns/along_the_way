'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = Backbone.View.extend({
  id: 'content',
  defaults: {},

  initialize: function() {
    var map = new google.maps.Map(
      this.el,
      this.model.get('mapOptions')
    );
    console.log('initialized');
    //what should happen when a view is initialized?
    this.render();
  },


  render: function() {
    //what should happen when the view is rendered/updated?
    console.log("called render");
    $('body').append(this.el);

    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

module.exports = MapView;
