'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = Backbone.View.extend({
  defaults: {},

  initialize: function() {
    //what should happen when a view is initialized?
    this.render();
  },

  render: function() {
    //what should happen when the view is rendered/updated?
    console.log("called render");
    $('#map-container').replaceWith(this.el);
    var template = require('../templates/template-map.hbs'); // getting the basic map template from template folder
    var data = this.model.attributes;
    this.$el.html(template(data));
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

module.exports = MapView;
