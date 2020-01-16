const path = require('path');
const express = require('express');

const app = express();

// Definir rutas para configuración de Express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Configuración handlebars engine y ubicación de vistas
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Configuración de directorio estático
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Gonzalo'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre mi',
        name: 'Gonzalo'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        parrafo: 'Texto de ayuda'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: {
            latitud: '40',
            longitud: '123'
        },
        address: 'Santiago'
    });
})

//app.com
//app.com/help

app.listen(3000, () => {
    console.log('Server levantado en el puerto 3000');
});