// 
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwdXKfvGqAHUE89FczvSsk1MNSQtgczv4"></script>
//
function GoogleMap (options) {
  this.markers = options.markers;
  return this;
}
GoogleMap.prototype.draw = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    scrollwheel: false,
    zoom: 2
  });
};
module.exports = GoogleMap;
