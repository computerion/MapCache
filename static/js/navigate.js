$(document).ready(function() {
    google.maps.visualRefresh = true;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    $("#gobtn").click(function() {
        var input1 = $("#dir1").val();
        var input2 = $("#dir2").val();
        calcRoute(input1, input2);
    });

    $(".dir").keypress(function(e) {
        if (e.which == 13) {
            $("#gobtn").trigger('click');
        }
    });

    function calcRoute(start, end) {
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var metadata = response.Mb;
                var routes = response.routes;
                var leg = routes[0].legs;
                console.log(leg);
                var steps = leg.steps;
            }
            else {
                console.log('Failed to get directions for this route');
            }
        });
    }
});