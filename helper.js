"use strict";
import * as Constants from './constants.js';

/** Converts given minutes into h:mm format.
 * @param {number} minutes
 * @returns {string} */
export function formatTime(minutes) {
    minutes = minutes % 1440;
    const h = Math.floor(minutes / 60);
    const m = Math.floor(minutes - h * 60);
    const h_12 = (h % 12) || 12; // if h%12 is 0, then it'll be taken as 12.
    const am_pm = h > 11 ? "pm" : "am";
    const m_str = (m < 10 ? '0' : '') + m;
    return `${h_12}:${m_str}${am_pm}`;
}

/** Compares two objects by converting to a JSON string. @returns {boolean} */
export function compareJSON(a, b) { return JSON.stringify(a) == JSON.stringify(b); }

/** Returns a new timetable with complete details (a.k.a. "fields") added to the
 * periods of the given timetable.
 * @param {*} json A timetable which contains only Course ID and Section. */
export function getTimetableFull(json) {
    const timetable = [];

    for (const day of json) {
        const day_detailed = [];
        for (const period of day) {
            /** @type {string} */ const course = period["course"];
            /** @type {string} */ const section = period["section"];

            const course_details = Constants.COURSES[course] || Constants.EMPTY_COURSE;
            const section_details = (Constants.SECTIONS[course] || Constants.EMPTY_COURSE_SECTION)[section] || Constants.EMPTY_SECTION;

            day_detailed.push({
                "course": course,
                "title": course_details["title"],
                "title_short": course_details["title_short"],
                "IC": course_details["IC"],

                "section": section,
                "instructor": section_details["instructor"],
                "room": section_details["room"],
                "section_room": `${section} - ${section_details["room"]}`
            })
        }
        timetable.push(day_detailed);
    }

    return timetable;
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
export function parseDays(daysString) {
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
export function compileTimetable(courses) {
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
