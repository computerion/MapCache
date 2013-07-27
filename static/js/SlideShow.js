define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./SlideShow.html",
	"dojo/_base/fx",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/on",
	"dojo/_base/lang"
], function(declare, _WidgetBase, _TemplatedMixin, template, baseFx, dom, domStyle, domConstruct, domClass, on, lang) {
 
    return declare([_WidgetBase, _TemplatedMixin], 
	{
		
        templateString: template,
		
		baseClass: "slideshow",
		
		resp: null,
		
		width: 480, height: 320,
		
		imageDataArray: [],
		
		textAnim: null, imgAnim: null, scrollAnim: null, descriptionAnim: null, titleAnim: null,
		
		scrollTimeOut: null,

        mIndex:0,
		
		postCreate: function(){
            function appendImage(parameters) {
                var url = "http://maps.googleapis.com/maps/api/streetview?size=" + parameters.sizeX + "x" + parameters.sizeY +
                    "&location=" + parameters.x + ",%20" + parameters.y + ("heading" in parameters ? "&heading=" + parameters.heading : "")
                    + "&sensor=false";
                return url;
            }
            function getDegree(path,start,end){
                var ans = 0;
                if(path.length>=0){
                    ans = google.maps.geometry.spherical.computeHeading(path[path.length-2],path[path.length-1]);
                }
                else{
                    ans =   google.maps.geometry.spherical.computeHeading(start,end);
                }
                return ans;
            }
			this.nodeList = new Array();
			this.positionList = new Array();
			
			this.inherited(arguments);
			
			var slideshow = this;
			
			domStyle.set(this.domNode, "width", this.width+"px");
			domStyle.set(this.domNode, "height", this.height+"px");

			dojo.forEach(this.resp, function(item, i)
				{
            //var item = this.resp[0];
            //var i = 0;
                    var main = item;
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
					slideshow.imageDataArray.push({
                        imgUrl: appendImage({
                            sizeX:slideshow.width, sizeY:slideshow.height,x:main.end_location.jb, y:main.end_location.kb, heading: getDegree(main.path, main.start_location, main.end_location)
                        }),
                        imgTitle: item.distance.text,
                        imgDescription: item.instructions,
                        dirImage: dirSource,
                        duration: item.duration.value,
                        timeText: item.duration.text
                    })
                 //   console.log(getDegree(main.start_location, main.end_location) + " " + 360*getDegree(main.start_location, main.end_location)/(2*Math.PI));
                    if (i==0){
                        slideshow.titleNode.innerHTML = item.distance.text;
                        slideshow.descriptionNode.innerHTML = item.instructions;
                        slideshow.imageNode.src = dirSource;
                    }

			});

            slideshow.setDisplay();

            /*slideshow.connect(slideshow.domNode, "onmouseenter", function(e){
                slideshow.setTextNodeMargin(-80);
            });

            slideshow.connect(slideshow.domNode, "onmouseleave", function(e){
                slideshow.setTextNodeMargin(0);
            });*/

            on(this.leftNode, "click", function(evt){
                slideshow.goToPage(slideshow.mIndex >= 0 ? (slideshow.mIndex-1) : slideshow.mIndex + slideshow.imageDataArray.length);
            })

            on(this.rightNode, "click", function(evt){
                slideshow.goToPage((slideshow.mIndex+1)%slideshow.imageDataArray.length);
            })

            this.mIndex = 0;
			this.scrollTimeOut = setTimeout( function(){ slideshow.goToPage(1)}, slideshow.imageDataArray[0].duration * 1000);
		},
		
		setDisplay: function(){
			
			var slideshow = this;
			var position = 0;

			dojo.forEach( slideshow.imageDataArray, function(node, index){

				var image = domConstruct.create("img", {src: node.imgUrl});
				domStyle.set(image, "width", slideshow.width + "px");
				
				domConstruct.place(image, slideshow.containerNode);
				 
			});
			
		},
		
		goToPage: function(index){

            this.mIndex = index;
			
			if(this.scrollTimeOut!=null) clearTimeout(this.scrollTimeOut);

			this.setSlideshowMargin( - this.width * index );
			//this.setScrollMargin( this.positionList[index]);
            var thing = this;
            if (thing.titleAnim) { thing.titleAnim.stop(); }
            var item = thing.imageDataArray[index];
            thing.titleAnim = baseFx.fadeOut({
                node: this.textNode,
                onEnd: lang.hitch(this, function() {

                    thing.titleNode.innerHTML = item.imgTitle;
                    thing.descriptionNode.innerHTML = item.imgDescription;
                    thing.imageNode.src = item.dirImage;
                    thing.timeNode.innerHTML = item.timeText;
                    thing.titleAnim = baseFx.fadeIn({
                        node: thing.textNode,
                        onEnd: lang.hitch(this, function() {
                            thing.anim = null;
                        })
                    }).play();
                })
            }).play();
			
			var slideshow = this;
			
			this.scrollTimeOut = setTimeout( function(){ slideshow.goToPage( (index+1)%slideshow.imageDataArray.length )}, item.duration*1000);
		},
		
		/*setTextNodeMargin: function( toTop ){
			if (this.textAnim) { this.textAnim.stop(); }
			
			this.textAnim = baseFx.animateProperty({
				node: this.textNode,
				properties: { marginTop: toTop },
				onEnd: lang.hitch(this, function() {
					this.textAnim = null;
				})
			}).play();	
		},*/
		
		setSlideshowMargin: function( toLeft ){
			if (this.imgAnim) { this.imgAnim.stop(); }
			
			this.imgAnim = baseFx.animateProperty({
				node: this.containerNode,
				properties: { marginLeft: toLeft },
				onEnd: lang.hitch(this, function() {
					this.imgAnim = null;
				})
			}).play();	
		}
		
		/*setScrollMargin: function( toLeft ){
			if (this.scrollAnim) { this.scrollAnim.stop(); }
			
			this.scrollAnim = baseFx.animateProperty({
				node: this.scrollNode,
				properties: { left: toLeft },
				onEnd: lang.hitch(this, function() {
					this.scrollAnim = null;
				})
			}).play();	
		}, */

    });
 
});