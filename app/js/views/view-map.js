var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = Backbone.View.extend({
  defaults: {
    id: 'map-container',
    url: 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAQjiLO3VzaBOgcMT2TafgLCPmiu5QySFs&sensor=false'
  },

  initialize: function() {
    $.ajax({ //this part loads in the api info
      url: this.url,
      dataType: 'script',
      async: false,
    }).done(function() { //once api info is in, makes a new map object with map options from the map model and attaching this map to the div el
      this.model.set('map', new goole.maps.Map(this.el, this.model.get('mapOptions')));
    });
    this.render();
  },

  render: function() {
    //var template = require('../templates/template-map.hbs'); // getting the basic map template from template folder
    //var data = this.model.attributes;
    //this.$el.html(template(data));
    return this; // returns everything in the map-conatiner div (google map api, new map with map options model)
  }
});

module.exports = MapView;
