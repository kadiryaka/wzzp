define(['jquery',
        'backbone',
        'util/constants',
        'jquery.cookie'],
    function($,Backbone,constants) {

        return Backbone.View.extend({
            el: $('.container'),
            initialize: function(){
            },
            render: function(){
                if($.cookie(constants.token_name)) {
                    window.location = constants.hash+"dashboard";
                } else {
                    window.location = constants.hash+"login";
                }
            }
        });

    }
);