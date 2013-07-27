define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./dirWidget.html"

], function(declare, _WidgetBase, _TemplatedMixin, template, dirWidget) {

    return declare([_WidgetBase, _TemplatedMixin],
        {

            dataJsonArray: null,

            templateString: template,

            baseClass: "dirWidget",

            dirImage: null,

            direction: null,

            streetViewImage: null,

            text: null,

            timeStamp: null,

            onClick: null,

            postCreate: function(){
                var main = this;
                if (main.onClick!=null){
                    dojo.on(main.domNode, function(evt){
                        main.onClick();
                    });
                }
            }

        });

});