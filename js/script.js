'use strict';
var randomArray = [];
var inputArray = [];
var storage = [];
var namePlayer = '';
var acum = 0;
var level = 1;
var score = 0;
var SesionScore = 0;
var time = 0;
var interval;
var intervalTime;
var btnStart = document.getElementById('startButton');
var btnSimon = document.getElementsByClassName('buttons');
//los botones por individuales del simon
var greenBtn = document.getElementById('green');
var redBtn = document.getElementById('red');
var blueBtn = document.getElementById('blue');
var yellowBtn = document.getElementById('yellow');
//puntuacion y nivel y jugador
var playerHTML = document.getElementById('player');
var levelHTML = document.getElementById('level');
var scoreHTML = document.getElementById('score');
//modal
var modal = document.getElementById('modal');
var modalMsj = document.getElementById('modalMsj');
var modalBtn = document.getElementById('modalBtn');
var closeRestart = document.getElementById('closeModal');
//Time
var timeHTML = document.getElementById('time');
//furmulario nombre
var formName = document.getElementById('formName');
var tittleHTML = document.getElementById('tittle');
var inputName = document.getElementById('userName');
var btnPlay = document.getElementById('play');
//formulario contacto
var nameContact = document.getElementById('nameContact');
var emailContact = document.getElementById('emailContact');
var msgContact = document.getElementById('msgContact');
var sendContact = document.getElementById('sendBtnContact');
var cancelContact = document.getElementById('cancelBtnContact');
var closeContact = document.getElementById('closeContact');
var modalContact = document.getElementById('modalContact');
//abrir contacto-ranking
var btnContact = document.getElementById('contact');
var btnRanking = document.getElementById('ranking');
//ranking
var tableBody = document.getElementById('tableBody');
var modalRanking = document.getElementById('modalRanking');
var theadDate = document.getElementById('theadDate');
var theadScore = document.getElementById('theadScore');
var closeRanking = document.getElementById('closeRanking');

/* INPUT ANTES DE ARRANCA */
//capturo el input del nombre de usuario
inputName.addEventListener('keyup', namePlus);
//funcion que escribe en el titulo el nombre apenas se escribe en el input
function namePlus() {
    tittleHTML.innerText = 'Bienvenido: ' + inputName.value;
    playerHTML.innerText = 'Jugador: ' + inputName.value;
    //se habilita el boton jugar cuando tiene 3 caracteres
    if (inputName.value.length >= 3) {
        btnPlay.disabled = false;
    } else {
        btnPlay.disabled = true;
    }
}

//cambio de color el borde del input
inputName.addEventListener('blur', nameInput);
function nameInput() {
    if (inputName.value.length < 3) {
        inputName.style.border = '1px solid red';
    } else {
        inputName.style.border = '1px solid black';
    };
};

//logica del boton jugar
btnPlay.addEventListener('click', play);
function play() {
    formName.style.display = 'none';
    namePlayer = inputName.value;
    btnStart.disabled = false;
    tittleHTML.innerText = 'Simon game';
    startGame();
};

/* FORMULARIO CONTACTO */
sendContact.addEventListener('click', sendMail);
//funcion que abre mail del sistema
function sendMail() {
    if (valiAlphaNumeric() && valiEmail() && valiMsgLength()) {
        var subject = 'LPPA SIMON - Arias Karle';
        var body = 'Hola soy ' + nameContact.value + ' y queria decir que ' + msgContact.value;
        var mail = 'mailto: ' + emailContact.value + '?subject=' + subject + '&body=' + body;
        window.location.href = mail;
    };
};

//cierro el modal de contacto
cancelContact.addEventListener('click', closeModalContact);
closeContact.addEventListener('click', closeModalContact);
function closeModalContact() {
    modalContact.style.display = 'none';
};

//abro el modal de contacto
btnContact.addEventListener('click', openContact);
function openContact() {
    modalContact.style.display = 'block';
};

//validaciones
//creo un mesaje de error
function inputError(input, msg) {
    input.style.border = '1px solid red';
    input.nextElementSibling.innerText = msg + '*';
};
//cuando hago el focus borro el mensaje y el input no es mas rojo
function clearError() {
    this.nextElementSibling.innerText = '';
    this.style.border = '1px solid black';
};

nameContact.addEventListener('blur', valiAlphaNumeric);
nameContact.addEventListener('focus', clearError);
//funcion que valida que el input del nombre sea alfanumerico
function valiAlphaNumeric() {
    var regex = /^[a-z0-9]+$/i;
    if (regex.test(nameContact.value) && nameContact.value.length !== 0) {
        return true;
    } else {
        nameContact.nextElementSibling.innerText = '';
        inputError(nameContact, 'El nombre debe ser alfanumerico');
        return false;
    };
};

emailContact.addEventListener('blur', valiEmail);
emailContact.addEventListener('focus', clearError);
//funcion que valida que el email tenga un formato correcto
function valiEmail() {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(emailContact.value) && emailContact.value.length !== 0) {
        return true;
    } else {
        emailContact.nextElementSibling.innerText = '';
        inputError(emailContact, 'El email debe tener un formato valido');
        return false;
    };
};

msgContact.addEventListener('blur', valiMsgLength);
msgContact.addEventListener('focus', clearError);
function valiMsgLength() {
    if (msgContact.value.length > 5) {
        return true;
    } else {
        msgContact.nextElementSibling.innerText = '';
        inputError(msgContact, 'El mensaje debe contener 5 caracteres min.');
        return false;
    };
};


/* JUEGO */
//capturo el evento del boton del modal y  reinicio el juego
modalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    startGame();
});
btnStart.addEventListener('click', startGame);
function startGame() {
    clearInterval(intervalTime);
    randomArray = [];
    inputArray = [];
    //cuando se reinicia la partida se restauran los valores que se muestran
    acum = 0;
    level = 1;
    score = 0;
    time = 0;
    timeHTML.innerText = time + ' segundos';
    scoreHTML.innerText = 'Puntaje: ' + score;
    levelHTML.innerText = 'Nivel: ' + level;
    newSecuence(1000);
    //Inicio el intervalo de tiempo
    intervalTime = setInterval(function () {
        time++;
        timeHTML.innerText = time + ' segundos';
    }, 1000);
};

//funcion que muestra la secuencia
function newSecuence(timeInterval) {
    random();
    acum = 0;
    //Desabilito los botones para correr la secuencia
    greenBtn.disabled = true;
    redBtn.disabled = true;
    blueBtn.disabled = true;
    yellowBtn.disabled = true;
    interval = setInterval(function () {
        if (randomArray.length !== acum) {
            //Muestro la secuencia
            light(randomArray[acum], 800);
            acum++;
        } else {
            //Habilito la secuencia para que el jugador pueda seleccionar la suya
            greenBtn.disabled = false;
            redBtn.disabled = false;
            blueBtn.disabled = false;
            yellowBtn.disabled = false;
            inputArray = [];
            acum = 0;
            clearInterval(interval);
        }
    }, timeInterval);
};

//Funcion que se ejecuta cuando quiero prender las luces del simon
function light(arr, timeout) {
    switch (arr) {
        case 0:
            btnSimon[arr].style.backgroundColor = 'rgb(0, 255, 0)';
            setTimeout(defaultLight, timeout);
            break;
        case 1:
            btnSimon[arr].style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(defaultLight, timeout);
            break;
        case 2:
            btnSimon[arr].style.backgroundColor = 'rgb(255, 255, 0)';
            setTimeout(defaultLight, timeout);
            break;
        case 3:
            btnSimon[arr].style.backgroundColor = 'rgb(0, 0,255)';
            setTimeout(defaultLight, timeout);
            break;

        default:
            break;
    };
};

//Vuelve a luz por defecto
function defaultLight() {
    btnSimon[0].style.backgroundColor = 'rgb(0, 100, 0)';
    btnSimon[1].style.backgroundColor = 'rgb(100,0, 0)';
    btnSimon[2].style.backgroundColor = 'rgb(100, 100, 0)';
    btnSimon[3].style.backgroundColor = 'rgb(0, 0, 100)';
};

//Agrega un nuevo color a la secuencia
function random() {
    randomArray.push(Math.floor(Math.random() * 4));
};

//Verifico que las teclas seleccionadas cumplan con la secuencia generada
greenBtn.addEventListener('click', btnSequence);
redBtn.addEventListener('click', btnSequence);
blueBtn.addEventListener('click', btnSequence);
yellowBtn.addEventListener('click', btnSequence);

//Se ejecuta cada vez que se presiona un boton del simon
function btnSequence() {
    switch (this.id) {
        case 'green':
            inputArray.push(0);
            light(0, 100);
            break;
        case 'red':
            inputArray.push(1);
            light(1, 100);
            break;
        case 'yellow':
            inputArray.push(2);
            light(2, 100);
            break;
        case 'blue':
            inputArray.push(3);
            light(3, 100);
            break;

        default:
            break;
    }

    if (randomArray.length !== 0) {
        btnPlayerLogic();
    };
};

//funcion que valida los botones del jugador
function btnPlayerLogic() {
    if (inputArray[acum] === randomArray[acum]) {
        acum++;
        score++;
        scoreHTML.innerText = 'Puntaje: ' + score;
        //valida si el jugador acerto toda las secuencia
        if (acum === randomArray.length) {
            level++;
            levelHTML.innerText = 'nivel: ' + level;
            newSecuence(1000);
        }
    } else {
        //el jugador pierde se detiene el temporzador y aparece el modal
        clearInterval(intervalTime);
        modal.style.display = 'block';
        calcScore();
        modalMsj.innerText = 'puntuación: ' + score + '\nnivel: ' + level;
        pushStorage();
    };
};

//funcion que calcula el puntaje final
function calcScore() {
    var penalty = Math.floor(time / 30);
    score -= penalty;
    scoreHTML.innerText = 'puntaje: ' + score;
};

/* MODAL RESTARTGAME */
closeRestart.addEventListener('click', closeRestartGame);
function closeRestartGame() {
    modal.style.display = 'none';
};

/* LOCAL STORAGE */
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

//funcion que muestra el ranking
btnRanking.addEventListener('click', function () {
    modalRanking.style.display = 'block';
    orderByScore();
});

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

theadScore.addEventListener('click', orderByScore);
//funcion que ordena la tabla por puntuacion
function orderByScore() {
    getRanking();
    storage.sort(function (a, b) {
        return b.score - a.score;
    });
    showRanking();
};

theadDate.addEventListener('click', orderByDate);
//funcion que ordena la tabla por fecha
function orderByDate() {
    getRanking();
    storage.sort(function (a, b) {
        return Date.parse(b.datetime) - Date.parse(a.datetime);
    });
    showRanking();
};

closeRanking.addEventListener('click', function () {
    modalRanking.style.display = 'none';
});