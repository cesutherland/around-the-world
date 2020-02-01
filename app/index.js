var $ = require('jquery');
var markers = require('./posts.json');

// Map:
var Map = require('./LeafletMap');
var map = new Map({
  markers: markers
});
map.draw();

// Images:
var $img = $('<div class="images"></div>"');
$('body').append($img);
for (var i = 0; i < markers.length; i++) {
  var marker = markers[i];
  $img.append($(
    '<a href="'+marker.link+'" title="'+marker.title+'" target="_blank">' +
      '<img src="'+marker.image+'"></img>' +
    '</a>'
  ));
}


