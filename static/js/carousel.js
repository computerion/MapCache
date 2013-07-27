require(["dojo/dom", "js/SlideShow"],function(dom, SlideShow) {

    var steps = JSON.parse($("#stuff").val());
    console.log(steps);
    var slideShow = new SlideShow(
        {
            width: 480, height:320,
            resp: steps
        });
    slideShow.placeAt(dom.byId("container"));
});
