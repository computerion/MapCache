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
        $("locForm").submit();
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
});