'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MasterView = Backbone.View.extend({
  initialize:function() {
    this.render();
  },
  render: function() {
    this.$el.html(template);
  },
  events: {
    "submit": "testfunction"
  },
  testfunction: function() {
    console.log("test function successful");
  }
});

//incorporates two views:

//searchdiv view
// search template-search

//mapdiv view
// mapview template-map

//render this into itself and append view.el in client.js (in the global scope)
//the problem: we're not putting this into the view
//this.$el.html

//map is one view
//search is another view
