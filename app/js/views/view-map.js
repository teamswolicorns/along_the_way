'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = Backbone.View.extend({
  defaults: {},

  id: 'map-container',

  initialize: function() {
    //mjg - I set it as a var in effort to match this example
    //http://stackoverflow.com/questions/18335113/how-can-i-load-google-maps-api-from-backbone-js-model
    var url = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAQjiLO3VzaBOgcMT2TafgLCPmiu5QySFs&sensor=false";
    $.ajax({ //this part loads in the api info
      url: url,
      dataType: 'script',
      async: false,
      success: function() {
        console.log("script loaded - remove this message");
      }
    }).done(function() { //once api info is in, makes a new map object with map options from the map model and attaching this map to the div el
      this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
    });
    this.render();
  },

  render: function() {
    console.log("called render");
    $('#' + this.id).replaceWith(this.el);
    var template = require('../templates/template-map.hbs'); // getting the basic map template from template folder
    var data = this.model.attributes;
    this.$el.html(template(data));
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

module.exports = MapView;
