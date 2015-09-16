import GooglePLMoviesDOMHelper from './google-pl-movies-DOM-helper';
import GooglePLMoviesStringParser from './google-pl-movies-string-parser';

const cheerio = require('cheerio');
let $;

/**
 * @desc returns array of cinemas with its descriptions and movies being played
 * @param {String} html
 * @returns {Object[]}
 */
export function getData(html) {
    $ = cheerio.load(html);

    return getCinemasFromDOM(GooglePLMoviesDOMHelper.getCinemaDOM($));
}

/**
 * @desc gets movie theaters data array from cheerio collection of movie theaters
 * @param {Object} dom - cheerio collection with collection of movie theater
 * @returns {Object[]} - data model
 */
function getCinemasFromDOM(dom) {
    let cinemas = [];

    dom.each((i, element) => {
        let $element = $(element),
            $cinemaDesc = GooglePLMoviesDOMHelper.getCinemaDescriptionDOM($element),
            cinemaInfo = GooglePLMoviesDOMHelper.getCinemaDescription($cinemaDesc),
            {address, tel} = GooglePLMoviesStringParser.parseCinemaDesciption(cinemaInfo);

        cinemas.push({
            name: GooglePLMoviesDOMHelper.getCinemaName($cinemaDesc),
            address: address,
            tel: tel,
            movies: getMoviesDataFromDOM(GooglePLMoviesDOMHelper.getMoviesDOM($element))
        });
    });

    return cinemas;
}

/**
 * @desc gets movies data array from cheerio collection of movies
 * @param {Object} dom - cheerio collection with collection of movies
 * @returns {Object[]} - movies array
 */
function getMoviesDataFromDOM(dom) {
    let moviesArray = [];

    dom.each((i, element) => {
        let $element = $(element),

            movieInfo = GooglePLMoviesDOMHelper.getMovieInfo($element),
            {duration, genre, ageLimit, subs} = GooglePLMoviesStringParser.parseMovieinfo(movieInfo);

        moviesArray.push({
            ageLimit: ageLimit,
            duration: duration,
            genre: genre,
            subs: subs,
            title: GooglePLMoviesDOMHelper.getMovieTitle($element),
            times: GooglePLMoviesStringParser.parseMovieTimes(GooglePLMoviesDOMHelper.getMovieTimes($element))
        });
    });

    return moviesArray;
}
