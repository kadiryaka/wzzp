define(['jquery',
        'backbone',
        'i18next',
        'text!template/login.html',
        'util/constants',
        'model/login',
        'jquery.cookie',
        'jquery.ui',
        'jquery.easing',
        'notify'],
    function($,Backbone,i18n,loginTemplate,constants,loginModel) {

        return Backbone.View.extend({
            el: $('.container'),
            initialize: function(){
            },
            render: function(){
                if($.cookie(constants.token_name)) {
                    window.location = constants.hash+"dashboard";
                } else {
                    $(".container").html(loginTemplate);
                    $('#inputs').keypress(function(e){
                        if(e.keyCode==13)
                            $('#login_ok').click();
                    });
                    $("html").i18n();
                }
            },
            events: {
                "click #login_ok"   : "login_ok",
                "click #sign_up"    : "sign_up"
            },
            login_ok : function() {
                var notes = $('#notes').notify({
                    removeIcon: '<i class="icon icon-remove"></i>'
                });

                var login = new loginModel.Login();
                login.fetch({
                    data: $.param({ username: $("#username").val(), password: $("#password").val()}),
                    success: function(){
                        if(login.get("type")=="token") {
                            $.cookie(constants.token_name,login.get("message"));
                            $.cookie("id",login.get("id"));
                            window.location = constants.hash+"dashboard";
                        } else {
                            notes.show(i18n.t("error."+login.get("message")), {
                                type: 'info',
                                title: 'info',
                                icon: '<i class="icon icon-info-sign"></i>'
                            });
                        }
                    }
                });

            },
            sign_up : function() {
                window.location = constants.hash+"register";
            }
        });

    }
);