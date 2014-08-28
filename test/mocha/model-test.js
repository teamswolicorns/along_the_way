'use strict';
var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var Map = require('../../app/js/models/model-map');

describe('Tests the Backbone MapModel.', function() {
  var map;
  before(function(done) {
    this.mock = sinon.mock(Backbone);
    map = new Map();
    done();
  });

  it('Map instances should be backbone objects.', function(done) {
    expect(map).to.be.ok;
    done();
  });

  it('There should be mapOptions in instances of the MapModel and they must contain attributes.', function(done) {
    expect(map.get('mapOptions')).to.not.eql('');
    done();
  });

  after(function() {
    this.mock.verify();
  });
});
