const request = require("request");

const forecast = (latitud, longitud, callback) => {
    const url = 'https://api.darksky.net/forecast/44406adf5c6fd6af1e2842430e29c31e/'+ latitud +','+ longitud +'?units=si&lang=es';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('No se pudo conectar al servicio del tiempo', undefined);
        } else if (body.error) {
            callback('No se pudo encontrar la ubicación', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + '. Actualmente hay ' + body.currently.temperature + ' grados de temperatura. Existe una probabilidad de ' + body.currently.precipProbability + '% de que llueva.');
        }
    })
}

module.exports = forecast;