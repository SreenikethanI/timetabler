"use strict";
import * as Constants from './constants.js';

//=| General helper functions |===============================================//

/** Compares two objects by converting to a JSON string. @returns {boolean} */
export function compareJSON(a, b) { return JSON.stringify(a) == JSON.stringify(b); }

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

/** Parses a "days" string.
 * @param {string} daysString A "days" string, example: `"M2 W3 Th5 F12"`
 * @returns {Map<number,Set<number>>} A map containing day number (0 = Monday)
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
function parseDays(daysString) {
    /** @type {Map<number,Set<number>>} */
    const parsed = new Map();

    daysString.split(" ").forEach(dayString => {
        const splitPoint = dayString.search(/\d/);
        const day = Constants.DAYS_SHORT.indexOf(dayString.substring(0, splitPoint));
        if (day < 0) return;
        const periodsString = dayString.substring(splitPoint);

        /** @type {Set<number>} */
        const periods = new Set();
        for (const period of periodsString)
            periods.add(parseInt(period));

        parsed.set(day, periods);
    });

    return parsed;
}

/** Merges section_number and room with a hyphen in between. Hyphen is removed
 * if either or both are blank.
 */
function getSectionRoom(section_number, room) {
    return [section_number, room].filter((entry) => entry).join(" - ");
}

//=| Timetable builder functions |============================================//

/** Compiles a weekly timetable object containing Course ID and Section from
 * the given list of courses and sections enrolled by the student.
 * @param {Constants.Student} student An object containing courses mapped to the sections enrolled by the student.
 * "keys" are course IDs and whose "values" are arrays containing section names.
 * @param {number} sem_index The index of the semester in `Constants.COURSES`.
 * @returns {Constants.TimetableMinimal} A minimal timetable constructed from given st.
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
export function getTimetableMinimal(student, sem_index) {
    /** @type {Constants.TimetableMinimal} */
    const timetable_minimal = [];
    const semester_courses = Constants.SEMESTERS[sem_index];

    // Preparing a template
    for (let i = 0; i < 5; i++) {
        /** @type {Constants.DayMinimal} */
        const day = [];

        // The 9,9,9,9,5 denotes the number of periods per day
        for (let j = [9,9,9,9,5][i] - 1; j >= 0; j--)
            day.push({course: "", section: ""});
        timetable_minimal.push(day);
    }

    for (const course_id in student) {
        const all_sections = semester_courses[course_id].sections;

        student[course_id].forEach((section_number) => {
            const section = all_sections[section_number] || Constants.GET_SECTION_BLANK();
            const days_list = parseDays(section.days);
            for (const [day, hours_list] of days_list.entries()) {

                hours_list.forEach((hour) => {

                    const period = timetable_minimal[day][hour - 1];
                    if (period.course != "") {
                        timetable_minimal[day][hour - 1] = Constants.PERIOD_CONFLICT;
                        return;
                    }
                    period.course = course_id;
                    period.section = section_number;

                });

            }
        });
    }

    return timetable_minimal;
}

/** Returns a new timetable with complete details (a.k.a. "fields") added to the
 * periods of the given timetable.
 * @param {Constants.TimetableMinimal} timetable_minimal A timetable which contains only Course ID and Section. */
export function getTimetableFull(timetable_minimal, sem_index) {
    /** @type {Constants.getTimetableFull} */
    const timetable_full = [];
    const semester = Constants.SEMESTERS[sem_index] || {};    

    for (const day of timetable_minimal) {
        /** @type {Constants.DayDetailed} */ const day_detailed = [];

        for (const period of day) {
            const course_id = period.course || "";
            const section_number = period.section || "";

            const course = semester[course_id] || Constants.GET_COURSE_BLANK();
            const section = course.sections[section_number] || Constants.GET_SECTION_BLANK();

            day_detailed.push({
                course:       course_id,
                title:        course.title || "",
                title_short:  course.title_short || "",
                IC:           course.IC || "",

                section:      section_number,
                instructor:   section.instructor || "",
                room:         section.room || "",
                section_room: getSectionRoom(section_number, section.room),
            });
        }
        timetable_full.push(day_detailed);
    }

    return timetable_full;
}
