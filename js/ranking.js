'use strict';
//formulario contacto
var nameContact = document.getElementById('nameContact');
var emailContact = document.getElementById('emailContact');
var msgContact = document.getElementById('msgContact');
var sendContact = document.getElementById('sendBtnContact');
var cancelContact = document.getElementById('cancelBtnContact');
var closeContact = document.getElementById('closeContact');
var modalContact = document.getElementById('modalContact');
//boton ranking
var btnRanking = document.getElementById('ranking');

//funcion que trae el local storage y lo guada en la variable storage
function getRanking() {
    //traigo el rankign del local storage
    if (localStorage.length !== 0) {
        storage = JSON.parse(localStorage.getItem('games'));
    };
};

//funcion que agrega un nueva nueva partida en el storage
function pushStorage() {
    getRanking();
    var game = {
        player: namePlayer,
        score: score,
        level: level,
        datetime: new Date().toLocaleString()
    };
    storage.push(game);
    //guardo los datos de la partida anterior
    localStorage.setItem('games', JSON.stringify(storage));
};

//funcion que muestra la tabla
function showRanking() {
    tableBody.innerHTML = '';
    for (var index = 0; index < storage.length; index++) {
        var game = storage[index];
        var row = tableBody.insertRow();
        row.insertCell(0).innerText = game.player;
        row.insertCell(1).innerText = game.score;
        row.insertCell(2).innerText = game.level;
        row.insertCell(3).innerText = game.datetime;
    };
};

//funcion que ordena la tabla por puntuacion
function orderByScore() {
    getRanking();
    storage.sort(function (a, b) {
        return b.score - a.score;
    });
    showRanking();
};
theadScore.addEventListener('click', orderByScore);

//funcion que ordena la tabla por fecha
function orderByDate() {
    getRanking();
    storage.sort(function (a, b) {
        return Date.parse(b.datetime) - Date.parse(a.datetime);
    });
    showRanking();
};
theadDate.addEventListener('click', orderByDate);

closeRanking.addEventListener('click', function () {
    modalRanking.style.display = 'none';
});

//funcion que muestra el ranking
btnRanking.addEventListener('click', function () {
    modalRanking.style.display = 'block';
    orderByScore();
});