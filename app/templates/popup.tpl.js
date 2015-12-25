module.exports = function (marker) {
  return (marker.link ?
      '<h4><a href="'+marker.link+'">'+marker.title+'</a></h4>' :
      '<h4>'+marker.title+'</h4>'
    ) +
    (marker.image ? '<div class="popup-image" style="background-image: url(\'' + marker.image+ '\')"/>' : '') +
    '<p>'+marker.description+'</p>';
};
