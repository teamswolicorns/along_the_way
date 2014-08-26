'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MasterView  = require('./views/view-master');

$(function() { //on document ready...
  //create a master view and stick it in the index.html's body tag
  var masterView  = new MasterView({});
  $('body').html(masterView.el);
  //the model creation steps were moved to view-master.js
  //this is how the holy tome known as "Notes" does it
  //and it seems to work: the route button listener now works
});
