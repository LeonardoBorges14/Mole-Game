const $levels = { "easy": 3, "medium": 5, "hard": 6 };
const $imgWidth = 100; //largura
const $imgHeight = 75; //altura
const $imgsGame = { "default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif" }
var $initialTime;
var $timeGame = $initialTime;
var $idChronoGame;
var $idChronoStartGame;



$(document).ready(function () {
    fillBoard();
    $("#btnPlay").click(function () {
        alertWifi("", true, 3, `img/${$imgsGame.active}`, "30");
        localStorage.removeItem("dificuldade");
        localStorage.setItem("dificuldade", getLevel());
        var counter = 0;
        var interval = setInterval(function () {
            counter++;
            if (counter == 3) {
                clearInterval(interval);
                btnControl();
                $idChronoStartGame = setInterval(startGame, 1180);
                $idChronoGame = setInterval(startChronoGame, 1000);
            }
        }, 1000);
        $("#level").prop("disabled", true);
    });

    $('#mute').click(function () {
        $audio1 = document.getElementById("gameSound");
        if ($('#mute').attr('class') === "bi-volume-up-fill") {
            $('#mute').attr('class', "bi-volume-mute-fill");
            $('#mute').css("background-color", "red");
            $audio1.pause();
        }
        else {
            $('#mute').css("background-color", "white");
            $('#mute').attr('class', "bi-volume-up-fill");
            $audio1.play();
        }
    })


    $("#btnPause").click(function () { pauseGame() });

    $("#btnStop").click(function () { endGame() });

    $("#btnExit").click(function () {
        swal({
            title: "Você Tem Certeza?",
            text: "Se sair do Jogo, Perderá todo o progresso!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("id");
                localStorage.removeItem("user");
                window.open("login.html", "_self");
            }
        });

    });

    $audio1 = document.getElementById("gameSound");
    $audio1.volume = 0.8;

});

function pauseGame() {
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);
    continueGame();
    $("#btnPause").prop("disabled", true);
    $("#btnPlay").prop("disabled", false);
}


function startChronoGame() {
    let $secondsFormat = (--$timeGame).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    ($timeGame >= 0) ? $("#chrono").text($secondsFormat) : endGame();
}

function endGame() {
    clearInterval($idChronoGame);
    alertWifi(`Fim de Jogo. Sua pontuação foi: ${$("#score").text()}`, false, 0, `img/${$imgsGame.active}`, "30");

    let data = { "user": { "id": localStorage.getItem("id") }, "pontuacao": $("#score").text(), "dificuldade": getLevel() };
    let url = "https://mole-game-api.herokuapp.com/ranking";
    axios.post(url, data);

    clearInterval($idChronoStartGame);
    fillBoard();
    let $secondsFormat = ($timeGame).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    $("#chrono").text($secondsFormat);
    $("#btnPlay").prop("disabled", false);
    $("#btnPause").prop("disabled", true);
    $("#level").prop("disabled", false);
    $("#score").text("0");
}

function btnControl() {
    $("#btnPause").prop("disabled", false);
    $("#btnStop").prop("disabled", false);
    $("#btnPlay").prop("disabled", true);
}

function continueGame() {
    $level = getLevel();
    $boardWidth = $imgWidth * $level;
    $boardHeight = $imgHeight * $level;
    $("#board").css({ "width": $boardWidth, "height": $boardHeight });
    placeHolesBoard($level);
}


function fillBoard() {
    $level = getLevel();
    $boardWidth = $imgWidth * $level;
    $boardHeight = $imgHeight * $level;
    $("#board").css({ "width": $boardWidth, "height": $boardHeight });
    placeHolesBoard($level);
    selectTimer($level);
}

function selectTimer($level) {
    if ($level == 3) {
        $timeGame = 50;
        $("#chrono").html("50");
    }

    else if ($level == 5) {
        $timeGame = 40;
        $("#chrono").html("40");
    }
    else {
        $timeGame = 30
        $("#chrono").html("30");
    }
}

function placeHolesBoard($level) {
    $("#board").empty();
    for ($i = 0; $i < Math.pow($level, 2); $i++) {
        $div = $("<div></div>");
        $($div).css("user-select", "none");
        $($div).attr("draggable-select", false);

        $($div).css("margin-top", "-4px");
        $img = $("<img>").attr({ "src": `img/${$imgsGame.default}`, "class": "toupeira", "id": `mole-${$i + 1}`, "draggable": false });
        $($img).attr("draggable", false);
        $($img).click(function () {
            updadeScore(this);
        });
        $($div).append($img);
        $("#board").append($div);
    }
}

function updadeScore($img) {
    if ($($img).attr("src").search($imgsGame.active) != -1) {
        $("#score").text(parseInt($("#score").text()) + 1); //ARRUMAR CRIANDO VARIÁVEL
        $audio = document.getElementById("punch");
        if ($('#mute').attr('class') === "bi-volume-up-fill") {
            $audio.play();
            $audio.volume = 0.2;
        }

        $($img).attr("src", `img/${$imgsGame.dead}`);

        $("#section").css("cursor", 'url("../img/martelo2.png"),auto');
        var counter = 0;
        var interval = setInterval(function () {
            counter++;
            if (counter == 1) {
                $("#section").css("cursor", 'url("../img/martelo.png"),auto');
            }
        }, 200);
    }
}

function startGame($img) {
    $level = getLevel();
    $randNumber = getRandomNumber(1, Math.pow($level, 2));
    $(`#mole-${$randNumber}`).attr("src", `img/${$imgsGame.active}`);
    $(`#mole-${$randNumber}`).attr("draggable", false);
    var counter = 0;
    var interval = setInterval(function () {
        counter++;
        if (counter == 1) {
            $(`#mole-${$randNumber}`).attr("src", `img/${$imgsGame.default}`);
        }
    }, 1000);
}


function getRandomNumber(min, max) {
    return Math.round((Math.random() * Math.abs(max - min)) + min);
}

function getLevel() {
    return $level = $levels[$("#level").val()];
}