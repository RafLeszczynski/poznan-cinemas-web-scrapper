import DOMHelper from './domHelper';
import StringParserHeleper from './stringParseHelper';

const cheerio = require('cheerio');
/**
 * @desc gets movie theaters data array from cheerio collection of movie theaters
 * @param {Object} dom - cheerio collection with collection of movie theater
 * @param {Function} $ - cheerio context
 * @returns {Array} - data model
 */
function getCinemasFromDOM(dom, $) {
    let cinemas = [];

    dom.each((i, element) => {
        let $element = $(element),
            $cinemaDesc = DOMHelper.getCinemaDescriptionDOM($element);

        cinemas.push({
            name: DOMHelper.getCinemaName($cinemaDesc),
            info: StringParserHeleper.parseCinemaDesciption(DOMHelper.getCinemaDescription($cinemaDesc)),
            movies: getMoviesDataFromDOM(DOMHelper.getMoviesDOM($element), $)
        });
    });

    return cinemas;
}

/**
 * @desc gets movies data array from cheerio collection of movies
 * @param {Object} dom - cheerio collection with collection of movies
 * @param {Function} $ - cheerio context
 * @returns {Array} - movies array
 */
function getMoviesDataFromDOM(dom, $) {
    let moviesArray = [];

    dom.each((i, element) => {
        let $element = $(element),
            info = StringParserHeleper.parseMovieinfo(DOMHelper.getMovieInfo($element));

        moviesArray.push({
            title: DOMHelper.getMovieTitle($element),
            duration: info.duration,
            subtitle: info.subtitles,
            times: DOMHelper.getMovieTimes($element)
        });
    });

    return moviesArray;
}

/**
 * @desc returns array of cinemas with its descriptions and movies being played
 * @param {String} html
 * @returns {Array}
 */
export function getData(html) {
    let $ = cheerio.load(html),
        dom = DOMHelper.getCinemaDOM($);

    return getCinemasFromDOM(dom, $);
}
