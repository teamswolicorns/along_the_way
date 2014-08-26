'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  type: "Search View", //for debugging
  tagName: "div",
  events: {
    "submit": "calcroute"
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

  calcroute: function(e) {
    e.preventDefault();
    console.log("stub: calculating route code goes here");
  }
});

//From Tyler: render this into itself and append view.el in client.js (in the global scope)
//the problem: we're not putting this into the view
//this.$el.html

