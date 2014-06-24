define(['jquery',
        'backbone',
        'underscore',
        'i18next',
        'view/index',
        'view/dashboard',
        'view/login',
        'text!template/common/error.html'],
    function($,Backbone,_,i18n,IndexView,DashboardView,LoginView,errorTemplate) {

        var indexView       = new IndexView(),
            dashboardView   = new DashboardView(),
            loginView       = new LoginView();

        return Backbone.Router.extend({
            routes: {
                ''                  :   'index',
                'dashboard'         :   'dashboard',
                'login'             :   'login',
                '*path'             :   'default'
            },
            index: function() {
                indexView.render();
            },
            dashboard: function() {
                dashboardView.render();
            },
            login: function() {
                loginView.render();
            },
            default: function() {
                $(".container").html(_.template(errorTemplate,{error:window.location,status:"URL"}));
                $("html").i18n();
            }
        });

    }
);