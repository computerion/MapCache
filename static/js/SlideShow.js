define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/SlideShow.html",
	"dojo/_base/fx",
	"dojo/dom",
	"dojo/_base/xhr",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/on",
	"dojo/_base/lang"
], function(declare, _WidgetBase, _TemplatedMixin, template, baseFx, dom, xhr, domStyle, domConstruct, domClass, on, lang) {
 
    return declare([_WidgetBase, _TemplatedMixin], 
	{
		
        templateString: template,
		
		baseClass: "slideshow",
		
		dataUrl: "",
		
		width: 0, height: 0,
		
		imageDataArray: [],
		
		textAnim: null, imgAnim: null, scrollAnim: null, descriptionAnim: null, titleAnim: null,
		
		nodeList: null, positionList: null,
		
		scrollTimeOut: null,
		
		postCreate: function(){
			
			this.nodeList = new Array();
			this.positionList = new Array();
			
			this.inherited(arguments);
			
			var slideshow = this;
			
			domStyle.set(this.domNode, "width", this.width+"px");
			domStyle.set(this.domNode, "height", this.height+"px");
			
			var dataInfo = xhr.get({
				url: slideshow.dataUrl,
				handleAs: "json"
			});
			
			dataInfo.then(
				function( info )
				{
					slideshow.imageDataArray = info;
					slideshow.titleNode.innerHTML = info[0].imgTitle;
					slideshow.descriptionNode.innerHTML = info[0].imgDescription;
					slideshow.setDisplay();
					
					slideshow.connect(slideshow.domNode, "onmouseenter", function(e){
						slideshow.setTextNodeMargin(-80);
					});
					
					slideshow.connect(slideshow.domNode, "onmouseleave", function(e){
						slideshow.setTextNodeMargin(0);
					});

			});
			
			this.scrollTimeOut = setTimeout( function(){ slideshow.goToPage(1)}, 5000);
		},
		
		setDisplay: function(){
			
			var slideshow = this;
			var position = 0;
			
			dojo.forEach( slideshow.imageDataArray, function(node, index){

				var image = domConstruct.create("img", {src: node.imgUrl});
				domStyle.set(image, "width", slideshow.width + "px");
				
				domConstruct.place(image, slideshow.containerNode);
				
				var tab = domConstruct.create('span', {innerHTML: (index+1), class: (index==0) ? "selected" : ""});
				domConstruct.place(tab, slideshow.tabNode);
				if(index==0) domStyle.set(tab, "margin-left", (8-tab.offsetWidth) + "px"); 
				slideshow.nodeList.push(tab);
				slideshow.positionList.push(position + (8-tab.offsetWidth));
				
				position += tab.offsetWidth + 4;
				
				on(tab, "click", function(e){
					slideshow.goToPage(index);
				});
				 
			});
			
		},
		
		goToPage: function(index){
			
			if(this.scrollTimeOut!=null) clearTimeout(this.scrollTimeOut);
			
			dojo.forEach( this.nodeList, function(node){
				domClass.remove(node, "selected");
			});
			domClass.add(this.nodeList[index], "selected");
			this.setSlideshowMargin( - this.width * index );
			this.setScrollMargin( this.positionList[index]);

			this.setText(this.titleNode, this.imageDataArray[index].imgTitle, this.titleAnim);
			this.setText(this.descriptionNode, this.imageDataArray[index].imgDescription, this.descriptionAnim);
			
			var slideshow = this;
			
			this.scrollTimeOut = setTimeout( function(){ slideshow.goToPage( (index+1)%slideshow.imageDataArray.length )}, 5000);
		},
		
		setTextNodeMargin: function( toTop ){
			if (this.textAnim) { this.textAnim.stop(); }
			
			this.textAnim = baseFx.animateProperty({
				node: this.textNode,
				properties: { marginTop: toTop },
				onEnd: lang.hitch(this, function() {
					this.textAnim = null;
				})
			}).play();	
		},
		
		setSlideshowMargin: function( toLeft ){
			if (this.imgAnim) { this.imgAnim.stop(); }
			
			this.imgAnim = baseFx.animateProperty({
				node: this.containerNode,
				properties: { marginLeft: toLeft },
				onEnd: lang.hitch(this, function() {
					this.imgAnim = null;
				})
			}).play();	
		},
		
		setScrollMargin: function( toLeft ){
			if (this.scrollAnim) { this.scrollAnim.stop(); }
			
			this.scrollAnim = baseFx.animateProperty({
				node: this.scrollNode,
				properties: { left: toLeft },
				onEnd: lang.hitch(this, function() {
					this.scrollAnim = null;
				})
			}).play();	
		},
		
		setText: function(node, text, anim){
			if (anim) { anim.stop(); }
			
			anim = baseFx.fadeOut({
				node: node,
				onEnd: lang.hitch(this, function() {
					node.innerHTML = text;
					anim = baseFx.fadeIn({
						node: node,
						onEnd: lang.hitch(this, function() {
							anim = null;
						})
					}).play();	
				})
			}).play();	
		}
    });
 
});