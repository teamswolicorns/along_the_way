'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapView = Backbone.View.extend({
  tagName: 'div',
  initialize: function() {
    this.render();
  },

  render: function() {
    var template = require('../templates/basic-map-tempate.hbs');
    var data = this.model.attributes;
    this.$el.html(template(data));
    return this;
  }
});

module.exports = MapView;
