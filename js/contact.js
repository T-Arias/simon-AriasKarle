'use strict';
//formulario contacto
var nameContact = document.getElementById('nameContact');
var emailContact = document.getElementById('emailContact');
var msgContact = document.getElementById('msgContact');
var sendContact = document.getElementById('sendBtnContact');
var cancelContact = document.getElementById('cancelBtnContact');
var closeContact = document.getElementById('closeContact');
var modalContact = document.getElementById('modalContact');
//boton contact
var btnContact = document.getElementById('contact');

//cierro el modal de contacto
function closeModalContact() {
    modalContact.style.display = 'none';
};
cancelContact.addEventListener('click', closeModalContact);
closeContact.addEventListener('click', closeModalContact);

//abro el modal de contacto
function openContact() {
    modalContact.style.display = 'block';
};
btnContact.addEventListener('click', openContact);

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
nameContact.addEventListener('blur', valiAlphaNumeric);
nameContact.addEventListener('focus', clearError);

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
emailContact.addEventListener('blur', valiEmail);
emailContact.addEventListener('focus', clearError);

function valiMsgLength() {
    if (msgContact.value.length > 5) {
        return true;
    } else {
        msgContact.nextElementSibling.innerText = '';
        inputError(msgContact, 'El mensaje debe contener 5 caracteres min.');
        return false;
    };
};
msgContact.addEventListener('blur', valiMsgLength);
msgContact.addEventListener('focus', clearError);

//funcion que abre mail del sistema
function sendMail() {
    if (valiAlphaNumeric() && valiEmail() && valiMsgLength()) {
        var subject = 'LPPA SIMON - Arias Karle';
        var body = 'Hola soy ' + nameContact.value + ' y queria decir que ' + msgContact.value;
        var mail = 'mailto: ' + emailContact.value + '?subject=' + subject + '&body=' + body;
        window.location.href = mail;
    };
};
sendContact.addEventListener('click', sendMail);