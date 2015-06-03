/*jslint white:true, nomen: true, plusplus: true */
/*global mx, mxui, define, require, browser, devel, console, document, jQuery, window */
/*mendix */
/*
    HelpText
    ========================

    @file      : URLRedirector.js
    @version   : 1.2
    @author    : Gerhard Richard Edens
    @date      : Tue, 03 Jun 2015 11:19:00 GMT
    @copyright : Mendix bv
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare", "mxui/widget/_WidgetBase", "dijit/_TemplatedMixin",
    "mxui/dom", "dojo/dom", "dojo/query", "dojo/dom-prop", "dojo/dom-geometry", "dojo/dom-class", "dojo/dom-style", "dojo/dom-construct", "dojo/_base/array", "dojo/_base/lang", "dojo/text", "dojo/html", "dojo/_base/html", "dojo/_base/event", "dojo/_base/window",
    "dojo/text!HelpText/widget/template/HelpText.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, html, page, event, win, widgetTemplate) {
    "use strict";

    // Declare widget"s prototype.
    return declare("URLRedirector.widget.URLRedirector", [_WidgetBase, _TemplatedMixin], {

        //IMPLEMENTATION
        domNode: null,
        topic : "CustomWidget/HelpText",
        imgNode : null,
        handle : null,
        helpNode : null,
        helpvisible: false,
        windowEvt : null,

        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _handles: null,
        _contextObj: null,
        _alertDiv: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + ".postCreate");
            this._updateRendering();
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + ".update");

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {},

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {},

        // mxui.widget._WidgetBase.resize is called when the page"s layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {},

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize : function() {
        },

        // Rerender the interface.
        _updateRendering: function () {
            var url = null;
            try {
                if (this.URLAttribute !== "" || this.urlprefix !== "")
                {
                    if(this.URLAttribute !=="") {
                        url = this.urlprefix + this._contextObj.get(this.URLAttribute);
                    }
                    else {
                        url = this.urlprefix;
                    }
                    this._redirectTo(url);
                }
                else {
                    console.warning("At least prefix property or either URLAttribute property should be configured in widget property configuration");
                }
            }
            catch (err) {
                console.error(this.id +".loadData: " + err);
            }
        },

        _redirectTo : function(url) {
            if(this.Target === "Page")
            {
                window.location.replace(url);
            }
            else
            {
                window.open(url);
            }
        },

        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _objectHandle = null,
                _attrHandle = null,
                _validationHandle = null;

            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle, i) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {

                _objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

                this._handles = [_objectHandle];
            }
        }
    });
});
require(["URLRedirector/widget/URLRedirector"], function () {
    "use strict";
});

