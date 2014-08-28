'use strict';
var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;
var assert = chai.assert;

var MapModel =require('../../app/js/models/model-map.js')
var MapView = require('../../app/js/views/view-map.js');

describe('Tests the Map in the View.', function() {
  before(function(done) {
    sinon.spy(MapView.prototype, 'render');
    this.mapModel = new MapModel;
    this.mapView = new MapView({model: this.mapModel});
    done();
  });

  it('Instances of MapView should not be empty.', function(done) {
    expect(this.mapView.$el).to.not.eql(''); //lower case mapView because testing mapView element after the map instance has been created
    done();
  });

  after(function(done) {
    MapView.prototype.render.restore();
    done();
  });
});

describe('Checks functionality of "mapInit".', function() {
  before(function(done) {
    sinon.spy(MapView.prototype, 'mapInit');
    this.mapModel = new MapModel;
    this.mapView = new MapView({model: this.mapModel});
    done();
  });

  it('"mapInit" should be called.', function(done) {
    expect(MapView.prototype.mapInit.called).to.be.true; //capitol MapView because we are testing to see that mapInit has been called before the instance has been created
    done();
  });

  it('Instances of the MapModel should not be empty.', function(done) {
    expect(this.map).to.not.eql('');
    done();
  });

  after(function(done) {
    MapView.prototype.mapInit.restore();
    done();
  });
});

