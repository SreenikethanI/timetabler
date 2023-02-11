"use strict";
import * as Constants from './constants.js';
import * as Helper from './helper.js';
import * as DOM from './constants_dom.js'
import * as Storage from './storage.js'

const FIELDS_TO_SHOW = ["course", "title_short", "section_room", "instructor"];

//=| DOM related |============================================================//

/** Shorthand method for document.getElementById.
 * @param {string} id */
const e = (id) => document.getElementById(id);

//=| Helper methods - user input |============================================//

/** Gets whether compare mode is enabled by the user.
 * @returns {boolean} */
function getIsCompareMode() { return e(DOM.DOM_COMPARE_MODE).checked; }

/** Returns currently selected semester index.
 * @returns {number} */
function getSemIndex() {
    // TODO: This should be later derived from the actual value of the dropdown.
    return 1;
}

/** Returns a string Array containing the timetable names selected by the user.
 * @param {boolean} isCompareMode If `true`, only the first user choice will be
 * returned.
 * @returns {string[]} */
function getSelections(isCompareMode) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM.DOM_LIST);
    /** @type {string[]} */ const sels = [];

    for (const option of list.querySelectorAll('label > input')) {
        if (option.checked) { sels.push(option.value); }
        if (!isCompareMode && sels.length > 0) { break; }
    }
    return sels;
}

//=| Helper methods - timetable rendering |===================================//

/** Creates a `DocumentFragment` containing header rows.
 * @returns {DocumentFragment} */
function createHeaderRow() {
    const row1 = document.createElement("tr");
    const blank = document.createElement("th");
    blank.rowSpan = 2; blank.colSpan = 2; blank.classList.add(DOM.CSS_BLANK);
    row1.append(blank);

    const row2 = document.createElement("tr");

    for (let i = 0; i < 9; i++) {
        const cell_row1 = document.createElement("th");
        cell_row1.classList.add(DOM.CSS_HEADING_PERIOD_NUM);
        cell_row1.innerText = i + 1;
        row1.append(cell_row1);

        const time_start = (Constants.PERIOD_START
            + Constants.PERIOD_DURATION * i
            + Constants.PERIOD_BREAK * i);
        const time_end = time_start + Constants.PERIOD_DURATION;

        const cell_row2 = document.createElement("td");
        cell_row2.classList.add(DOM.CSS_HEADING_PERIOD_TIME);
        cell_row2.innerText = `${Helper.formatTime(time_start)} - ${Helper.formatTime(time_end)}`;
        row2.append(cell_row2);
    }

    const df = document.createDocumentFragment();
    df.append(row1); df.append(row2);
    return df;
}

/** For use by `displayTimetable`. Creates a table cell for day of week.
 * @param {number} day_number 0=Monday, 1=Tuesday, ...
 * @returns {HTMLTableCellElement} */
function createCellDay(day_number) {
    const cell_day = document.createElement("th");
    cell_day.classList.add(DOM.CSS_DAY_NAME);
    cell_day.innerText = Constants.DAYS[day_number];
    return cell_day;
}

/** For use by `displayTimetable`. Creates a table cell for field names.
 * @param {string[]} fields The fields to show.
 * @returns {HTMLTableCellElement} */
function createCellFields(fields) {
    const cell_fields = document.createElement("td");
    cell_fields.classList.add(DOM.CSS_DAY_FIELDS);
    cell_fields.append(...fields.map((x) => {
        const p = document.createElement("p");
        p.innerText = Constants.FIELDS_NAMES[x];
        return p;
    }));
    return cell_fields;
}

//=| Timetable list methods |=================================================//

/** Builds the list of available timetables, as per `Constants.FRIENDS`.
 * If user has selected "Compare timetables", then all choices will have
 * checkboxes rather than radio buttons.
 * Note that, if not in compare mode and `preserveSelections` is `true`, only
 * the first selection will be retained, and all choices will become radio buttons.
 * @param {number} semIndex The index of the semester in `Constants.COURSES`.
 * @param {boolean} preserveSelection `true` if the current user selection(s) are to be
 * preserved, else `false`.*/
function loadTimetablesListOld(semIndex, preserveSelection) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM.DOM_LIST);
    const isCompareMode = getIsCompareMode();
    const previousSels = preserveSelection ? getSelections(isCompareMode) : [];

    // Create document fragment and a fieldset legend (its text depends on
    // the current mode)
    const listDf = document.createDocumentFragment();
    const legend = document.createElement("legend");
    legend.innerText = isCompareMode ? DOM.LEGEND_COMPARE : DOM.LEGEND_DISPLAY;
    listDf.append(legend);

    /** Used later to focus the first option.
     * @type {HTMLInputElement} */
    var firstOption = null;

    var index = 1;
    for (const key in Constants.FRIENDS[semIndex]) {
        // Create label and radio elements
        const label = document.createElement("label");
        const option = document.createElement("input");
        option.type = isCompareMode ? "checkbox" : "radio";
        option.name = DOM.DOM_LIST_OPTIONS;
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
    if (!isCompareMode && previousSels.length == 0 && firstOption) {
        // Focus first option if nothing was selected previously
        firstOption.checked = true;
        firstOption.focus();
    }

    handleSelectionChange();
}

/** Builds the list of available timetables, as per `Constants.FRIENDS`.
 * If user has selected "Compare timetables", then all choices will have
 * checkboxes rather than radio buttons.
 * Note that, if not in compare mode and `preserveSelections` is `true`, only
 * the first selection will be retained, and all choices will become radio buttons.
 * @param {number} semIndex The index of the semester in `Constants.COURSES`.
 * @param {boolean} preserveSelection `true` if the current user selection(s) are to be
 * preserved, else `false`.*/
function loadTimetablesList(semIndex, preserveSelection) {

}

/** Renders whenever a selection is made or if comparison mode is changed. */
function handleSelectionChange() {
    const sels = getSelections(getIsCompareMode());
    const semIndex = getSemIndex();

    if (sels.length == 0) { // No selection made
        e(DOM.DOM_TIMETABLE).replaceChildren(); // Clears all child elements
    } else if (!getIsCompareMode()) { // Display mode
        displayTimetableKey( sels[0], semIndex, FIELDS_TO_SHOW );
    } else { // Compare mode
        compareTimetables( sels, semIndex, FIELDS_TO_SHOW );
    }
}

//=| Timetable display/compare methods |======================================//

/** Displays the given timetable.
 * @param {Constants.TimetableDetailed} timetable Timetable object as returned by `getTimetableFull`.
 * @param {string[]} fieldsFiltered A string array of field names to display. */
function displayTimetable(timetable, fields) {
    if (!timetable) {return;}
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (!fieldsFiltered) {return;}

    const df = document.createDocumentFragment();
    df.append(createHeaderRow());

    // For each day...
    for (let i_day = 0; i_day < timetable.length; i_day++) {
        /** An array of periods in the current day. */
        const day = timetable[i_day];
        const row = document.createElement("tr");
        row.append(createCellDay(i_day), createCellFields(fieldsFiltered));

        // For each period in the current day...
        for (let i_period = 0; i_period < day.length; i_period++) {
            const period = day[i_period];
            const isFree = Helper.isPeriodFree(period);
            const isNonCommon = Helper.isPeriodNonCommon(period);
            const isConflict = Helper.isPeriodConflict(period);

            // If current period is same as previous, extend the previous cell,
            // i.e. block periods.
            if (i_period > 0
                && !isFree && !isNonCommon && !isConflict
                && Helper.arePeriodsEqual(period, day[i_period - 1])) {
                row.lastChild.colSpan++;
                continue;
            }

            /** Table cell that represents a single period. */
            const cell_period = document.createElement("td");
            cell_period.classList.add(DOM.CSS_PERIOD);

            if (isFree) {
                cell_period.classList.add(DOM.CSS_PERIOD_FREE);
                cell_period.innerHTML = DOM.CONTENTS_PERIOD_FREE;
            } else if (isNonCommon) {
                cell_period.classList.add(DOM.CSS_PERIOD_NONCOMMON);
                cell_period.innerHTML = DOM.CONTENTS_PERIOD_NONCOMMON;
            } else if (isConflict) {
                cell_period.classList.add(DOM.CSS_PERIOD_CONFLICT);
                cell_period.textContent = DOM.CONTENTS_PERIOD_CONFLICT;
            } else {
                cell_period.append(...fieldsFiltered.map((field) => {
                    const p = document.createElement("p");
                    p.innerText = period[field];
                    return p;
                }));
            }

            row.append(cell_period);
        }
        df.append(row);
    }

    e(DOM.DOM_TIMETABLE).replaceChildren(df);
}

/** Displays the timetable given by the student name.
 * @param {string} timetableKey The key of the timetable. Refer to `Constants.FRIENDS`.
 * @param {number} semIndex The index of the semester in `Constants.COURSES`.
 * @param {string[]} fields The fields to display. Refer to `Constants.FIELDS`. */
function displayTimetableKey(timetableKey, semIndex, fields) {
    return displayTimetable(
        Helper.getTimetableDetailedFromStudent(
            Constants.FRIENDS[semIndex][timetableKey],
            semIndex),
        fields
    );
}

/** Compares two or more timetables, and displays the common periods.
 * @param {string[]} timetableKeys The keys of the timetables to compare. Refer to `Constants.FRIENDS`.
 * @param {number} semIndex The index of the semester in `Constants.COURSES`.
 * @param {string[]} fields The fields to display. Refer to `Constants.FIELDS`. */
function compareTimetables(timetableKeys, semIndex, fields) {
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (fieldsFiltered.length == 0) {return;}

    const timetables = (timetableKeys
        .map((key) => Constants.FRIENDS[semIndex][key])
        .filter((tt) => tt)
        .map((tt) => Helper.getTimetableDetailedFromStudent(tt, semIndex))
    );
    if (timetables.length == 0) {return;}

    /** @type {Constants.TimetableDetailed} */
    const commonTimetable = [];

    // Build a common timetable with 4 types of periods: common busy period,
    // common free period, non-common period, and indeterminate period.

    // For each day...
    for (let i_day = 0; i_day < timetables[0].length; i_day++) {
        const period_count = timetables[0][i_day].length;
        /** @type {Constants.DayDetailed} */
        const day = [];

        // For each period in the current day...
        for (let i_period = 0; i_period < period_count; i_period++) {
            // /** Stores whether the current period is common to all the selected
            //  * timetables or not.
            //  * @type {boolean} */
            // let isCommon = true;
            // /** Stores whether it is indeterminate whether the current period is
            //  * a conflict. In other words, at a given period, if two timetables
            //  * have a busy period each, but one of them is conflict, then it
            //  * won't be possible to *meaningfully compare* these two timetables.
            //  *
            //  * Setting this to `true` implies that the comparison is
            //  * meaningless, as described above.
            //  * @type {boolean}
            //  */
            // let isConflict = false;

            /** Temporary variable for holding the current period. It is initialized
             * to the current period in the *first timetable*. The current period
             * in the remaining timetables will be compared with this one, and
             * `isCommon` will be updated accordingly.*/
            let period_result = timetables[0][i_day][i_period];

            // Note that i_tt starts at 1 (not 0) and ends at length-1.
            for (let i_tt = 1; i_tt < timetables.length; i_tt++) {
                const period_tt = timetables[i_tt][i_day][i_period];

                if (Helper.arePeriodsEqual(period_tt, period_result)) {
                    continue;
                } else if (Helper) { // TODO

                }
                period_result = Constants.GET_PERIOD_NON_COMMON();
                break;
            }
            day.push(period_result);
        }

        commonTimetable.push(day);
    }

    // Finally call the `displayTimetable` function to actually handle displaying
    // the timetable to the user.
    displayTimetable(commonTimetable, fields);
}

//=| General |================================================================//

function init() {
    // Since this is a module, event handlers can't be attached in the HTML
    // file itself. Hence, event listeners are attached here:

    // e(DOM.DOM_THEME_TOGGLE).addEventListener("click", toggleTheme, false);
    e(DOM.DOM_PRINT_BUTTON).addEventListener("click", () => window.print(), false);
    e(DOM.DOM_CHECK_COMPARE_MODE).addEventListener("input", () => loadTimetablesListOld(getSemIndex(), true), false);

    loadTimetablesListOld(getSemIndex(), false);
    handleSelectionChange();
    removeLoading();
}

function toggleTheme() {
    const link = e("darkThemeCSS");
    link.disabled = !link.disabled;
}

function removeLoading() {
    e(DOM.DOM_LOADING).classList.add(DOM.CSS_COMPLETE);
}

//=| DOM Event handlers |=====================================================//

// See explanation in `init`.
window.addEventListener("load", init, false);

//=| Testing |================================================================//

// const semIndex = 1;
// const friend_name = "Sreeni";
// const ttMinimal = Helper.getTimetableMinimal(Constants.FRIENDS[semIndex][friend_name], semIndex);
// console.log(ttMinimal);
// displayTimetable(Helper.getTimetableDetailed(ttMinimal, semIndex), FIELDS_TO_SHOW);
