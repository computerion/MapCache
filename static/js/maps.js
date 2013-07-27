$(document).ready(function() {
    google.maps.visualRefresh = true;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var dirType = google.maps.DirectionsTravelMode.DRIVING;

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas', mapOptions));
    directionsDisplay.setMap(map);
});