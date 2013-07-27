$(document).ready(function() {
    var path = null;
    function calcRoute(start, end, type) {
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.DirectionsTravelMode[type.toUpperCase()]
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log(response);
                var route = response.routes[0];
                var leg = route.legs[0];
                path = leg.steps;
            }
            else {
                console.log('Failed to get directions for this route');
            }
        });
    }

    google.maps.visualRefresh = true;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var map;

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas', mapOptions));
    directionsDisplay.setMap(map);
    calcRoute($("#origin").val(), $("#destination").val(), $("#mode").val());

    $("#dir1").val($("#origin").val());
    $("#dir2").val($("#destination").val());
    var dirType = $("mode").val();
    $(".optionsBtn").click(function(){
        $("#mode").val($(this).attr('id').toUpperCase());
        $(".optionsBtn").removeClass("optionsBtn-selected");
        $(this).addClass("optionsBtn-selected");
        dirType = $(this).attr('id');
    })
    console.log($("#mode").val());

    $("#"+$("#mode").val()).addClass("optionsBtn-selected");
    $("#refresh").click(function(){
            calcRoute($("#dir1").val(), $("#dir2").val(), $("#mode").val());
    });

    $("#proceed").click(function(){
        // Spin!
        while (path === null) {}
        $("#items").val(JSON.stringify(path));
        $("#locForm").submit();
    });

});