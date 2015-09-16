import * as config from './config/config';
import {getData} from './lib/scrappers/google-pl-movies-scrapper';

const request = require('request'),
    iconv = require('iconv-lite'),
    Parse = require('parse').Parse;

let Cinema = Parse.Object.extend("Cinema"),
    Movie = Parse.Object.extend("Movie"),

    requestParams = {
        uri: 'http://google.pl/movies?near=Poznan&date=0',
        encoding: null
    };

Parse.initialize(config.parse_AppKey, config.parse_JSKey);

request.get(requestParams, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        let encodedHTML = iconv.decode(body, "ISO-8859-2"),
            data = getData(encodedHTML);

        addCinemas(data);

    } else {
        //Todo: improve temporary error logging
        console.log(response.statusCode);
        console.log(error);
    }
});

function addCinemas(data) {
    let cinemasArray = data.map(createNewCinemaObject);

    Parse.Object.saveAll(cinemasArray, {
        success: function(objects) {
            console.log(objects);
        },
        error: function(error) {
            console.log(error)
        }
    });
}

function createNewCinemaObject(data) {
    let cinema = new Cinema();

    cinema.set('name', data.name);
    cinema.set('address', data.address);
    cinema.set('tel', data.tel);

    return cinema;
}
