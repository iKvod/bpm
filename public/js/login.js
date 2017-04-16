function js_login() {
    if (storage.get('auth_token') != null) {
        var path_parts = location.href.split('/');
        if (path_parts.length >= 5 && path_parts[4] == "login") {
            location.href = '/#/';
        }
    }
    $('input[name="username"]').focus();
    $("#loginForm").on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            url: storage.get('api_server') + '/api/login',
            type: 'POST',
            data: {
                username: $(this).find('input[name="username"]').val(),
                password: $(this).find('input[name="password"]').val()
            }
        }).done(function (data) {
            if (data.result == 'ok') {
                storage.set('auth_token', data.auth_token);
                $.ajaxSetup({
                    headers: {'Authorization': 'Bearer ' + data.auth_token}
                });
                location.href = '/#';
            } else if (data.result == 'error') {
                $('#auth_token').html(data.message);
            }
        });
    });
}