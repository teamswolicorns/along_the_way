'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

//instantiate the map model here in view-master.js so we can pass it to children views
var Map = require('../models/model-map');
var map = new Map({});

//require the children views so we can instantiate them here in view-master.js
var ChildSearchView = require('./view-search');
var ChildMapView = require('./view-map');

module.exports = Backbone.View.extend({
  type: 'MasterView', //for debugging, according to some guide I read
  tagName: 'div',

  initialize: function() {
    this.render();
  },

  addChildViews: function() {
    //here we actually make instances of the child views
    //we pass them model map so they have access to its data

    //if view-master is the parent, then sending "model: map" is like packing a lunch for the child
    //the child views wouldn't have access to model: map data otherwise
    var childSearchView = new ChildSearchView({model: map});
    var childMapView    = new ChildMapView({model: map});

    //todo: something I couldn't get working was appending these views to the div tags created to hold them
    //question: are these child views supposed to be appended to the DOM or to the parent view?

    //this.$el.append(childSearchView.$el);
    //this.$el.append(childMapView.$el); //doesn't show because of missing height/width?

    this.$el.children('#childSearchDiv').append(childSearchView.$el);
    this.$el.children('#childMapDiv').append(childMapView.$el);
  },

  render: function() {
    var template = require('../templates/template-master.hbs'); //pull in the master template html
    this.$el.html(template); //add this view (view-master) to the DOM
    this.addChildViews(); //add the child views to the DOM
    return this;
  }
});
