"use strict";

/*
=== Some terminology ===
The following are constant pre-determined data, given by the university:
 • A `Semester` object consists of multiple `Course`s.
 • A `Course`   object consists of some properties, including a `Sections`.
 • A `Sections` object consists of multiple `Section`s.
 • A `Section`  object consists of many properties.

The following are real-life data which can change depending on person:
 • A `Students` object consists of student names mapped to a `Student` each.
 • A `Student`  object consists of course IDs mapped to arrays of section numbers
                to which they're enrolled into.

The following are timetable information derived/constructed from each `Student`:
 • A `TimetableMinimal` object is an array of `DayMinimal`.
 • A `DayMinimal`       object is an array of `PeriodMinimal`.
 • A `PeriodMinimal`    object consists of course ID and section of ONE period.

The following are the detailed equivalents of the corresponding minimal objects:
 • A `TimetableDetailed` object is an array of `DayDetailed`.
 • A `DayDetailed`       object is an array of `PeriodDetailed`.
 • A `PeriodDetailed`    object consists of all relevant info for ONE period.
*/

/** @typedef {{course: string, section: string}} PeriodMinimal */
/** @typedef {PeriodMinimal[]} DayMinimal */
/** @typedef {DayMinimal[]} TimetableMinimal */

/** @typedef {{course:string, title:string, title_short:string, IC:string, section:string, instructor:string, room:string, section_room:string}} PeriodDetailed */
/** @typedef {PeriodDetailed[]} DayDetailed */
/** @typedef {DayDetailed[]} TimetableDetailed */

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
export const GET_SECTION_BLANK = () => ({room: "", instructor: "", days: ""});
/** @returns {Course} */
export const GET_COURSE_BLANK = () => ({title:"",title_short:"",IC:"",sections:{}});
/** @returns {PeriodMinimal} */

export const GET_PERIOD_FREE = () => ({course: "", section: ""});
/** @returns {PeriodMinimal} */
export const GET_PERIOD_NON_COMMON = () => ({course: "NON_COMMON", section: ""});
/** @returns {PeriodMinimal} */
export const GET_PERIOD_CONFLICT = () => ({course: "CONFLICT", section: ""});
/** @returns {PeriodMinimal} */
export const GET_PERIOD_INDETERMINATE = () => ({course: "INDETERMINATE", section: ""});

//=| Courses |================================================================//

/** @typedef {{room:string, instructor:string, days:string}} Section */
/** @typedef {Object.<string, Section>} Sections */
/** @typedef {{title:string, title_short:string, IC:string, sections:Sections}} Course */
/** @typedef {Object.<string, Course>} Semester */

/** Load JSON from path.
 * @param {string} path
 * @returns {Promise<Semester>}
 */
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

const SEMESTERS_PROMISES = [
    loadJSON("coursewise timetables\\0 - Y1S1.json"),
    loadJSON("coursewise timetables\\1 - Y1S2 new.json"),
    loadJSON("coursewise timetables\\2 - 2023-09 S1 new.json"),
];

//=| Friends |================================================================//

/** @typedef {Object.<string, string[]>} Student */
/** @typedef {Object.<string, Student>} Students */

/** @type {Students} Friends' timetables under Year 1 Semester 1 */
const FRIENDS_Y1S1 = {
    "(003) Stellin": {"BIO F110":["P6"],"BIO F111":["L1"],"BITS F110":["L2","P1"],"BITS F112":["L1"],"CHEM F110":["P6"],"CHEM F111":["L1"],"CS F111":["L1","P2"],"MATH F111":["L1"]},
    "(031) Ritvik,\n(029) Adithya Nandakumar,\n(034) Sreeni,\n(036) Emaan": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "(050) Aditya Agarwal": {"BIO F110":["P2"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L2"],"CHEM F110":["P5"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "(077) Adithya Sunoj": {"BIO F110":["P3"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L2"],"CHEM F110":["P5"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "(298) Lakesh": {"BITS F111":["L2"],"EEE F111":["L2"],"MATH F111":["L5"],"MATH F113":["L2"],"ME F112":["L2","P7"],"PHY F110":["P2"],"PHY F111":["L2"]},
    "(321) Karthik": {"BITS F111":["L3"],"EEE F111":["L3"],"MATH F111":["L6"],"MATH F113":["L3"],"ME F112":["L3","P3"],"PHY F110":["P2"],"PHY F111":["L3"]},
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

    // "sample conflict 1":  {"CS F111": ["L1", "L2"]},
    // "sample conflict 2":  {},

    "(031) Ritvik,\n(029) Adithya Nandakumar,\n(032) Ryan": {"BITS F111": ["L1"], "EEE F111": ["L1"], "MATH F112": ["L4"], "MATH F113": ["L1"], "ME F112": ["L3","P2"], "PHY F110": ["P7"], "PHY F111": ["L1"]},
    "(034) Sreeni,\n(036) Emaan": {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L4"], "MATH F113": ["L3"], "ME F112": ["L2","P2"], "PHY F110": ["P8"], "PHY F111": ["L2"]},
    "(050) Aditya Agarwal": {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L6"], "MATH F113": ["L3"], "ME F112": ["L2","P2"], "PHY F110": ["P4"], "PHY F111": ["L2"]},
    "(079) Stephen,\n(077) Adithya Sunoj": {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L6"], "MATH F113": ["L3"], "ME F112": ["L2","P6"], "PHY F110": ["P5"], "PHY F111": ["L2"]},
    "(085) Haroon":  {"BITS F111": ["L3"], "EEE F111": ["L3"], "MATH F112": ["L5"], "MATH F113": ["L2"], "ME F112": ["L1","P5"], "PHY F110": ["P3"], "PHY F111": ["L3"]},
    "(110) Anish":   {"BITS F111": ["L3"], "EEE F111": ["L3"], "MATH F112": ["L5"], "MATH F113": ["L2"], "ME F112": ["L1","P1"], "PHY F110": ["P8"], "PHY F111": ["L3"]},

    "(025) Vignesh": {"BIO F110": ["P1"], "BIO F111": ["L3"], "BITS F110": ["L2","P2"], "BITS F112": ["L2"], "CHEM F110": ["P6"], "CHEM F111": ["L3"], "CS F111": ["L3","P3"], "MATH F112": ["L3"]},
    "(298) Lakesh":  {"BIO F110": ["P6"], "BIO F111": ["L2"], "BITS F110": ["L3","P3"], "BITS F112": ["L2"], "CHEM F110": ["P3"], "CHEM F111": ["L2"], "CS F111": ["L2","P2"], "MATH F112": ["L2"]},
    "(321) Karthik": {"BIO F110": ["P2"], "BIO F111": ["L2"], "BITS F110": ["L3","P3"], "BITS F112": ["L2"], "CHEM F110": ["P3"], "CHEM F111": ["L2"], "CS F111": ["L2","P2"], "MATH F112": ["L2"]},
};

/** @type {Students} Friends' timetables under Year 2 Semester 1 */
const FRIENDS_Y2S1 = {
}

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
];
