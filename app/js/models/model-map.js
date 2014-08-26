var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  defaults: {
    startLat: 0,
    startLong: 0,
    zoom: 8,
    mapOptions: {
      locationArray: [],
      startLat: 0,
      startLong: 0,
      zoom: 8,
      center: new google.maps.LatLng(51.5072, 0.1275)

       //needs a 3 digit decimal
      //might need a type?
    }
  },
  initialize: function(){
    var self = this;
    console.log("model initialized");
    this.setStartLoc();
    // this.set('mapOptions.center', new google.maps.LatLng(self.get('startLat'), self.get('startLong')));
  },
  setStartLoc: function() {
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
    } else {
      alert("navigator.geolocation not supported");
    }
  },
   setLocation: function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(this.get('startLat'));
    console.log(this.get('startLong'));
    this.set('mapOptions.center', new google.maps.LatLng(latitude, longitude));
    console.log("This is the mmapOptions center" + this.get('mapOptions.center'));
    }
});


