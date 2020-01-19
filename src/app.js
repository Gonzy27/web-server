const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

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
    geocode(req.query.address, (error, {latitud, longitud, localizacion} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitud, longitud, (error, dataForecast) => {
            if(error){
                return res.send({error})
            }
            return res.send({
                latitud,
                longitud,
                localizacion,
                forecast: dataForecast
            });
        });
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

app.listen(port , () => {
    console.log(`Server levantado en el puerto ${port}`);
});