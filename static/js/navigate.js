$(document).ready(function() {
    $("#dir1").val("53 Wild Rose Drive, Andover, MA");
    $("#dir2").val("14 Bridle Path Road, Andover, MA");
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
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    $("#gobtn").click(function() {
        var input1 = $("#dir1").val();
        var input2 = $("#dir2").val();
        $.post("/showDirections", {"start": input1, "end": input2})
    });

    $(".optionsBtn").click(function(){
        dirType = google.maps.DirectionsTravelMode[$(this).text().toUpperCase()];
        console.log(dirType);
    })

    $(".dir").keypress(function(e) {
        if (e.which == 13) {
            $("#gobtn").trigger('click');
        }
    });

    function calcRoute(start, end, type) {
        var request = {
            origin:start,
            destination:end,
            travelMode: type
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var metadata = response.Mb;
                var routes = response.routes;
                var leg = routes[0].legs;
                var steps = leg[0].steps;
                var startLoc = steps[0].start_location;
                var endLoc = steps[0].end_location;
                var params = {"sizeX": 200, "sizeY": 200, "x": startLoc.jb, "y": startLoc.kb, "heading": 0}
                console.log("Appending image");
                appendImage(params, $("#my-container"));
            }
            else {
                console.log('Failed to get directions for this route');
            }
        });
    }

    function appendImage(parameters, place) {
        var url = "http://maps.googleapis.com/maps/api/streetview?size=" + parameters.sizeX + "x" + parameters.sizeY +
            "&location=" + parameters.x + ",%20" + parameters.y + ("heading" in parameters ? "&heading=" + parameters.heading : "")
             + "&sensor=false";
        console.log(url);
        var img = place.append('<img id="mapImage">');
        $('#mapImage').attr('src', url);
    }

});