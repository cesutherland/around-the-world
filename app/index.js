var $ = require('jquery');
var markers = require('./posts.json');

// Map:
var Map = require('./LeafletMap');
var map = new Map({
  markers: markers
});

// Images:
var $img = $('#gallery');
for (var i = 0; i < markers.length; i++) {
  var marker = markers[i];
  $img.append($(
    '<a href="'+marker.link+'" title="'+marker.title+'" target="_blank">' +
      '<img src="'+marker.image+'"></img>' +
    '</a>'
  ));
}

// Initialization:
if (window.location.hash === '#gallery') {
  setTimeout(function () {
    $img.scrollTop();
    $img[0].scrollIntoView();
    map.draw();
  }, 100);
} else {
  map.draw();
}
