$(document).ready(function () {
    $("#btnCadastro").click(function () {
        let $user = $("#user").val();
        let $pwd = $("#pwd").val();
        let data = { "username": $user, "pwd": $pwd };


        if ($user && $pwd) {
            $.getJSON("https://mole-game-api.herokuapp.com/user", function ($registros) {
                if ($registros.filter($usuario => $usuario.username == $user).length > 0) {
                    swal("Usuário já Existe", "Tente Novamente!", "error");
                    $(".swal-button").on('mouseenter', function () { $(this).css({ 'background': 'rgb(255, 107, 8)', ' box-shadow:': '1px 1px 5px black' }) });
                    $(".swal-button").on('mouseout', function () { $(this).css({ 'background': 'orangered', ' box-shadow:': '1px 1px 5px black' }) });
                }
                else {
                    let url = "https://mole-game-api.herokuapp.com/user";
                    axios.post(url, data);
                    swal("", "Usuário Cadastrado com Sucesso!", "success");
                    $(".swal-button").on('mouseenter', function () { $(this).css({ 'background': 'rgb(255, 107, 8)', ' box-shadow:': '1px 1px 5px black' }) });
                    $(".swal-button").on('mouseout', function () { $(this).css({ 'background': 'orangered', ' box-shadow:': '1px 1px 5px black' }) });
                    var counter = 0;
                    var interval = setInterval(function () {
                        counter++;
                        if (counter == 2) {
                            window.open("login.html", "_self");
                        }
                    }, 1000);
                }
            });
        }


        else swal("Erro!", "Informe o Usuário e Senha", "error");
        $(".swal-button").on('mouseenter', function () { $(this).css({ 'background': 'rgb(255, 107, 8)', ' box-shadow:': '1px 1px 5px black' }) });
        $(".swal-button").on('mouseout', function () { $(this).css({ 'background': 'orangered', ' box-shadow:': '1px 1px 5px black' }) });

    });

});
