$(document).ready(function () {
    $("#btnLogin").click(function () {
        let $user = $("#user").val();
        let $pwd = $("#pwd").val();
        var $id;
        var a;

        if ($user && $pwd) {
            $.getJSON("https://mole-game-api.herokuapp.com/user", function ($registros) {
                if ($registros.filter($usuario => $usuario.username == $user && $usuario.pwd == $pwd).length > 0) {
                    $id = $registros.filter(element => element.username == $user)
                    localStorage.setItem("user", JSON.stringify($id));
                    a = JSON.parse(localStorage.getItem("user"))[0].id;
                    localStorage.setItem("id", a);
                    window.open("game.html", "_self");
                }
                else swal("Usuário Inválido", "Tente Novamente!", "error");
                $(".swal-button").on('mouseenter', function () { $(this).css({ 'background': 'rgb(255, 107, 8)', ' box-shadow:': '1px 1px 5px black' }) });
                $(".swal-button").on('mouseout', function () { $(this).css({ 'background': 'orangered', ' box-shadow:': '1px 1px 5px black' }) });

            });
        }
        else swal("Erro!", "Informe o Usuário e Senha", "error");
        $(".swal-button").on('mouseenter', function () { $(this).css({ 'background': 'rgb(255, 107, 8)', ' box-shadow:': '1px 1px 5px black' }) });
        $(".swal-button").on('mouseout', function () { $(this).css({ 'background': 'orangered', ' box-shadow:': '1px 1px 5px black' }) });


    });
});

