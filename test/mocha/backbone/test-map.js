var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var Model = require('../../../app/js//models/map_model');

describe('Testing the Map', function() {
  var mapModel;
  before(function(done) {
    this.mock = sinon.mock(Backbone);
    mapModel = new Model();
    done();
  });

  it('Should accept starting coordinates', function(done) {
    mapModel.set('origin', '{lat:47,60,lng:-122.33}');
    expect(mapModel).to.be.ok; //checks that it's an object
    expect(mapModel.get('origin')).to.eql('{lat:47,60,lng:-122.33}');
    done();
  });

  after(function() {
    this.mock.verify();
  });
});
