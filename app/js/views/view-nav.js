'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var NavView = Backbone.View.extend({

  tagName: 'div',
  initialize: function() {
    this.render();
  },

  render: function() {
    var data = this.model.attributes;
    this.$el.html(template(data));
    return this;
  }
});

module.exports = NavView;
