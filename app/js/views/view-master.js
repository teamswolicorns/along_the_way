'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MapModel = require('../models/model-map');
var map = new MapModel({});

//require the children views so we can instantiate them here in view-master.js
var ChildSearchView = require('./view-search');
var ChildMapView = require('./view-map');

var childSearchView;
var childMapView;

module.exports = Backbone.View.extend({
  type: 'MasterView', //for debugging, according to some guide I read
  tagName: 'div',

  events: {
    "submit": "drawRouteButtonClicked"
  },

  initialize: function() {
    var template = require('../templates/template-master.hbs'); //pull in the master template html
    this.$el.html(template); //add this view (view-master) to the div specified at the top
    this.addChildViews(); //add the child views to the DOM
    this.render();
  },

  addChildViews: function() {
    childSearchView = new ChildSearchView({model: map});
    childMapView    = new ChildMapView({model: map});

    this.$el.children('#childSearchDiv').append(childSearchView.$el);
    this.$el.children('#childMapDiv').append(childMapView.$el);
  },

  render: function() {
    return this;
  },

  drawRouteButtonClicked: function(e) {
    e.preventDefault();
    childMapView.getDirections();
  }

});
