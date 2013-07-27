require(["dojo/dom", "js/dirWidget"],function(dom, dirWidget) {
    console.log("hi there!");

    var steps = JSON.parse($("#stuff").val());
    console.log(steps);
    dojo.forEach(steps, function(item, i){
        var widget = new dirWidget(item);
        widget.placeAt(dom.byId("container"));
    })
});

$(document).ready(function(){
	$("#depart-button").click(function() {
		$("#passthru").submit();
	});
});
