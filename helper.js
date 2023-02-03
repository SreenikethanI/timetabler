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
 * @param {string} daysString A "days" string, example: `"M2 W3 Th5 F12"`
 * @returns {Map<string,Set<number>>} A map containing day number (0 = Monday)
 * as key, and a Set of period numbers as value (1 = 1st period).
 * @example
 * <caption>Example for return value:</caption>
 * new Map([
 *     [ 0, new Set([2]) ],
 *     [ 2, new Set([3]) ],
 *     [ 3, new Set([5]) ],
 *     [ 4, new Set([1, 2]) ],
 * ])
 */
export function parseDays(daysString) {
    /** @type {Map<number,Set<number>>} */
    const parsed = new Map();

    daysString.split(" ").forEach(dayString => {
        const splitPoint = dayString.search(/\d/);
        const day = Constants.DAYS_SHORT.indexOf(dayString.substring(0, splitPoint));
        const periodsString = dayString.substring(splitPoint);

        /** @type {Set<number>} */
        const periods = new Set();
        for (const period of periodsString)
            periods.add(parseInt(period));

        parsed.set(day, periods);
    });

    return parsed;
}

/** Compiles a weekly timetable object containing Course ID and Section from
 * the given list of courses and sections enrolled by the student.
 * @param {Object.<string, string[]>} student_courses_sections An object whose
 * "keys" are course IDs and whose "values" are arrays containing section names.
 * @param {number} sem_index The index of the semester in `Constants.COURSES`.
 * @example
 * <caption>Example for `courses`:</caption>
 * {
 *     "BIO F110":  ["P1"],
 *     "BIO F111":  ["L2"],
 *     "BITS F110": ["L1", "P2"],
 *     "BITS F112": ["L1"],
 *     "CHEM F110": ["P4"],
 *     "CHEM F111": ["L2"],
 *     "CS F111":   ["L2", "P3"],
 *     "MATH F111": ["L2"],
 * }
 */
export function getTimetableMinimal(student_courses_sections, sem_index) {
    const timetable = [];
    const semester_courses = Constants.COURSES[sem_index];

    // Preparing a template
    for (let i = 0; i < 5; i++) {
        const day = [];
        // The 9,9,9,9,5 denotes the number of periods per day
        for (let j = [9,9,9,9,5][i] - 1; j >= 0; j--)
            day.push({"course": "", "section": ""});
        timetable.push(day);
    }

    for (const course_id in student_courses_sections) {
        const all_sections = semester_courses[course_id].sections;

        student_courses_sections[course_id].forEach((section) => {
            const days_list = parseDays(all_sections[section].days);
            for (const [day, hours_list] of days_list.entries()) {

                hours_list.forEach((hour) => {

                    const period = timetable[day][hour - 1];
                    if (period.course != "") {
                        timetable[day][hour - 1] = Constants.PERIOD_CONFLICT;
                        return;
                    }
                    period.course = course_id;
                    period.section = section;

                });

            }
        });
    }

    return timetable;
}
