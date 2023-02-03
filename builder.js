import * as Constants from './constants.js';

//=| DOM related |============================================================//
/** @param {string} id */
const e = (id) => document.getElementById(id);
const DOM_TIMETABLE = "timetable";
const DOM_PALETTE = "palette";

//=| Palette |================================================================//
const PALETTE = {
    "Bio sem": [
        {"course": "BIO F110",  "section": "P1"},
        {"course": "BIO F111",  "section": "L1"},
        {"course": "BITS F110", "section": "L1"},
        {"course": "BITS F110", "section": "P1"},
        {"course": "BITS F112", "section": "L1"},
        {"course": "CHEM F110", "section": "P1"},
        {"course": "CHEM F111", "section": "L1"},
        {"course": "CS F111",   "section": "L1"},
        {"course": "CS F111",   "section": "P1"},
        {"course": "MATH F111", "section": "L1"},
    ],
    "Thermo sem": [
        {"course": "BITS F111", "section": "L"},
        {"course": "EEE F111",  "section": "L"},
        {"course": "MATH F111", "section": "L"},
        {"course": "MATH F113", "section": "L"},
        {"course": "ME F112",   "section": "L"},
        {"course": "ME F112",   "section": "P"},
        {"course": "PHY F110",  "section": "P"},
        {"course": "PHY F111",  "section": "L"},
    ],
}

/** Parses a "days" string.
 * @param {string} daysString A "days" string, example: `"M_2 W_3 Th_5 F_1"`
 * @returns {Map<string,number[]>} A map containing day as key, and an array of
 * period numbers as value.
 * @example
 * <caption>Example for return value:</caption>
 * new Map([
 *     ["M":  [2,]],
 *     ["T":  [  ]],
 *     ["W":  [3,]],
 *     ["Th": [5,]],
 *     ["F":  [1,]],
 * ])
 */
function parseDays(daysString) {
    /** @type {Map<string,number[]>} */
    const parsed = new Map();

    daysString.split(" ").forEach(dayString => {
        let [day, periodsString] = dayString.split("_", 2);
        const periods = [];
        for (const period of periodsString)
            periods.push(parseInt(period));
        parsed.set(day, periods);
    });

    return parsed;
}

/** Compiles a weekly timetable object containing Course ID and Section from
 * the given list of subjects and sections enrolled by the student.
 * @param {*[]} courses An array of objects containing Course ID and Section.
 */
function compileTimetable(courses) {
    const timetable = [];

    // Preparing a template
    for (let i = 0; i < 5; i++) {
        const day = [];
        // The 9,9,9,9,5 denotes the number of periods per day
        for (let j = [9,9,9,9,5][i] - 1; j >= 0; j--)
            day.push({"course": "", "section": ""});
        timetable.push(day);
    }

    courses.forEach(course => {
        const courseID = course["course"], section = course["section"];

    });

    return timetable;
}

//=| General |================================================================//

function init() {

}

function toggleTheme() {
    const link = e("darkThemeCSS");
    link.disabled = !link.disabled;
}
