var $ = require('jquery');
var markers = require('./posts.json');

var Map = require('./LeafletMap');
var map = new Map({
  markers: markers
});
map.draw();

for (var i = 0; i < markers.length; i++) {
  $('body').append(
    $('<img>').attr('src', markers[i].image)
  );
}


