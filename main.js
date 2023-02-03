import * as Constants from './constants.js';

const FIELDS_TO_SHOW = ["course", "title_short", "section_room"/*, "instructor"*/];

const TIMETABLES = {
    "034 - Sreenikethan Iyer": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "029 - Adithya Nandakumar": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "031 - Ritvik Bhatnagar": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "036 - Mohammed Emaan": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "077 - Adithya Sunoj": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"BIO F110","section":"P3"},{"course":"BIO F110","section":"P3"},{"course":"","section":""},{"course":"BITS F112","section":"L2"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F110","section":"P5"},{"course":"CHEM F110","section":"P5"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L2"}]],
    "050 - Aditya Agarwal": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"BIO F110","section":"P2"},{"course":"BIO F110","section":"P2"}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L2"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F110","section":"P5"},{"course":"CHEM F110","section":"P5"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L2"}]],
    "003 - Stellin John": [[{"course":"BIO F111","section":"L1"},{"course":"CS F111","section":"L1"},{"course":"BITS F110","section":"P1"},{"course":"BITS F110","section":"P1"},{"course":"MATH F111","section":"L1"},{"course":"CHEM F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L1"},{"course":"MATH F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F110","section":"L2"},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"","section":""},{"course":"","section":""}],[{"course":"","section":""},{"course":"CHEM F111","section":"L1"},{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L1"},{"course":"CS F111","section":"P2"},{"course":"CS F111","section":"P2"}],[{"course":"MATH F111","section":"L1"},{"course":"","section":""},{"course":"BIO F110","section":"P6"},{"course":"BIO F110","section":"P6"},{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"CHEM F110","section":"P6"},{"course":"CHEM F110","section":"P6"}],[{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"CHEM F111","section":"L1"},{"course":"BITS F112","section":"L1"}]],
    "321 - Karthik Narayan": [[{"course":"EEE F111","section":"L3"},{"course":"PHY F111","section":"L3"},{"course":"MATH F111","section":"L6"},{"course":"BITS F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"BITS F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"PHY F110","section":"P2"},{"course":"PHY F110","section":"P2"},{"course":"MATH F111","section":"L6"},{"course":"PHY F111","section":"L3"},{"course":"","section":""},{"course":"ME F112","section":"P3"},{"course":"ME F112","section":"P3"}],[{"course":"PHY F111","section":"L3"},{"course":"BITS F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L6"},{"course":"EEE F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L3"}],[{"course":"","section":""},{"course":"EEE F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"ME F112","section":"L3"},{"course":"MATH F111","section":"L6"},{"course":"PHY F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"EEE F111","section":"L3"},{"course":"BITS F111","section":"L3"}]],
    "298 - Lakesh Thangadurai": [[{"course":"EEE F111","section":"L2"},{"course":"PHY F111","section":"L2"},{"course":"MATH F111","section":"L5"},{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"PHY F110","section":"P2"},{"course":"PHY F110","section":"P2"},{"course":"MATH F111","section":"L5"},{"course":"PHY F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"}],[{"course":"PHY F111","section":"L2"},{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"},{"course":"EEE F111","section":"L2"},{"course":"","section":""},{"course":"ME F112","section":"L2"},{"course":"","section":""}],[{"course":"","section":""},{"course":"EEE F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L5"},{"course":"PHY F111","section":"L2"},{"course":"","section":""},{"course":"ME F112","section":"P7"},{"course":"ME F112","section":"P7"}],[{"course":"MATH F113","section":"L2"},{"course":"","section":""},{"course":"MATH F111","section":"L5"},{"course":"EEE F111","section":"L2"},{"course":"BITS F111","section":"L2"}]],
};

//=| DOM related |============================================================//

/** @param {string} id */
const e = (id) => document.getElementById(id);
const DOM_TIMETABLE = "timetable";
const DOM_LIST = "list";
const DOM_LIST_OPTIONS = "list_options";
const DOM_COMPARE_MODE = "check_compare_mode";
const LEGEND_DISPLAY = "Choose timetable to display:";
const LEGEND_COMPARE = "Select timetables to compare:";

//=| Timetable helper methods |===============================================//

/** Creates a `DocumentFragment` containing header rows.
 * @returns {DocumentFragment} */
function createHeaderRow() {
    const row1 = document.createElement("tr");
    const blank = document.createElement("th");
    blank.rowSpan = 2; blank.colSpan = 2; blank.classList.add("blank");
    row1.append(blank);

    const row2 = document.createElement("tr");

    for (let i = 0; i < 9; i++) {
        const cell_row1 = document.createElement("th");
        cell_row1.classList.add("heading-period-num");
        cell_row1.innerText = i + 1;
        row1.append(cell_row1);

        const time_start = (Constants.PERIOD_START
            + Constants.PERIOD_DURATION * i
            + Constants.PERIOD_BREAK * i);
        const time_end = time_start + Constants.PERIOD_DURATION;

        const cell_row2 = document.createElement("td");
        cell_row2.classList.add("heading-period-time");
        cell_row2.innerText = `${formatTime(time_start)} - ${formatTime(time_end)}`;
        row2.append(cell_row2);
    }

    const df = document.createDocumentFragment();
    df.append(row1); df.append(row2);
    return df;
}

/** Returns a new timetable with complete details (a.k.a. "fields") added to the
 * periods of the given timetable.
 * @param {*} json A timetable which contains only Course ID and Section. */
function getTimetableFull(json) {
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

/** Returns a string Array containing the timetable names selected by the user.
 * @param {boolean} isCompareMode If `true`, only the first user choice will be
 * returned.
 * @returns {string[]} */
function getSelections(isCompareMode) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM_LIST);
    const sels = [];

    for (const option of list.querySelectorAll('label > input')) {
        if (option.checked) { sels.push(option.value); }
        if (!isCompareMode && sels.length) { break; }
    }
    return sels;
}

/** Gets whether compare mode is enabled by the user. @returns {boolean} */
function getIsCompareMode() { return e(DOM_COMPARE_MODE).checked; }

//=| Timetable display/compare methods |======================================//

/** Displays the given timetable.
 * @param {object} timetable Timetable object as returned by `getTimetableFull`.
 * @param {string[]} fields A string array of field names to display. */
function displayTimetable(timetable, fields) {
    if (!timetable) {return;}
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (!fieldsFiltered) {return;}

    const df = document.createDocumentFragment();
    df.append(createHeaderRow());

    // For each day...
    for (let i_day = 0; i_day < timetable.length; i_day++) {
        /** An Array of periods in the current day. */
        const day = timetable[i_day];
        const row = document.createElement("tr");

        /** Table cell for showing the Day name. */
        const cell_day = document.createElement("th");
        cell_day.classList.add("day-name");
        cell_day.innerText = Constants.DAYS[i_day];

        /** Table cell for showing the field names (Course ID, room #, etc.) */
        const cell_fields = document.createElement("td");
        cell_fields.classList.add("day-fields");
        cell_fields.append(...fields.map((x) => {
            const p = document.createElement("p");
            p.innerText = Constants.FIELDS_NAMES[x];
            return p;
        }));

        row.append(cell_day, cell_fields);

        // For each period in the current day...
        for (let i_period = 0; i_period < day.length; i_period++) {
            const period = day[i_period];
            const isFree = !period["course"];
            const isNonCommon = compareJSON(period, Constants.PERIOD_NON_COMMON);

            // If current period is same as previous, extend the previous cell,
            // i.e. account for block periods.
            if (i_period > 0
                && !isFree && !isNonCommon
                && compareJSON(period, day[i_period - 1])) {
                row.lastChild.colSpan++;
                continue;
            }

            /** Table cell that represents a single period. */
            const cell_period = document.createElement("td");
            cell_period.classList.add("period");
            if (isFree) { // Free period
                cell_period.classList.add("period-free");
                cell_period.innerHTML = "&nbsp;";
            } else if (isNonCommon) { // Non-common period. Relevant when the
                // provided timetable is given by the `compareTimetables` function.
                cell_period.classList.add("period-noncommon");
                cell_period.innerHTML = "&times;";
            } else { // Normal busy period
                cell_period.append(...fields.map((field) => {
                    const p = document.createElement("p");
                    p.innerText = period[field];
                    return p;
                }));
            };
            row.append(cell_period);
        }
        df.append(row);
    }

    e(DOM_TIMETABLE).replaceChildren(df);
}

/** Displays the given timetable.
 * @param {*} timetableKey The key of the timetable. Refer to `TIMETABLES`.
 * @param {string[]} fields The fields to display. Refer to `Constants.FIELDS`. */
function displayTimetableKey(timetableKey, fields) {
    return displayTimetable(getTimetableFull(TIMETABLES[timetableKey]), fields);
}

/** Compares two or more timetables, and displays the common periods.
 * @param {string[]} timetableKeys The keys of the timetables to compare. Refer to `TIMETABLES`.
 * @param {string[]} fields The fields to display. Refer to `Constants.FIELDS`. */
function compareTimetables(timetableKeys, fields) {
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (!fieldsFiltered) {return;}
    const timetables = timetableKeys.map((key) => TIMETABLES[key]).filter((tt) => tt).map((tt) => getTimetableFull(tt));
    if (!timetables.length) {return;}

    const commonTimetable = [];

    // Build a common timetable with 3 types of periods: Busy period, Free period,
    // and Non-common period.

    // For each day...
    for (let i_day = 0; i_day < timetables[0].length; i_day++) {
        const period_count = timetables[0][i_day].length;
        const day = [];

        // For each period in the current day...
        for (let i_period = 0; i_period < period_count; i_period++) {
            /** Determines whether the current period is common to all the given
             * timetables or not. @type {boolean} */
            let isCommon = true;
            /** Temporary variable for holding the current period. It is initialized
             * to the current period in the *first timetable*. The current period
             * in the remaining timetables will be compared with this one, and
             * `isCommon` will be updated accordingly.*/
            const period = timetables[0][i_day][i_period];

            // Note that i_tt starts at 1 (not 0) and ends at length-1.
            for (let i_tt = 1; i_tt < timetables.length; i_tt++) {
                const tt = timetables[i_tt];
                const tt_period = tt[i_day][i_period];
                isCommon = compareJSON(tt_period, period);
                if (!isCommon) break;
            }
            day.push(isCommon ? period : Constants.PERIOD_NON_COMMON);
        }

        commonTimetable.push(day);
    }

    // Finally call the `displayTimetable` function to actually handle displaying
    // the timetable to the user.
    displayTimetable(commonTimetable, fields);
}

/** Rebuilds the list of available timetables, as per `TIMETABLES`.
 * If user has selected "Compare timetables", then all choices will have
 * checkboxes rather than radio buttons.
 * Note that, if not in compare mode and `preserveSelections` is `true`, only
 * the first selection will be retained, and all choices will become radio buttons.
 * @param {*} preserveSelection `true` if the current user selection(s) are to be
 * preserved, else `false`.*/
function refreshTimetablesList(preserveSelection) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM_LIST);
    const isCompareMode = getIsCompareMode();

    // Get previous selections
    const previousSels = preserveSelection ? getSelections(isCompareMode) : [];

    // Create document fragment and a fieldset legend (its text depends on
    // the current mode)
    const listDf = document.createDocumentFragment();
    const legend = document.createElement("legend");
    legend.innerText = isCompareMode ? LEGEND_COMPARE : LEGEND_DISPLAY;
    listDf.append(legend);

    var firstOption = null; // Used later to focus the first option
    var index = 1;
    for (const key in TIMETABLES) {
        // Create label and radio elements
        if (!Object.hasOwnProperty.call(TIMETABLES, key)) {continue;}
        const label = document.createElement("label");
        const option = document.createElement("input");
        option.type = isCompareMode ? "checkbox" : "radio";
        option.name = DOM_LIST_OPTIONS;
        option.value = key;
        option.checked = previousSels.includes(key);
        option.addEventListener("input", handleSelectionChange);
        label.append(option);

        // Add numbering for each option, with accessKey set as well
        const optionNumber = document.createElement("b");
        optionNumber.append(" ");
        if (index <= 10) {
            option.accessKey = index % 10;
            if (index <= 10) {
                const underlined = document.createElement("u");
                if (index == 10) optionNumber.append("1");
                underlined.append(index % 10);
                optionNumber.append(underlined, ".");
            }
        } else optionNumber.append(index, ".");
        label.append(optionNumber, ` ${key}`);

        // Append label (containing radio button) to document fragment
        listDf.append(label, document.createElement("br"));
        if (!firstOption) {firstOption = option;}
        index++;
    }

    list.replaceChildren(listDf);
    if (!isCompareMode && !previousSels.length && firstOption) {
        // Focus first option if nothing was selected previously
        firstOption.checked = true;
        firstOption.focus();
    }
}

function handleSelectionChange() {
    const sels = getSelections(getIsCompareMode());

    if (!sels.length) { // No selection made
        e(DOM_TIMETABLE).replaceChildren(); // Clears all child elements
    } else if (!getIsCompareMode()) { // Display mode
        displayTimetableKey( sels[0], FIELDS_TO_SHOW );
    } else { // Compare mode
        compareTimetables( sels, FIELDS_TO_SHOW );
    }
}

//=| General |================================================================//

/** Converts given minutes into h:mm format.
 * @param {number} minutes
 * @returns {string} */
function formatTime(minutes) {
    minutes = minutes % 1440;
    const h = Math.floor(minutes / 60);
    const m = Math.floor(minutes - h * 60);
    const h_12 = (h % 12) || 12; // if h%12 is 0, then it'll be taken as 12.
    const am_pm = h > 11 ? "pm" : "am";
    const m_str = (m < 10 ? '0' : '') + m;
    return `${h_12}:${m_str}${am_pm}`;
}

/** Compares two objects by converting to a JSON string. @returns {boolean} */
function compareJSON(a, b) { return JSON.stringify(a) == JSON.stringify(b); }

function init() {
    refreshTimetablesList(false);
    handleSelectionChange();
}

function toggleTheme() {
    const link = e("darkThemeCSS");
    link.disabled = !link.disabled;
}

//=| DOM Event handlers |=====================================================//

window.addEventListener("load", init, false);
e("check_compare_mode").addEventListener("input", refreshTimetablesList, false);
e("theme_toggle").addEventListener("click", toggleTheme, false);
