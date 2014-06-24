define([],
    function() {

        return {
            "token_name"        :   "wzzp_token",
            "cookie_username"   :   "username",
            "hash"              :   "#",
            "login_res"         :   "http://api.wzzp.in/login",
            "logout_res"        :   "http://api.wzzp.in/logout",
            "user_res"          :   "http://api.wzzp.in/users",
            "error"             :   {
                "bad_token" : "bad_token",
                "wrong_username_or_password" : "wrong_username_or_password",
                "not_activated" : "not_activated",
                "not_found"     : "not_found",
                "validation_failed" : "validation_failed"
            },
            "info"              :   {
                "success" : "success",
                "activate_success" : "activate_success",
                "register_success" : "register_success"
            }
        };

    }
);