var chai = require('chai');
var Backbone = require('backbone');
var sinon = require('sinon');
var expect = chai.expect;

var Model = require('../../app/js/models/model-map');

describe('Testing the Map', function() {
  var mapModel;
  before(function(done) {
    this.mock = sinon.mock(Backbone);
    mapModel = new Model();
    done();
  });

  it('Should have map options and be an object', function(done) {
    expect(mapModel.mapOptions).to.be.ok; //checks that it's an object
    done();
  });

  it('Should initilize the current geolocation', function(done) {

    done();
  });

  it('Should have a list of place-types', function(done) {


    done();
  });

  after(function() {
    this.mock.verify();
  });
});
