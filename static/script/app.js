require(['jquery',
        'backbone',
        'app/router',
        'i18next',
        'view/language',
        'util/constants',
        'text!template/common/error.html',
        'jquery.cookie',
        'moment',
        'jquery.ui',
        'jquery.easing',
        'notify'],
    function ($, Backbone, Router,i18n,language,constants,errorTemplate) {

        var options = {
            resGetPath  : "static/langs/__lng__.json",
            preload     : ["tr","en"],
            fallbackLng : false
        };

        if(!$.cookie("i18next")) {
            i18n.setLng('tr', {fixLng:true}, function(tr) {});
        }

        new language(); // langView Init

        i18n.init(options, function(t){
            $("html").i18n();
        });

        moment.lang(options.lng);

        var router = new Router();

        // "boktan token" protect system
        var customSync = function(method, model, options) {
            var success = options.success;
            var error   = options.error;

            options.success = function(resp, status, xhr) {
                if(xhr.status==401) {
                    $.removeCookie("wzzp_token");
                    window.location = constants.hash;
                }
                success(resp, status, xhr);
            };

            options.beforeSend = function(xhr) {
                var token = $.cookie("wzzp_token");
                if (token) {
                    xhr.setRequestHeader('wzzp_token', token);
                }
            };

            options.error = function(xhr, status) {
                var notes = $('#notes').notify({
                    removeIcon: '<i class="icon icon-remove"></i>'
                });
                if(xhr.status==0) {
                    notes.show(i18n.t("error.server_error"), {
                        type: 'danger',
                        title: String(xhr.status),
                        icon: '<i class="icon icon-exclamation-sign"></i>'
                    });
                } else if (xhr.status==404) {
                    notes.show(i18n.t("error.notfound_error"), {
                        type: 'danger',
                        title: String(xhr.status),
                        icon: '<i class="icon icon-exclamation-sign"></i>'
                    });
                } else {
                    notes.show(i18n.t("error.fuckedup_error"), {
                        type: 'danger',
                        title: String(xhr.status),
                        icon: '<i class="icon icon-exclamation-sign"></i>'
                    });
                }
                $("html").i18n();
            }

            Backbone.sync(method, model, options);
        };

        Backbone.Model.prototype.sync = customSync;

        Backbone.history.start();
    }
);