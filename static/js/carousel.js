require(["dojo/dom", "js/dirWidget", "dojo/on"],function(dom, dirWidget, on) {
    console.log("hi there!");

    var steps = JSON.parse($("#stuff").val());
    console.log(steps);
    dojo.forEach(steps, function(item, i){
        var widget = new dirWidget(item);

        on(widget.domNode, "click", function(evt){
            console.log("YOLO");
        })
        widget.placeAt(dom.byId("container"));
    })
});

$(document).ready(function(){
    $("#depart-button").click(function() {
        $("#passthru").submit();
    });
});
