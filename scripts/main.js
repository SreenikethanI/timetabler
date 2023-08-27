"use strict";
import * as Constants from './constants.js';
import * as Helper from './helper.js';
import * as DOM from './constants_dom.js';
import * as Storage from './storage.js';
import * as Builder from './builder.js';

const FIELDS_TO_SHOW = ["course", "title_short", "section_room", "instructor"];
var initComplete = false;

//=| DOM related |============================================================//

/** Shorthand method for document.getElementById.
 * @param {string} id */
const e = (id) => document.getElementById(id);

//=| Helper methods - user input |============================================//

/** Gets whether compare mode is enabled by the user.
 * @returns {boolean} */
function getIsCompareMode() {
    const checked = e(DOM.DOM_COMPARE_MODE).checked;
    Storage.compareModeSet(checked);
    return checked;
}

/** Returns a string Array containing the timetable names selected by the user.
 * @returns {string[]}
 */
function getSelections() {
    /** @type {HTMLDivElement} */ const list = e(DOM.DOM_TIMETABLE_LIST);

    if (!initComplete) {
        // Load from storage //
        const fromStorage = Storage.selectionsGet(Storage.semIndexGet());
        for (const option of list.querySelectorAll('input')) {
            option.checked = fromStorage.includes(option.value);
        }
    }

    /** @type {string[]} */ const sels = [];
    const isCompareMode = getIsCompareMode();
    for (const option of list.querySelectorAll('input:checked')) {
        sels.push(option.value);
        if (!isCompareMode && sels.length > 0) { break; }
    }

    Storage.selectionsSet(Storage.semIndexGet(), sels);

    return sels;
}

//=| Timetable list methods |=================================================//

/** Callback to be attached to the Edit "✏️" button on a timetable entry.
 * @param {string} key The key of the timetable to edit.
 */
function timetableListActionEdit(key) {
    console.log("edit", key);
}

/** Callback to be attached to the Delete "❌" button on a timetable entry.
 * @param {string} key The key of the timetable to remove.
 */
function timetableListActionDelete(key) {
    if (!confirm(`Are you sure you want to delete ${key}'s timetable?`)) {return;}
    const semIndex = Storage.semIndexGet();
    Storage.ttRemove(semIndex, key);
    loadTimetablesList(semIndex, false);
}

/** Builds the list of available timetables from local storage.
 * If user has selected "Compare timetables", then all choices will have
 * checkboxes rather than radio buttons.
 * Note that, if not in compare mode and `preserveSelections` is `true`, only
 * the first selection will be retained, and all choices will become radio buttons.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {boolean} preserveSelection `true` if the current user selection(s) are to be
 * preserved, else `false`.*/
function loadTimetablesList(semIndex, preserveSelection) {
    /** @type {HTMLDivElement} */ const list = e(DOM.DOM_TIMETABLE_LIST);
    const previousSels = (preserveSelection ? getSelections() : []);
    const isCompareMode = getIsCompareMode();

    const addButton = e(DOM.DOM_TIMETABLE_LIST_ADD);
    const listDf = document.createDocumentFragment();

    /** Used later to focus the first option.
     * @type {HTMLInputElement} */
    var firstOption = null;

    /** Courses available for the semester `semIndex` */
    const semester = Constants.SEMESTERS[semIndex] || {};

    for (/** Student name */ const studentName in Storage.ttGetAll()[semIndex]) {
        /** The courses registered by the student */
        const studentCourses = Storage.ttGet(semIndex, studentName);
        if (!studentCourses) {continue;}

        /** This is the entry which will be added to the List of timetables */
        const entry = Helper.createElement("div", [DOM.CSS_TIMETABLE_ENTRY]);

        // Adding action buttons and their event handlers
        const actionEdit = Helper.createElement("button", [DOM.CSS_ACTION], DOM.CONTENTS_ACTION_EDIT);
        const actionDelete = Helper.createElement("button", [DOM.CSS_ACTION], DOM.CONTENTS_ACTION_DELETE);
        actionEdit.addEventListener("click", (event) => {
            timetableListActionEdit(studentName);
            event.stopPropagation();
        }, false);
        actionDelete.addEventListener("click", (event) => {
            timetableListActionDelete(studentName);
            event.stopPropagation();
        }, false);
        entry.append(actionEdit, actionDelete);

        // Adding checkbox/radio button
        const option = document.createElement("input");
        option.type = isCompareMode ? "checkbox" : "radio";
        option.name = DOM.DOM_LIST_OPTIONS;
        option.value = studentName;
        option.checked = previousSels.includes(studentName);
        option.addEventListener("input", handleSelectionChange);
        entry.append(option);

        // Adding student name a.k.a. key
        entry.append(Helper.createElement("p", [DOM.CSS_ATTR_KEY], studentName));

        // Adding names of courses and their sections
        entry.append(...Object.entries(studentCourses).map(([cid, sections]) =>
            Helper.createElement("p", [DOM.CSS_ATTR_COURSE],
                Helper.createElement("span", [DOM.CSS_ATTR_COURSE_ID],
                    // The below expression gives the short title of the course.
                    // If it doesn't exist, gives the regular title of the course.
                    // If that doesn't exist as well, gives the course ID itself.
                    (semester[cid] ? (semester[cid].title_short || semester[cid].title || cid) : cid)
                    + ": "
                ),
                structuredClone(sections).sort().join(", "),
            )
        ));

        entry.addEventListener("click", (event) => {
            // When `option.click()` is called, THIS event gets fired again,
            // since `entry` is a parent of `option`. God knows how to stop this
            // shit    I read articles on "Event Bubbling and Capturing", but
            // changing any of those options has literally no effect, even
            // including `event.stopPropagation()`. So at this point, I'm
            // manually checking for this event getting triggered DUE to the
            // below `option.click()`, and preventing further calls to
            // `option.click()`.
            if (event.target != option) {option.click();}
        });
        listDf.append(entry);
        if (!firstOption) {firstOption = option;}
    }

    listDf.append(addButton);
    list.replaceChildren(listDf);
    if (initComplete && !isCompareMode && previousSels.length == 0 && firstOption) {
        // Focus first option if nothing was selected previously.
        // If page is still initializing (initComplete == false), then there's no
        // point in selecting any option, since it'll be overwritten later anyway.
        firstOption.checked = true;
        firstOption.focus();
    }

    handleSelectionChange();
    timetableListToggleCourses();
}

/** Callback to handle when a selection is made, or if comparison mode is toggled.
 * If called directly, the timetable is forcefully refreshed.
 */
function handleSelectionChange() {
    const sels = getSelections();
    const semIndex = Storage.semIndexGet();

    if (sels.length == 0) { // No selection made
        e(DOM.DOM_TIMETABLE).replaceChildren(); // Clears all child elements
    } else if (!getIsCompareMode()) { // Display mode
        displayTimetableKey( sels[0], semIndex, FIELDS_TO_SHOW );
    } else { // Compare mode
        compareTimetablesKeys( sels, semIndex, FIELDS_TO_SHOW );
    }
}

/** Toggles showing the names of courses  */
function timetableListToggleCourses() {
    const checked = e(DOM.DOM_SHOW_COURSES_IN_LIST).checked;
    Array.from(document.getElementsByClassName(DOM.CSS_ATTR_COURSE)).forEach((elem) => {
        elem.style.display = checked ? "" : "none";
    })
}

//=| Timetable display/compare methods |======================================//

/** Displays the given timetable.
 * @param {Constants.TimetableDetailed} timetable Timetable object as returned
 * by {@link Helper.getTimetableDetailed}, {@link Helper.getTimetableDetailedFromStudent},
 * and the like.
 * @param {string[]} fieldsFiltered A string array of field names to display.
 * @param {string} title The title to display above the timetable. Newlines are
 * retained as-is.
 */
function displayTimetable(timetable, fields, title) {
    return Helper.displayTimetable(
        timetable, fields, title,
        e(DOM.DOM_TIMETABLE), e(DOM.DOM_TIMETABLE_TITLE),
    );
}

/** Displays the timetable given by the student name.
 * @param {string} timetableKey The key of the timetable.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 */
function displayTimetableKey(timetableKey, semIndex, fields) {
    return Helper.displayTimetableKey(
        timetableKey, semIndex, fields,
        e(DOM.DOM_TIMETABLE), e(DOM.DOM_TIMETABLE_TITLE),
    );
}

/** Scales the timetable container by setting its CSS `zoom` value. */
function fitContainerByZoom() {
    return Helper.fitContainerByZoom(e(DOM.DOM_TIMETABLE_CONTAINER));
}

/** Compares two or more timetables and displays the common periods.
 * @param {Constants.TimetableDetailed[]} timetables Timetable objects to compare.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 * @param {boolean} doNotRender If `true`, the new timetable will only be
 * returned, and not rendered.
 * @see {@link displayTimetable} for more info on `timetables`.
 * @returns {Constants.TimetableDetailed}
 */
function compareTimetables(timetables, fields, doNotRender) {
    /** @type {Constants.TimetableDetailed} */

    const commonTimetable = [];

    if (timetables.length == 0) {return commonTimetable;}
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (fieldsFiltered.length == 0) {return commonTimetable;}

    // Task is to build a common timetable with 4 types of periods: common busy
    // period, common free period, non-common period, and indeterminate period.

    // For each day...
    for (let i_day = 0; i_day < timetables[0].length; i_day++) {
        const period_count = timetables[0][i_day].length;
        /** @type {Constants.DayDetailed} */
        const day = [];

        // For each period in the current day...
        for (let i_period = 0; i_period < period_count; i_period++) {
            /** The final period to be appended to the resulting common timetable. */
            let period_result = timetables[0][i_day][i_period];

            // Note that i_tt starts at 1 (not 0) and ends at length-1.
            for (let i_tt = 1; i_tt < timetables.length; i_tt++) {
                const period_tt = timetables[i_tt][i_day][i_period];

                // See "/docs/comparison decision table.xlsx" to visually
                // understand how these if-blocks are crafted.

                if (Helper.arePeriodsEqual(period_tt, period_result)
                && !Helper.isPeriodConflict(period_result)) {
                    // This if-block handles common period.

                    // Note that, ideally both period_result and period_tt
                    // should be checked for conflict or not. But at this stage
                    // of code, both periods are equal, so checking only one of
                    // them for conflict is enough.
                    // i.e. `&& !Helper.isPeriodConflict(period_tt)` is NOT
                    // required.
                    continue;

                } else if ((Helper.isPeriodConflict(period_result) || Helper.isPeriodConflict(period_tt))
                    && !(Helper.isPeriodFree(period_result) || Helper.isPeriodFree(period_tt))) {
                    // This if-block handles one/both of them being conflict
                    // periods, except when one of them is free.

                    // Reason being, if one of them is free and the other isn't,
                    // then we don't necessarily need to actually know whether
                    // that other period is a regular busy period or a conflict
                    // period. Hence this if-block won't handle when one of them
                    // is free.
                    period_result = Constants.GET_PERIOD_INDETERMINATE();

                } else {
                    // This else-block handles all the remaining situations:
                    //   • Both are busy periods but with different course/sec
                    //   • One is free and the other is a regular busy period
                    //   • One is free and the other is a conflict period

                    // All these above cases are considered as non-common.
                    period_result = Constants.GET_PERIOD_NON_COMMON();
                }

                // Except for the case where it's a common period, the remaining
                // timetables need not be checked, so we break the loop.
                break;

                // On second thought, I'm not sure how to classify a situation
                // where, at a certain period, first timetable is free, second
                // timetable has a conflict, and third timetable also has a
                // conflict. Do we classify it as "indeterminate"? The above
                // code currently classifies it as "non-common".

                // On third thought, I think the "non-common" result is best,
                // since the three people won't have a common period, regardless
                // of whether these two conflicts were resolved or not.
            }
            day.push(period_result);
        }

        commonTimetable.push(day);
    }

    if (!doNotRender) {
        // Finally call the `displayTimetable` function to actually handle
        // displaying the timetable to the user.
        displayTimetable(commonTimetable, fields, "Common timetable");
    }
    return commonTimetable;
}

/** Compares two or more timetables and displays the common periods, as per the
 * timetable keys given.
 * @param {string[]} timetableKeys The keys of the timetables.
 * {@link Constants.FIELDS}.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 */
function compareTimetablesKeys(timetableKeys, semIndex, fields) {
    const timetables = (timetableKeys
        .map((key) => Storage.ttGet(semIndex, key))
        .filter((tt) => tt)
        .map((tt) => Helper.getTimetableDetailedFromStudent(tt, semIndex))
    );
    compareTimetables(timetables, fields);
}

//=| General |================================================================//

function init() {
    initComplete = false;
    e(DOM.DOM_COMPARE_MODE).checked = Storage.compareModeGet();
    loadTimetablesList(Storage.semIndexGet(), false);

    // Since this is a module, event handlers can't be attached in the HTML
    // file itself. Hence, event listeners are attached here:

    // e(DOM.DOM_THEME_TOGGLE).addEventListener("click", toggleTheme, false);
    // e(DOM.DOM_PRINT_BUTTON).addEventListener("click", () => window.print(), false);
    // e(DOM.DOM_COMPARE_MODE).addEventListener("input", () => loadTimetablesListOld(Storage.semIndexGet(), true), false);
    // loadTimetablesListOld(Storage.semIndexGet(), false);
    e(DOM.DOM_COMPARE_MODE).addEventListener("input", () => {
        getIsCompareMode();
        loadTimetablesList(Storage.semIndexGet(), true);
    }, false);
    window.addEventListener("resize", fitContainerByZoom);
    e(DOM.DOM_SHOW_COURSES_IN_LIST).addEventListener("input", () => {
        timetableListToggleCourses();
    });

    initComplete = true;
    removeLoading();
}

function toggleTheme() {
    const link = e(DOM.DOM_DARK_THEME_CSS);
    link.disabled = !link.disabled;
}

function removeLoading() {
    e(DOM.DOM_LOADING).classList.add(DOM.CSS_COMPLETE);
}

//=| Testing - before init |==================================================//
Storage.ttSetAll(Constants.FRIENDS);

//=| Init |===================================================================//
if (document.readyState === "complete") {
    // If the document completes loading before the script does, (for example,
    // when async-loading Course list in constants.js), directly invoke the init
    // function instead of attaching an event handler.
    init();
} else {
    window.addEventListener("load", init, false);
}

//=| Testing - after init |===================================================//
// console.log(await Builder.showDialog());
