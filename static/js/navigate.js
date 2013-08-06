$(document).ready(function() {

    var dirType = "driving";
    $("#gobtn").click(function() {
        $("#mode").val(dirType);
        console.log($("#mode").val());
        $("#locForm").submit();
    });

    $('#dir1').val('Fremont, CA');
    $('#dir2').val('Yahoo, Sunnyvale');

    $(".optionsBtn").click(function(){
        $("#mode").val($(this).attr('id').toUpperCase());
        $(".optionsBtn").removeClass("optionsBtn-selected");
        $(this).addClass("optionsBtn-selected");
        dirType = $(this).attr('id');
    })

    $("#driving").addClass("optionsBtn-selected");

    $(".dir").keypress(function(e) {
        if (e.which == 13) {
            $("#gobtn").trigger('click');
        }
    });
    if(navigator.geolocation) {
        $(".useGeolcation").click(function(){
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);
              geocoder = new google.maps.Geocoder();
              geocoder.geocode({'latLng': pos}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    $('#dir1').val(results[0].formatted_address);
                  } else {
                    console.log('No results found');
                  }
                } else {
                  console.log('Geocoder failed due to: ' + status);
                }
              });
            }, function() {
                console.log("Geolocation didn't work");
            });
        });
    }
    else{
        $(".useGelocation").css("display", "none");
    }
});
