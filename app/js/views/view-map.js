'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  id: 'content',

  initialize: function() {
    var map = new google.maps.Map(
      this.el,
      this.model.get('mapOptions')
    );
    console.log('initialized from view-map.js...did the map load?');
    this.render();
  },

  render: function() {
    console.log("called view-map.js render function...did a map load?");
    var template = require('../templates/template-map.hbs');
    var data = this.model.attributes;
    //this.$el.html(template(data)); //will replace with whatever's in the template-map.hbs
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

