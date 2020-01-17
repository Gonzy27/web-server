const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ29uemFsbzI3IiwiYSI6ImNrNWRhcWRybDBiaGkza21obDc4YmhkODEifQ.Tq1C2Fkobaq_7j9hlTd_sg&language=es&limit=1';
    
    request({url, json: true}, (error, {body} ) => {
        if(error){
            callback('No se pudo conectar al servicio de localización!', undefined);
        } else if (body.features.length === 0) {
            callback('No se pudo encontrar una ubicación válida, Intenta otra búsqueda', undefined)
        } else {
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                localizacion: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;