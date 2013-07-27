define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./dirWidget.html"

], function(declare, _WidgetBase, _TemplatedMixin, template, dirWidget) {

    return declare([_WidgetBase, _TemplatedMixin],
        {

            templateString: template,

            baseClass: "dirWidget",

            start_location: null,

            end_location: null,

            instructions: null,

            duration: null,

            distance: null,

            maneuver: null,

            postCreate: function(){
                function appendImage(parameters) {
                    var url = "http://maps.googleapis.com/maps/api/streetview?size=" + parameters.sizeX + "x" + parameters.sizeY +
                        "&location=" + parameters.x + ",%20" + parameters.y + ("heading" in parameters ? "&heading=" + parameters.heading : "")
                        + "&sensor=false";
                    console.log(url);
                    return url;
                }
                var main = this;
                var dirSource="img/StraightArrow.png";
                var maneuver = main.maneuver;
                if(maneuver=="turn-left" || maneuver == "turn-sharp-left"){
                    dirSource="img/TurnLeftArrow.png";
                }
                else if(maneuver=="turn-right" || maneuver == "turn-sharp-right"){
                    dirSource="img/TurnRightArrow.png";
                }
                    else if(maneuver=="fork-left" || maneuver == "ramp-left"){
                        dirSource="img/SlightLeftArrow.png";
                    }
                    else if(maneuver=="fork-right" || maneuver == "ramp-right"){
                        dirSource="img/SlightRightArrow.png";
                    }
                console.log(main.dirNode);
                main.imageNode.src = dirSource;
                main.distanceNode.innerHTML = main.distance.text;
                main.dirNode.innerHTML = main.instructions;
                main.timeNode.innerHTML = main.duration.text;
                main.streetNode.src = appendImage({
                    sizeX:80, sizeY:80,x:main.end_location.jb, y:main.end_location.kb
                })

            }

        });

});