/**
 * Created with IntelliJ IDEA.
 * User: dhu
 * Date: 7/26/13
 * Time: 5:47 PM
 * To change this template use File | Settings | File Templates.
 */
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom:7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: chicago
    }
    directionsDisplay.setMap(map);
}

function calcRoute(start, end) {
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
