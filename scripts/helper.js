"use strict";
import * as Constants from './constants.js';
import * as DOM from './constants_dom.js';
import * as Storage from './storage.js';

//=| DeferredPromise |========================================================//
/** A promise which can be resolved or rejected manually. */
export class DeferredPromise {
    constructor() {
        /** The Promise, which awaits for a resolve or reject signal.
         * @type {Promise} */
        this.promise = new Promise((resolve, reject) => {
            /** Call this function to send a reject signal. */
            this.reject = reject;
            /** Call this function to send a resolve signal. */
            this.resolve = resolve;
        });
    }
}

//=| Period helper functions |================================================//

/** @param {Constants.Period} a @param {Constants.Period} b @returns {boolean} */
export function arePeriodsEqual(a, b) {
    const a_ent = Object.entries(a), b_ent = Object.entries(b);
    if (a_ent.length != b_ent.length) {return false;}
    for (const [key, value] of a_ent) {
        if (value != b[key]) {return false;}
    }
    return true;
};
/** @param {Constants.Period} period @returns {boolean} */
export const isPeriodFree = (period) => period.course.trim() == "";
/** @param {Constants.Period} period @returns {boolean} */
export const isPeriodNonCommon = (period) => period.course == "NON_COMMON";
/** @param {Constants.Period} period @returns {boolean} */
export const isPeriodConflict = (period) => period.course == "CONFLICT";
/** @param {Constants.Period} period @returns {boolean} */
export const isPeriodIndeterminate = (period) => period.course == "INDETERMINATE";

//=| General helper functions |===============================================//

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

/** Merges `section_number` and `room` with a hyphen in between. Hyphen is
 * removed if either or both are blank.
 * @param {string} section_number The section number.
 * @param {string} room The room number.
 */
function getSectionRoom(section_number, room) {
    return [section_number, room].filter((entry) => entry).join(" - ");
}

/** Parses a "days" string.
 * @param {string} daysString A "days" string, example: `"M2 W3 Th5 F12"`
 * @returns {[number, number][]} An array of [day, hour] pairs.
 * @example
 * <caption>Example for return value:</caption>
 * [ [0, 2], [2, 3], [3, 5], [4, 1], [4, 2] ]
 */
function parseDays(daysString) {
    /** @type {[number, number][]} */
    const parsed = [];

    daysString.split(" ").forEach(dayString => {
        const splitPoint = dayString.search(/\d/);
        const day = Constants.DAYS_SHORT.indexOf(dayString.substring(0, splitPoint));
        if (day < 0) return;
        const periodsString = dayString.substring(splitPoint);

        /** @type {Set<number>} */
        for (const period of periodsString)
            parsed.push([day, parseInt(period)]);
    });

    return parsed;
}

/** Creates a HTMLElement with content and class names added to it.
 * @param {string} tagName Tag name, such as div, p, span, etc.
 * @param {string[]} classList A string array of class names.
 * @param {(string | Node)[]} content A list of nodes and/or strings to add.
 * Note that `element.append` parses any strings as text, so no escaping is
 * required.
 * @returns {HTMLElement}
 */
export function createElement(tagName, classList, ...content) {
    /** @type {HTMLElement} */
    const elem = document.createElement(tagName);
    if (content && content.length > 0) {elem.append(...content);}
    if (classList && classList.length > 0) {elem.classList.add(...classList);}
    return elem;
}

//=| Timetable builder functions |============================================//

/** Returns the sections in the given course that match the given section name.
 * @param {Constants.Course} course The course object to search
 * @param {string} sectionName The section name to match, e.g. "L1"
 * @returns {Constants.Section[]} An array of Section objects
 */
function getSections(course, sectionName) {
    return course.sections.filter((sec) => (sec.section_name == sectionName))
}

/** Compiles a weekly timetable object with complete details (a.k.a. "fields")
 * from the given list of courses and sections enrolled by the student.
 * @param {Constants.Student} student An object containing courses mapped to the
 * sections enrolled by the student.
 * "keys" are course IDs and whose "values" are arrays containing section names.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @returns {Constants.Timetable} A minimal timetable constructed from
 * given student.
 * @example
 * <caption>Example for `student`:</caption>
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
export function getTimetable(student, semIndex) {
    /** @type {Constants.Timetable} */
    const timetable = [];
    const semester = Constants.SEMESTERS[semIndex] || {};

    // Preparing a template
    for (let i = 0; i < 5; i++) {
        /** @type {Constants.Day} */
        const day = [];

        // The 9,9,9,9,5 denotes the number of periods per day
        for (let j = [9,9,9,9,5][i] - 1; j >= 0; j--)
            day.push({course: "", section: ""});
        timetable.push(day);
    }

    // NOTE: With the change that there can be multiple entries for the same
    // `sectionName`, hence `sectionName` can no longer be used as a key. So, we
    // collect the list of all Section objects into an array, and then populate
    // the detailed timetable using it.

    // for each course:
    for (const [courseId, sectionNames] of Object.entries(student)) {
        if (!semester[courseId]) {continue;}
        const course = semester[courseId];

        /** The sections this student is in. @type {Constants.Section[]} */
        const sections = [];
        sectionNames.forEach((sectionName) => {
            sections.push(...getSections(course, sectionName));
        });

        // for each section:
        sections.forEach((section) => {

            // for each period:
            parseDays(section.days).forEach((entry) => {
                const [day, hour] = entry;

                const period = timetable[day][hour - 1];
                if (period.course != "") {
                    // this period is a conflict, so skip it.
                    timetable[day][hour - 1] = Constants.GET_PERIOD_CONFLICT();
                    return; // "continue" to next period
                }
                period.course = courseId;
                period.title = course.title  || "";
                period.title_short = course.title_short  || "";
                period.IC = course.IC || "";

                period.section = section.section_name;
                period.instructor = section.instructor || "";
                period.room = section.room || "";
                period.section_room = getSectionRoom(section.section_name, section.room);
            });

        });
    }

    return timetable;
}

//=| Timetable render functions |=============================================//

/** Creates a `DocumentFragment` containing header rows.
 * @returns {DocumentFragment} */
function createHeaderRow() {
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");
    const blank = createElement("th", [DOM.CSS_BLANK]);
    blank.rowSpan = 2; blank.colSpan = 2;
    row1.append(blank);

    for (let i = 0; i < 9; i++) {
        row1.append(createElement("th", [DOM.CSS_HEADING_PERIOD_NUM], i+1));

        const time_start = (Constants.PERIOD_START
            + Constants.PERIOD_DURATION * i
            + Constants.PERIOD_BREAK * i);
        const time_end = time_start + Constants.PERIOD_DURATION;

        row2.append(createElement("td", [DOM.CSS_HEADING_PERIOD_TIME],
            `${formatTime(time_start)} - ${formatTime(time_end)}`));
    }

    const df = document.createDocumentFragment();
    df.append(row1, row2);
    return df;
}

/** Displays the given timetable.
 * @param {Constants.Timetable} timetable Timetable object as returned by
 * {@link getTimetable}.
 * @param {string[]} fields A string array of field names to display.
 * @param {string} title The title to display above the timetable. Newlines are
 * retained as-is.
 * @param {HTMLTableElement} renderTarget The table element where the actual
 * render takes place.
 * @param {HTMLHeadingElement} titleRenderTarget The heading element where the
 * title is set.
 */
export function displayTimetable(timetable, fields, title, renderTarget, titleRenderTarget) {
    // const defaultRenderTarget = e(DOM.DOM_TIMETABLE);
    // if (!renderTarget) {renderTarget = defaultRenderTarget;}
    if (!timetable) {return;}
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (!fieldsFiltered) {return;}

    const df = document.createDocumentFragment();
    df.append(createHeaderRow());

    // For each day...
    for (let i_day = 0; i_day < timetable.length; i_day++) {
        /** An array of periods in the current day. */
        const day = timetable[i_day];
        const row = createElement("tr", [],
            createElement("th", [DOM.CSS_DAY_NAME], Constants.DAYS[i_day]),
            createElement("td", [DOM.CSS_DAY_FIELDS], ...fieldsFiltered.map((f) =>
                createElement("p", [], Constants.FIELDS_NAMES[f]))
            ),
        );

        // For each period in the current day...
        for (let i_period = 0; i_period < day.length; i_period++) {
            const period = day[i_period];
            const isFree = isPeriodFree(period);
            const isNonCommon = isPeriodNonCommon(period);
            const isConflict = isPeriodConflict(period);
            const isIndeterminate = isPeriodIndeterminate(period);

            // If current period is same as previous, extend the previous cell,
            // i.e. block periods.
            if (i_period > 0
                && !isFree && !isNonCommon && !isConflict && !isIndeterminate
                && arePeriodsEqual(period, day[i_period - 1])) {
                row.lastChild.colSpan++;
                continue;
            }

            /** Table cell that represents a single period. */
            const cell_period = createElement("td", [DOM.CSS_PERIOD]);

            if (isFree) {
                cell_period.classList.add(DOM.CSS_PERIOD_FREE);
                cell_period.innerHTML = DOM.CONTENTS_PERIOD_FREE;
            } else if (isNonCommon) {
                cell_period.classList.add(DOM.CSS_PERIOD_NONCOMMON);
                cell_period.innerHTML = DOM.CONTENTS_PERIOD_NONCOMMON;
            } else if (isConflict) {
                cell_period.classList.add(DOM.CSS_PERIOD_CONFLICT);
                cell_period.textContent = DOM.CONTENTS_PERIOD_CONFLICT;
            } else if (isIndeterminate) {
                cell_period.classList.add(DOM.CSS_PERIOD_INDETERMINATE);
                cell_period.textContent = DOM.CONTENTS_PERIOD_INDETERMINATE;
            } else {
                cell_period.append(...fieldsFiltered.map((field) =>
                    createElement("p", [], period[field]))
                );
            }

            row.append(cell_period);
        }
        df.append(row);
    }


    if (titleRenderTarget) {
        titleRenderTarget.textContent = (title || "");
    }
    renderTarget.replaceChildren(df);
    fitContainerByZoom(renderTarget.parentElement);
}

/** Displays the timetable given by the student name.
 * @param {string} timetableKey The key of the timetable.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 * @param {HTMLTableElement} renderTarget The table element where the actual
 * render takes place.
 * @param {HTMLHeadingElement} titleRenderTarget The heading element where the
 * title is set.
 */
export function displayTimetableKey(timetableKey, semIndex, fields, renderTarget, titleRenderTarget) {
    return displayTimetable(
        getTimetable(
            Storage.ttGet(semIndex, timetableKey),
            semIndex),
        fields,
        `${timetableKey}'s timetable`,
        renderTarget,
        titleRenderTarget,
    );
}

/** Scales the given container by setting its CSS `zoom` value. Note that this
 * requires a parent whose width is independent of this container's width.
 * @param {HTMLElement} container The container which will be scaled.
 */
export function fitContainerByZoom(container) {
    // container = container || e(DOM.DOM_TIMETABLE_CONTAINER);
    container.style.zoom = 1;
    const w = container.scrollWidth, h = container.scrollHeight;

    const wBound = document.body.clientWidth - 10;
    const hBound = Math.min(document.body.scrollHeight, window.innerHeight - 20);

    const factor = Math.min(1, Math.min(wBound / w, hBound / h));
    container.style.zoom = factor;
}
