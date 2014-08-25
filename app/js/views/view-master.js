'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//master view pulls in the search view and the map view
var MasterView = Backbone.View.extend({
  initialize:function() {
    this.render();
  },
  render: function() {
    this.$el.html(template);
  },
});


//render this into itself and append view.$el in client.js (in the global scope)
//the problem: we're not putting this into the view
//this.$el.html

