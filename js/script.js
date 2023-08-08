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
//botones debajo del simon
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

/* JUEGO */
//Vuelve a luz por defecto
function defaultLight() {
    btnSimon[0].style.backgroundColor = 'rgb(0, 100, 0)';
    btnSimon[1].style.backgroundColor = 'rgb(100,0, 0)';
    btnSimon[2].style.backgroundColor = 'rgb(100, 100, 0)';
    btnSimon[3].style.backgroundColor = 'rgb(0, 0, 100)';
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

//Agrega un nuevo color a la secuencia
function random() {
    randomArray.push(Math.floor(Math.random() * 4));
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

//inicia el juego
function startGame() {
    clearInterval(intervalTime);
    btnStart.disabled=true;
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
btnStart.addEventListener('click', startGame);

//funcion que calcula el puntaje final
function calcScore() {
    var penalty = Math.floor(time / 30);
    score -= penalty;
    scoreHTML.innerText = 'puntaje: ' + score;
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
        btnStart.disabled = false;
    };
};

//Se ejecuta cada vez que se presiona un boton del simon
//el push agrega el boton presionado para ser validado
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
    };
    if (randomArray.length !== 0) {
        btnPlayerLogic();
    };
};

//Verifico que las teclas seleccionadas cumplan con la secuencia generada
greenBtn.addEventListener('click', btnSequence);
redBtn.addEventListener('click', btnSequence);
blueBtn.addEventListener('click', btnSequence);
yellowBtn.addEventListener('click', btnSequence);

/* INPUT ANTES DE ARRANCA */
//funcion que escribe en el titulo el nombre apenas se escribe en el input
function namePlus() {
    tittleHTML.innerText = 'Bienvenido: ' + inputName.value;
    playerHTML.innerText = 'Jugador: ' + inputName.value;
    //se habilita el boton jugar cuando tiene 3 caracteres
    if (inputName.value.length >= 3) {
        btnPlay.disabled = false;
    } else {
        btnPlay.disabled = true;
    };
};
//capturo el input del nombre de usuario
inputName.addEventListener('keyup', namePlus);

//cambio de color el borde del input
function nameInput() {
    if (inputName.value.length < 3) {
        inputName.style.border = '1px solid red';
    } else {
        inputName.style.border = '1px solid black';
    };
};
inputName.addEventListener('blur', nameInput);


//logica del boton jugar
function play() {
    formName.style.display = 'none';
    namePlayer = inputName.value;
    tittleHTML.innerText = 'Simon game';
    startGame();
};
btnPlay.addEventListener('click', play);


/* MODAL RESTARTGAME */
function closeRestartGame() {
    modal.style.display = 'none';
};
closeRestart.addEventListener('click', closeRestartGame);

//capturo el evento del boton del modal y reinicio el juego
modalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    startGame();
});