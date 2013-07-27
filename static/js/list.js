require(["dojo/dom", "js/dirWidget", "dojo/on"],function(dom, dirWidget, on) {
    console.log("hi there!");

    var steps = JSON.parse($("#stuff").val());
    var sv = new google.maps.StreetViewService();
    var panorama = new google.maps.StreetViewPanorama();
    dojo.forEach(steps, function(item, i){
        console.log(item);
        var widget = new dirWidget(item);

        on(widget.domNode, "click", function(evt){
            var url = $('<form>', {
                "method": "post",
                "target": "_blank",
                "id": "panoramaPass",
                "html": "<input type='hidden' name='item' value='" + JSON.stringify(item.end_location) + "' />",
                "action": "/panorama"
                }).appendTo(document.body).submit();
        });
        widget.placeAt(dom.byId("container"));
    });
});

$(document).ready(function(){
	$("#depart-button").click(function() {
		$("#passthru").submit();
	});
});
