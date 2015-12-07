var leaflet = require('leaflet');
var $ = require('jquery');

var map = leaflet.map('map').setView([0, 0], 2);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: 'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = [
  {
    title: 'Seattle',
    description: 'A rainy city.',
    image: '',
    longitude: 47.6097,
    latitude: -122.3331
  }
];

var $popup = $('#popup');
var popupTimeout = null;
$popup
  .on('mouseenter', function () {
    clearTimeout(popupTimeout);
  })
  .on('mouseleave', closePopup);

function closePopup () {
  popupTimeout = setTimeout(function () {
    $popup.hide();
  }, 500);
}


for (var i = 0; i < markers.length; i++) {
  (function () {
    var marker = markers[i];
    var radius = 6;
    var circle = L.circleMarker([marker.longitude, marker.latitude], {
      color: '#000',
      fill: true,
      fillOpacity: 0,
      radius: radius,
      opacity: 0.8
    })
    .addTo(map)
    .on('mouseover', function (e) {
      var originalEvent = e.originalEvent;
      var $target = $(originalEvent.target);

      clearTimeout(popupTimeout);

      // Template:
      $popup.find('.popup-content').html(
        (marker.link ?
          '<h4><a href="'+marker.link+'">'+marker.title+'</a></h4>' :
          '<h4>'+marker.title+'</h4>'
        ) +
        (marker.image ? '<div class="popup-image" style="background-image: url(\'' + marker.image+ '\')"/>' : '') +
        '<p>'+marker.description+'</p>'
      );

      // Show:
      var offset = $target.offset();
      $popup.show().css({
        position: 'absolute',
        left: offset.left- $popup.outerWidth() / 2,
        top: offset.top + radius * 2 + 4
      })
    })
    .on('mouseout', closePopup);
  })();
}
