const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Definir rutas para configuración de Express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Configuración handlebars engine y ubicación de vistas
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

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
        parrafo: 'Texto de ayuda',
        title: 'Ayuda',
        name: 'Gonzalo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Se debe ingresar una ubicación'
        })
    }
    res.send({
        latitud: '40',
        longitud: '123',
        address: req.query.address
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Se debe ingresar un término de búsqueda'
        })
    }
    res.send({
        products: []
    })
})

//app.com
//app.com/help

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        mensajeError: 'Sección de ayuda no encontrada',
        name: 'Gonzalo'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404',{
        title: '404',
        mensajeError: 'Sección de about no encontrada',
        name: 'Gonzalo'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        mensajeError: 'Página no encontrada',
        name: 'Gonzalo'
    })
})

app.listen(3000, () => {
    console.log('Server levantado en el puerto 3000');
});