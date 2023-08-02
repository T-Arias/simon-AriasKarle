var randomArray = [];
var inputArray = [];
var acum = 0;
var level = 0;
var score = 0;
var SesionScore = 0;
var btnStart = document.getElementById('startButton');
var btnSimon = document.getElementsByClassName('buttons');
//los botones por individuales
var greenBtn = document.getElementById('green');
var redBtn = document.getElementById('red');
var blueBtn = document.getElementById('blue');
var yellowBtn = document.getElementById('yellow');
//puntuacion y nivel y nivel
var levelHTML = document.getElementById('level');
var scoreHTML = document.getElementById('score');
//modal
var modal = document.getElementById('modal');
var modalMsj = document.getElementById('modalMsj');
var modalBtn = document.getElementById('modalBtn');


/* var body = document.getElementsByTagName('body');
body.addEventListener('onload',function() {
    if (localStorage.length==0) {
        addHistoric
    }
});

function addHistoric() {

} */

btnStart.addEventListener('click', startGame);
function startGame() {
    modal.style.display = 'none';
    randomArray = [];
    inputArray = [];
    acum = 0;
    level = 0;
    score = 0;
    newSecuence(1000);
}

//funcion que muestra la secuencia
function newSecuence(timeInterval) {
    random();
    acum =0;
    //Desabilito los botones para correr la secuencia
    greenBtn.disabled = true;
    redBtn.disabled = true;
    blueBtn.disabled = true;
    yellowBtn.disabled = true;
    var interval = setInterval(function () {
        console.log('longitud del arreglo: '+randomArray.length + ' acum: '+ acum);
        if (randomArray.length !== acum) {
            //Muestro la secuencia
            light(randomArray[acum],800);
            acum++;
        } else {
            //Habilito la secuencia para que el jugador pueda seleccionar la suya
            greenBtn.disabled = false;
            redBtn.disabled = false;
            blueBtn.disabled = false;
            yellowBtn.disabled = false;
            inputArray = [];
            acum=0;
            clearInterval(interval);
        }
    }, timeInterval);
}

//Funcion que se ejecuta cuando quiero prender las luces del simon
function light(arr,timeout) {
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
    }
}

//Vuelve a luz por defecto
function defaultLight() {
    btnSimon[0].style.backgroundColor = 'rgb(0, 100, 0)';
    btnSimon[1].style.backgroundColor = 'rgb(100,0, 0)';
    btnSimon[2].style.backgroundColor = 'rgb(100, 100, 0)';
    btnSimon[3].style.backgroundColor = 'rgb(0, 0, 100)';
}

//Agrega un nuevo color a la secuencia
function random() {
    randomArray.push(Math.floor(Math.random() * 4));
}

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
            light(0,100);
            break;
        case 'red':
            inputArray.push(1);
            light(1,100);
            break;
        case 'yellow':
            inputArray.push(2);
            light(2,100);
            break;
        case 'blue':
            inputArray.push(3);
            light(3,100);
            break;

        default:
            break;
    }

    if (randomArray.length!==0) {
        btnPlayerLogic();
    }
}

function btnPlayerLogic() {
    if (inputArray[acum]===randomArray[acum]) {
        acum++;
        score++;
        scoreHTML.innerText ='Puntaje: '+score;
        if (acum===randomArray.length) {
            level++;
            levelHTML.innerText ='nivel: '+level;
            newSecuence(1000);
        }
    } else {
        scoreHTML.innerText ='Puntaje: '+0;
        levelHTML.innerText ='nivel: '+0;
        modal.style.display = 'block';
        modalMsj.innerText = 'puntuación: '+score +'\nnivel: '+level;
    }

    //capturo el evento del boton del modal y  reinicio el juego
    modalBtn.addEventListener('click',startGame);
}