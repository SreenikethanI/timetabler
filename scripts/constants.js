"use strict";

/*
=== Some terminology ===
The following are constant pre-determined data, given by the university:
 • A `Semester` object consists of multiple `Course`s.
 • A `Course`   object consists of some properties and an array of `Section`s.
//  • A `Sections` object consists of multiple `Section`s.
 • A `Section`  object consists of many properties.

The following are real-life data which can change depending on person:
 • A `Students` object consists of student names mapped to a `Student` each.
 • A `Student`  object consists of course IDs mapped to arrays of section numbers
                to which they're enrolled into.

The following are timetable information derived/constructed from each `Student`:
 • A `Timetable` object is an array of `Day`.
 • A `Day`       object is an array of `Period`.
 • A `Period`    object consists of all relevant info for ONE period.
*/

/** @typedef {{course:string, title:string, title_short:string, IC:string, section:string, instructor:string, room:string, section_room:string}} Period */
/** @typedef {Period[]} Day */
/** @typedef {Day[]} Timetable */

/** @typedef {{section_name:string, room:string, instructor:string, days:string}} Section */
/** @typedef {{title:string, title_short:string, IC:string, sections:Section[]}} Course */
/** @typedef {Object.<string, Course>} Semester */

/** @typedef {Object.<string, string[]>} Student */
/** @typedef {Object.<string, Student>} Students */

/** List of fields for a period. */
export const FIELDS = ["course", "title", "title_short", "IC", "section", "instructor", "room", "section_room"];
/** Human-friendly names of fields for a period. */
export const FIELDS_NAMES = {course:"Code",title:"Title",title_short:"Title",IC:"IC",section:"Section",instructor:"Instructor",room:"Room",section_room:"Sec/Room"};
/** List of days. */
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
/** List of days in short form, as given in the Coursewise Timetable. */
export const DAYS_SHORT = ["M", "T", "W", "Th", "F"];

/** Start time of a period, i.e. 7:30 AM. Represented as number of minutes from 12 AM. */
export const PERIOD_START = 7*60 + 30;
/** Duration of a period, in minutes. */
export const PERIOD_DURATION = 50;
/** Duration of break between two periods, in minutes. */
export const PERIOD_BREAK = 5;

//=| Template objects |=======================================================//

/** @returns {Section} */
export const GET_SECTION_BLANK = () => ({section_name: "", room: "", instructor: "", days: ""});
/** @returns {Course} */
export const GET_COURSE_BLANK = () => ({title: "", title_short: "", IC: "", sections: []});

/** @returns {Period} */
export const GET_PERIOD_FREE = () => ({course: "", section: ""});
/** @returns {Period} */
export const GET_PERIOD_NON_COMMON = () => ({course: "NON_COMMON", section: ""});
/** @returns {Period} */
export const GET_PERIOD_CONFLICT = () => ({course: "CONFLICT", section: ""});
/** @returns {Period} */
export const GET_PERIOD_INDETERMINATE = () => ({course: "INDETERMINATE", section: ""});

//=| JSON load function |=====================================================//

/** Load JSON from path.
 * @param {string} path
 * @returns {Promise<Semester>}
 */
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

//=| Promises |===============================================================//

const SEMESTERS_PROMISES = [
    loadJSON("coursewise timetables\\0 - 2022-09 Sem1 (Year 1 only).json"),
    loadJSON("coursewise timetables\\1 - 2023-02 Sem2 (Year 1 only).json"),
    loadJSON("coursewise timetables\\2 - 2023-09 Sem1 (v2).json"),
    loadJSON("coursewise timetables\\3 - 2024-02 Sem2 (v3).json"),
];

//=| Friends |================================================================//

/** @type {Students} Friends' timetables under Year 1 Semester 1 */
const FRIENDS_Y1S1 = {
};

/** @type {Students} Friends' timetables under Year 1 Semester 2 */
const FRIENDS_Y1S2 = {
    // For testing purpose, the following courses have the same days/hours
    // for all of the sections:
    //  • BITS F111: L1, L2, L3
    //  • CHEM F111: L1, L2, L3
    //  • BITS F112: L1, L2
    //  • EEE F111: L1, L2
    //  • MATH F112: L1, L2, L3, L4, L5
    //  • PHY F111: L1, L2, L3

    // The following courses have *some* same days/hours for *some* of the sections:
    //  • CS F111: L1, L2
    //  • MATH F113: L1, L3

    "Test for conflict":  {"CS F111": ["L1", "L2"]},
};

/** @type {Students} Friends' timetables under Year 2 Semester 1 */
const FRIENDS_Y2S1 = {
    "Test": {
        "CS F214": ["L1"],
        "CS F215": ["L1", "P1"],
        "CS F222": ["L1"],
        "CS F213": ["L3", "P1"],
        "MGTS F211": ["L3"],
        "HSS F211": ["L1"],
    },
};

/** @type {Students} Friends' timetables under Year 2 Semester 2 */
const FRIENDS_Y2S2 = {
    "Test": {
        "CHE F341": ["P1"],
        "BIOT F244": ["P2"]
    }
};

//=| Collections of all semesters |===========================================//

/** @type {Semester[]} List of courses under all semesters. */
export const SEMESTERS = [];
for (let i = 0; i < SEMESTERS_PROMISES.length; i++) {
    const semester = await SEMESTERS_PROMISES[i];

    // If short_title is empty, replace it with title.
    for (const courseID in semester) {
        if (Object.hasOwnProperty.call(semester, courseID)) {
            const course = semester[courseID];
            if (!course.title_short) {
                course.title_short = course.title;
            }
        }
    }

    SEMESTERS.push(semester);
}

/** @type {Students[]} List of friends' timetables under all semesters. */
export const FRIENDS = [
    FRIENDS_Y1S1,
    FRIENDS_Y1S2,
    FRIENDS_Y2S1,
    FRIENDS_Y2S2,
];
// export const FRIENDS = await loadJSON("testing\\friends.json");
