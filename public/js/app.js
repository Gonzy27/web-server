console.log('Client side javascript file is loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const localizacion = search.value;
    messageOne.textContent = 'Cargando ....';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+ localizacion).then((response) => {
    response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            }else{
                messageOne.textContent = data.localizacion;
                messageTwo.textContent = data.forecast;
            }
        })
    })
});