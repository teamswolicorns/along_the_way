//view-search is a child of view-master
'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  type: "Search View", //for debugging
  events: {
    "submit": "submitfunction"
  },

  initialize:function() {
    this.model.on("change", this.modelChanged, this); //whenever the associated model changes, update the view
    this.render();
  },

  render: function() {
    var template = require('../templates/template-search.hbs');
    var data = this.model.attributes;
    this.$el.html(template);
    return this;
  },

  submitfunction: function(e) {
    e.preventDefault();
    this.model.calcRoute();
  }
});
