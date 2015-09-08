const cheerio = require('cheerio');

export default class DOMHelper {
    /**
     * @desc return cheerio collection of movie theaters
     * @param {Function} $ - cheerio context
     * @returns {Object} - cheerio collection with collection of movie theater
     */
    static getCinemaDOM($) {
        return  $('.theater');
    }

    /**
     * @desc return cheerio collection of movies
     * @param {Object} $element - cheerio collection
     * @returns {Object} - cheerio collection with collection of movies
     */
    static getMoviesDOM($element) {
        return $element.find('.movie')
    }

    /**
     * @desc return cheerio collection with cinema description
     * @param {Object} $element - cheerio collection
     * @returns {Object} - cheerio collection with cinema description
     */
    static getCinemaDescriptionDOM($element) {
        return $element.children('.desc')
    }

    /**
     * @desc gets cinema Name
     * @param {Object} $element - cheerio collection
     * @returns {string}
     */
    static getCinemaName($element) {
        return $element
            .find('h2 a')
            .text()
            .trim();
    }

    /**
     * @desc gets cinema Description
     * @param {Object} $element - cheerio collection
     * @returns {string}
     */
    static getCinemaDescription($element) {
        return $element
            .find('.info')
            .text()
            .trim();
    }

    /**
     * @desc gets movie info
     * @param {Object} $element - cheerio collection
     * @returns {string}
     */
    static getMovieInfo($element) {
        return $element
            .children('.info')
            .text()
            .trim();
    }

    /**
     * @desc gets movie title
     * @param {Object} $element - cheerio collection
     * @returns {string}
     */
    static getMovieTitle($element) {
        return $element
            .find('.name a')
            .text()
            .trim();
    }

    /**
     * @desc gets movie times
     * @param {Object} $element - cheerio collection
     * @returns {string}
     */
    static getMovieTimes($element) {
        return $element
            .find('.times span')
            .text()
            .trim();
    }
}