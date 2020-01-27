var leaflet = require('leaflet');
var $ = require('jquery');
var popup = require('./templates/popup.tpl');

var ratio = window.devicePixelRatio;
var radius = 7;
var weight = 2.5;

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

function openPopup (target, marker) {
  var $target = $(target);

  clearTimeout(popupTimeout);

  // Template:
  $popup.find('.popup-content').html(popup(marker));

  // Show:
  var offset = $target.offset();
  var width = $popup.outerWidth(true)
  var maxWidth = $(window).outerWidth(true);
  if ((offset.left - width/2) < 12) {
    var offscreen = true;
    var offscreenOffset = (offset.left - width/2);
    offscreenOffset = Math.max(offscreenOffset, -width/2 + 12);
  } else
  if ((offset.left + width/2) > maxWidth) {
    var offscreen = true;
    var offscreenOffset = (offset.left + width/2) - maxWidth;
  }
  $popup.show().css({
    position: 'absolute',
    left: offset.left + radius - width / 2 - (offscreen ? offscreenOffset : 0),
    top: offset.top + radius * 2 + 5
  });
  $popup.find('.popup-arrow').css({
    left: offscreen ? width/2 + offscreenOffset : width / 2
  });
}

function LeafletMap (options) {
  this.markers = options.markers;
  return this;
}

LeafletMap.prototype.draw = function () {
  var bounds = getBounds(this.markers);
  var padding = 2;
  var map = leaflet.map('map', {
  })
  //.setView([0, 0], 2);
  .fitBounds([
    [Math.min(bounds.max[0] + padding, 90),  Math.min(bounds.max[1] + padding, 180)],
    [Math.max(bounds.min[0] - padding, -90), Math.max(bounds.min[1] - padding, -180)],
  ])
  //.setZoom(2);


  var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  L.tileLayer(url, {
    attribution: 'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  this.map = map;
  this._drawMarkers();
}; 

LeafletMap.prototype._drawMarkers = function () {
  var markers = this.markers;
  var map = this.map;
  map.on('click', closePopup);
  $('#map').on('touchstart', closePopup);
  for (var i = 0; i < markers.length; i++) {
    (function () {
      var marker = markers[i];
      var circle = L.circleMarker([marker.latitude, marker.longitude], {
        color: '#000',
        fill: true,
        fillOpacity: 0,
        weight: weight,
        radius: radius,
        opacity: 0.8,
        className: 'marker'
      }).addTo(map)
        .on('mouseover', myOpenPopup)
        .on('click', myOpenPopup)
        .on('mouseout', closePopup);

      function myOpenPopup (e) {
        openPopup(e.originalEvent.target, marker);
      }
    })();
  }

};

/**
 * Get max/min bounds of markers.
 */
function getBounds (markers) {

  // [longitude, latitude]
  var max = [-Number.MAX_VALUE, -Number.MAX_VALUE]
  var min = [Number.MAX_VALUE, Number.MAX_VALUE];

  for (var i = 0; i < markers.length; i++) {
    max[0] = Math.max(max[0], markers[i].latitude);
    max[1] = Math.max(max[1], markers[i].longitude);
    min[0] = Math.min(min[0], markers[i].latitude);
    min[1] = Math.min(min[1], markers[i].longitude);
  }

  return {
    max: max,
    min: min
  };
}

module.exports = LeafletMap;
