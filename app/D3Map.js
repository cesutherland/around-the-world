var d3 = require('d3');
var topojson = require('topojson');
var world = require('./world.json');
var popup = require('./templates/popup.tpl');
var $ = require('jquery');

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

function D3Map (options) {
  this.markers = options.markers;
  return this;
}

D3Map.prototype.draw = function () {

  var factor = $(window).width() / 960;
	var width = 960 * factor;
	var height = 480 * factor;
  var scale = 153 * factor;
  var radius = 6;

  var markers = this.markers;

	var svg = d3.select('#map').append('svg')
    .attr('width', width)
		.attr('height', height);

  var projection = d3.geo.equirectangular()
    .scale(scale)
    .translate([width/2, height/2])
    .precision(0.1)

  var path = d3.geo.path()
    .projection(projection);

  // Countries:
  svg.append('g')
    .selectAll('path.country')
    .data(topojson.feature(world, world.objects.world).features)
    .enter().append('path')
    .attr('class', 'country')
    .attr('d', path);

  svg.append('g')
    .selectAll('circle.marker')
    .data(markers)
    .enter().append('circle')
    .attr('class', 'marker')
    .attr('r', radius)
    .attr('transform', function (d) {
      return 'translate(' + projection([d.longitude, d.latitude]) + ')';
    })
    .on('mouseover', function (marker) {
      var originalEvent = d3.event;
      var $target = $(originalEvent.target);

      clearTimeout(popupTimeout);

      // Template:
      $popup.find('.popup-content').html(popup(marker));

      // Show:
      var offset = $target.offset();
      $popup.show().css({
        position: 'absolute',
        left: offset.left- $popup.outerWidth() / 2,
        top: offset.top + radius * 2 + 4
      })
    })
    .on('mouseout', closePopup);
};

module.exports = D3Map;
