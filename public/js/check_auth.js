function js_check_auth() {
    if (storage.get('auth_token') == null) {
        var path_parts = location.href.split('/');
        if (!(path_parts.length >= 5 && path_parts[4] == "login")) {
            location.href = '/#login';
        }
    } else {

        var path_parts = location.href.split('/');
        if (path_parts.length >= 5 && path_parts[4] == "login") {
            location.href = '/#/';
        }
    }
}