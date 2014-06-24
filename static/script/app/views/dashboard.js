define(['jquery',
        'backbone',
        'underscore',
        'i18next',
        'model/user',
        'text!template/dashboard.html',
        'util/constants',
        'model/logout',
        'jquery.cookie'],
    function($,Backbone,_,i18n,User,dashboardTemplate,constants,logoutMdl) {

        var logout = function() {
            var logout      = new logoutMdl.Logout();
            logout.fetch({
                data: $.param({ token: $.cookie(constants.token_name)}),
                success: function(){
                    $.removeCookie(constants.token_name);
                    $.removeCookie(constants.cookie_username);
                    window.location = constants.hash;
                }
            });
        }

        return Backbone.View.extend({
            el: $('.container'),
            initialize: function(){
            },
            render: function(){
                if($.cookie(constants.token_name)) {
                    var user = new User.User({id: $.cookie("id")});
                    user.fetch({
                        success: function() {
                            if(user.get("type")=="error") {
                                logout();
                            } else {
                                console.log(user);
                                $(".container").html(_.template(dashboardTemplate,{user : user}));
                                $("html").i18n();
                            }
                        }
                    });
                } else {
                    window.location = constants.hash;
                }
            },
            events: {
                "click #dashboard_logout" : "logout"
            },
            logout: logout
        });

    }
);