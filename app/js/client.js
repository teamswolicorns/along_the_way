'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MasterView  = require('./views/view-master');

$(function() { //on document ready...
  //create a master view and stick it in the index.html's body tag
  var masterView  = new MasterView({});
  $('body').html(masterView.el);
});
