/**
 * @desc splits sting to array
 * @param {String} string
 * @returns {Array}
 */
function stringToArray(string) {
    let delimiter = ' - ';

    return string.split(delimiter);
}

export default class StringParserHelper {
    /**
     * @desc gets address and telephone number from movie theater description
     * @param {String} string - movie theater description
     * @returns {{address: (string), tel: (string)}}
     */
    static parseCinemaDesciption(string) {
        let array = stringToArray(string);

        return {
            address: array[0] || '',
            tel: array[1] || ''
        }
    }

    /**
     * @desc gets movie duration and subtitles info from movie info
     * @param {String} string
     * @returns {{duration: (string), subtitles: (string)}}
     */
    static parseMovieinfo(string) {
        let array = stringToArray(string);

        return {
            duration: array[0] || '',
            subtitles: array[1] || ''
        }
    }
}
