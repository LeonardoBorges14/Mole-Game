let $id;
let $td1;
let $td2;
let $td3;
let a = 0;
let i = 0;
const $rankingLevel = {
    "easy": "https://mole-game-api.herokuapp.com/ranking/easy", 
    "medium": "https://mole-game-api.herokuapp.com/ranking/medium",
    "hard": "https://mole-game-api.herokuapp.com/ranking/hard"
}
$(document).ready(function () {
    open();
    top20();
});

function top20() {
    $.getJSON(getLevel(), function ($registros) {
        $("#tbody").empty();
        i = 0;
        a = $registros.slice(0, 20);
        a.forEach(element => {
            i++;
            $tr = $("<tr></tr>");
            $td1 = $("<td></td>").attr({ "class": "tg-0lax", "id": `posicao-${i}` });
            $td1.text(`${i}º`);
            $td2 = $("<td></td>").attr({ "class": "tg-0lax", "id": `user-${i}` });
            $td2.text(element.user.username);
            $td3 = $("<td></td>").attr({ "class": "tg-0lax", "id": `pontuacao-${i}` });
            $td3.text(element.pontuacao + " Pontos");
            $($tr).append($td1);
            $($tr).append($td2);
            $($tr).append($td3);
            $("#tbody").append($tr);
        });
    });
}

function getLevel() {
    return $level = $rankingLevel[$("#select").val()];
}

function open() {
    if(localStorage.getItem("dificuldade") == 3) {
        $("#easy").prop({selected:true});
    }
    if(localStorage.getItem("dificuldade") == 5) {
        $("#medium").prop({selected:true});

    }
    if(localStorage.getItem("dificuldade") == 6) {
        $("#hard").prop({selected:true});
    }
}