require(["dojo/dom"],function(dom) {
    function appendImage(parameters) {
        var url = "http://maps.googleapis.com/maps/api/streetview?size=" + parameters.sizeX + "x" + parameters.sizeY +
            "&location=" + parameters.x + ",%20" + parameters.y + ("heading" in parameters ? "&heading=" + parameters.heading : "")
            + "&sensor=false";
        console.log(url);
        return url;
    }
    console.log("i made it here");
    var steps = "<%= steps %>";
    console.log(steps);
});

$(document).ready(function(){
	$("#depart-button").click(function() {
		$("").submit();
	});
});