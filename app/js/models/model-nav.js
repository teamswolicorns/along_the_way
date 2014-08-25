var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Navigation = Backbone.Model.extend({
  defaults: {
    'selected':'home',
  },
});
