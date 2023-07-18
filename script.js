var randomArray = [];
var inputArray = [];
var acum = 0;
var score = 0;
var SesionScore = 0;
var btnStart = document.getElementById('startButton');
var btnSimon = document.getElementsByClassName('buttons');
//los botones por individuales
var greenBtn = document.getElementById('green');
var redBtn = document.getElementById('red');
var blueBtn = document.getElementById('blue');
var yellowBtn = document.getElementById('yellow');
//Score
var scoreHTML = document.getElementById('score');
//score hisotorico
var scoreHistoric = document.getElementById('historic');
//score hisotorico
var scoreSesion = document.getElementById('sesion');


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
    randomArray = [];
    inputArray = [];
    acum = 0;
    score = 0;
    newSecuence(1000);
}

function newSecuence(timeInterval) {
    random();
    acum =0;
    //Desabilito los botones para correr la secuencia
    greenBtn.disabled = true;
    redBtn.disabled = true;
    blueBtn.disabled = true;
    yellowBtn.disabled = true;
    var interval = setInterval(function () {
        if (randomArray.length !== acum) {
            //Muestro la secuencia
            light(randomArray[acum],800);
            acum++;
            console.log('SIGO ACA');
        } else {
            console.log('PASE ACA');
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
            console.log(btnSimon[arr]);
            break;
        case 1:
            btnSimon[arr].style.backgroundColor = 'rgb(255, 0, 0)';
            setTimeout(defaultLight, timeout);
            console.log(btnSimon[arr]);
            break;
        case 2:
            btnSimon[arr].style.backgroundColor = 'rgb(255, 255, 0)';
            setTimeout(defaultLight, timeout);
            console.log(btnSimon[arr]);
            break;
        case 3:
            btnSimon[arr].style.backgroundColor = 'rgb(0, 0,255)';
            setTimeout(defaultLight, timeout);
            console.log(btnSimon[arr]);
            break;

        default:
            console.log('Aca no tuvo que pasar');
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
            console.log('No deberia pasar por aca');
            break;
    }

    if (randomArray.length!==0) {
        btnPlayerLogic();
    }
}

function btnPlayerLogic() {
    if (inputArray[acum]===randomArray[acum]) {
        console.log('Viene bien la secuencia');
        console.log('La que pongo: ',inputArray[acum],' la random: ',randomArray[acum]);
        acum++;
        if (acum===randomArray.length) {
            score++;
            scoreHTML.innerText ='Puntuación: '+score;
            console.log(score);
            newSecuence(1000);
        }
    } else {
        scoreSesion.textContent ='Puntuación anterior: '+score;
        scoreHTML.innerText ='Puntuación: '+score;
        alert('Perdiste: \n'+'Maxima puntuación: '+score);
    }
}