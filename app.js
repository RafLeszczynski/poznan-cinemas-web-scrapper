import * as config from './config/config';
import {getData} from './lib/htmlScrapper';

const request = require('request'),
    Parse = require('parse').Parse;

Parse.initialize(config.parse_AppKey, config.parse_JSKey);

let Cinema = Parse.Object.extend("Cinema"),
    Movie = Parse.Object.extend("Movie");

request('http://google.com/movies?near=Poznan&date=0', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        let data = getData(html);

        //console.log(data);

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
    cinema.set('address', data.info.address);
    cinema.set('tel', data.info.tel);

    console.log(cinema);

    return cinema;
}
