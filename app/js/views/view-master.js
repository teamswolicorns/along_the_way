'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//require in the children views and models
var Map = require('../models/model-map');
var map = new Map({});
var ChildSearchView = require('./view-search');
var ChildMapView = require('./view-map');

//master view pulls in the search view and the map view
module.exports = Backbone.View.extend({
  type: 'MasterView', //for debugging, according to some guide I read
  tagName: 'div',

  initialize: function() {
    this.render();
  },

  addChildViews: function() {
    var childSearchView = new ChildSearchView({model: map}); // bring in child view for search
    var childMapView    = new ChildMapView({model: map}); // bring in child view for the map
    //this.$el.children('#childSearchDiv').append(childSearchView.$el); //put childSearchView into its div in the template-master.hbs
    this.$el.append(childSearchView.$el);
    this.$el.append(childMapView.$el); //doesn't show because of missing height/width
    //this.$el.children('#childSearchDiv').append("test");
  },

  render: function() {
    var template = require('../templates/template-master.hbs');
    this.$el.html(template); //add this view to the DOM
    this.addChildViews();
    return this;
  }
});

//render this into itself and append view.$el in client.js (in the global scope)
//the problem: we're not putting our code into the view yet
//this.$el.html

