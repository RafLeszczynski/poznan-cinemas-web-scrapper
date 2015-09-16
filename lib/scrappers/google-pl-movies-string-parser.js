/**
 * @desc splits sting to array
 * @param {String} string
 * @returns {String[]}
 */
function stringToArray(string) {
    let delimiter = ' - ';

    return string.split(delimiter);
}

export default class GooglePLMoviesStringParser {
    /**
     * @desc gets address and telephone number from movie theater description
     * @param {String} string - movie theater description
     * @returns {{address: (String), tel: (String)}}
     */
    static parseCinemaDesciption(string) {
        let array = stringToArray(string);

        return {
            address: array[0] || '',
            tel: array[1] || ''
        }
    }

    /**
     * @desc creates move info object from string of data
     * @param {String} string
     * @returns {Object}
     * @todo: improve string parsing
     */
    static parseMovieinfo(string) {
        let array = stringToArray(string),
            subsPattern = /Napisy|Dubbing/,
            ageLimitPattern = /Klasyfikacja 18/;

        return {
            duration: array.shift() || '',
            subs: array.length && subsPattern.test(array[array.length -1]) ? array.pop() : '',
            ageLimit: array.length && ageLimitPattern.test(array[0]) ? array.shift() : '',
            genre: array.length ? array.shift() : ''
        }
    }

    /**
     * @desc creates array of display times
     * @param {String} string
     * @returns {String[]}
     */
    static parseMovieTimes(string) {
        return string.split(/\s+/);
    }
}
