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
      center: new google.maps.LatLng(45.6234173, -122.3359854)

       //needs a 3 digit decimal
      //might need a type?
    }
  },
  initialize: function(){
    var self = this;
    console.log(this);
    this.setStartLoc();
    // this.set('mapOptions.center', new google.maps.LatLng(self.get('startLat'), self.get('startLong')));
    this.set('mapOptions.center', new google.maps.LatLng(47.6234173, -122.3359854));
  },
  setStartLoc: function() {
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
    } else {
      alert("navigator.geolocation not supported");
    }
  },
   setLocation: function(position) {
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);
      this.set("startLat", position.coords.latitude);
      this.set("startLong", position.coords.longitude);
      console.log(this.get('startLat'));
      console.log(this.get('startLong'));
    }
});


