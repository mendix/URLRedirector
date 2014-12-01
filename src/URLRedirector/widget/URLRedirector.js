/*jslint white: true nomen: true plusplus: true */
/*global mx, mxui, mendix, dojo, require, console, define, module */
/**

	URLRedirector

*/

(function() {
    'use strict';

    // test
    require([

        'mxui/widget/_WidgetBase', 'dijit/_Widget', 'dijit/_TemplatedMixin',
        'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/on', 'dojo/_base/lang', 'dojo/_base/declare', 'dojo/text'

    ], function (_WidgetBase, _Widget, _Templated, domMx, dom, domQuery, domProp, domGeom, domClass, domStyle, on, lang, declare, text) {

        // Declare widget.
        return declare('URLRedirector.widget.URLRedirector', [ _WidgetBase, _Widget ], {

            /**
             * Internal variables.
             * ======================
             */
            _wgtNode: null,
            _contextGuid: null,
            _contextObj: null,
            _handle: null,


            /**
             * What to do when data is loaded?
             */

            update: function (obj, callback) {
                // startup
                console.log('URLRedirector - update');

                // Release handle on previous object, if any.
                if (this._handle) {
                    mx.data.unsubscribe(this._handle);
                }

                if (typeof obj === 'string') {
                    this._contextGuid = obj;
                    mx.data.get({
                        guids: [this._contextGuid],
                        callback: lang.hitch(this, function (objs) {

                            // Set the object as background.
                            this._contextObj = objs;

                            // Load data again.
                            this._loadData();

                        })
                    });
                } else {
                    this._contextObj = obj;
                }

                if (obj === null) {
                    // Sorry no data no show!
                    console.log('URLRedirector  - update - No context object!');
                } else {

                    // Load data
                    this._loadData();
                }

                // Execute callback.
                if(typeof callback !== 'undefined'){
                    callback();
                }
            },

            /**
             * How the widget re-acts from actions invoked by the Mendix App.
             */
            suspend: function () {
                //TODO, what will happen if the widget is suspended (not visible).
            },

            resume: function () {
                //TODO, what will happen if the widget is resumed (set visible).
            },

            enable: function () {
                //TODO, what will happen if the widget is enabled (not visible).
            },

            disable: function () {
                //TODO, what will happen if the widget is disabled (set visible).
            },

            unintialize: function () {
                //TODO, clean up only events
                if (this._handle) {
                    mx.data.unsubscribe(this._handle);
                }
            },


            /**
             * Interaction widget methods.
             * ======================
             */
            _loadData: function () {
                var url = null;
                try {
                    if (this.URLAttribute !== '' || this.urlprefix !== '')
                    {
                        if(this.URLAttribute !=='') {
                            url = this.urlprefix + this._contextObj.get(this.URLAttribute);
                        }
                        else {
                            url = this.urlprefix;
                        }
                        this._redirectTo(url);
                    }
                    else {
                        console.warning('At least prefix property or either URLAttribute property should be configured in widget property configuration');
                    }
                }
                catch (err) {
                    console.error(this.id +'.loadData: ' + err);
                }

            },

            _redirectTo : function(url) {
                if(this.Target === "Page")
                {
//                    window.location.href = url;
                    window.location.replace(url);
                }
                else
                {
                    window.open(url);
                }
            }
        });
    });

}());


