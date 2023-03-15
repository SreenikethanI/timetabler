"use strict";
import * as Constants from './constants.js';
import * as Helper from './helper.js';
import * as DOM from './constants_dom.js'
import * as Storage from './storage.js'

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

//=| Helper methods - timetable rendering |===================================//

/** Creates a `DocumentFragment` containing header rows.
 * @returns {DocumentFragment} */
function createHeaderRow() {
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");
    const blank = Helper.createElement("th", [DOM.CSS_BLANK]);
    blank.rowSpan = 2; blank.colSpan = 2;
    row1.append(blank);

    for (let i = 0; i < 9; i++) {
        row1.append(Helper.createElement("th", [DOM.CSS_HEADING_PERIOD_NUM], i+1));

        const time_start = (Constants.PERIOD_START
            + Constants.PERIOD_DURATION * i
            + Constants.PERIOD_BREAK * i);
        const time_end = time_start + Constants.PERIOD_DURATION;

        row2.append(Helper.createElement("td", [DOM.CSS_HEADING_PERIOD_TIME],
            `${Helper.formatTime(time_start)} - ${Helper.formatTime(time_end)}`));
    }

    const df = document.createDocumentFragment();
    df.append(row1, row2);
    return df;
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
 * @param {number} semIndex The index of the semester in `Constants.COURSES`.
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

    const courses = Constants.SEMESTERS[semIndex];
    for (const key in Storage.ttGetAll()[semIndex]) {
        const student = Storage.ttGet(semIndex, key);
        if (!student) {continue;}
        const entry = Helper.createElement("div", [DOM.CSS_TIMETABLE_ENTRY]);

        const actionEdit = Helper.createElement("button", [DOM.CSS_ACTION], DOM.CONTENTS_ACTION_EDIT);
        const actionDelete = Helper.createElement("button", [DOM.CSS_ACTION], DOM.CONTENTS_ACTION_DELETE);
        actionEdit.addEventListener("click", (event) => {
            timetableListActionEdit(key);
            event.stopPropagation();
        }, false);
        actionDelete.addEventListener("click", (event) => {
            timetableListActionDelete(key);
            event.stopPropagation();
        }, false);
        entry.append(actionEdit, actionDelete);

        const option = document.createElement("input");
        option.type = isCompareMode ? "checkbox" : "radio";
        option.name = DOM.DOM_LIST_OPTIONS;
        option.value = key;
        option.checked = previousSels.includes(key);
        option.addEventListener("input", handleSelectionChange);
        entry.append(option);

        // Add details like key, courses and sections
        entry.append(Helper.createElement("p", [DOM.CSS_ATTR_KEY], key));
        entry.append(...Object.entries(student).map(([cid, sections]) =>
            Helper.createElement("p", [DOM.CSS_ATTR_COURSE],
                Helper.createElement("span", [DOM.CSS_ATTR_COURSE_ID], courses[cid].title_short + ": "),
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
    if (!isCompareMode && previousSels.length == 0 && firstOption) {
        // Focus first option if nothing was selected previously
        firstOption.checked = true;
        firstOption.focus();
    }

    handleSelectionChange();
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

//=| Timetable display/compare methods |======================================//

/** Displays the given timetable.
 * @param {Constants.TimetableDetailed} timetable Timetable object as returned
 * by {@link Helper.getTimetableDetailed}, {@link Helper.getTimetableDetailedFromStudent},
 * and the like.
 * @param {string[]} fieldsFiltered A string array of field names to display.
 * @param {HTMLElement?} renderTarget The `table` element where the actual render
 * takes place. If left null, it will render in the table of ID {@link DOM.DOM_TIMETABLE}.
 */
function displayTimetable(timetable, fields, renderTarget, title) {
    if (!renderTarget) {renderTarget = e(DOM.DOM_TIMETABLE);}
    if (!timetable) {return;}
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (!fieldsFiltered) {return;}

    const df = document.createDocumentFragment();
    df.append(createHeaderRow());

    // For each day...
    for (let i_day = 0; i_day < timetable.length; i_day++) {
        /** An array of periods in the current day. */
        const day = timetable[i_day];
        const row = Helper.createElement("tr", [],
            Helper.createElement("th", [DOM.CSS_DAY_NAME], Constants.DAYS[i_day]),
            Helper.createElement("td", [DOM.CSS_DAY_FIELDS], ...fieldsFiltered.map((f) =>
                Helper.createElement("p", [], Constants.FIELDS_NAMES[f]))
            ),
        );

        // For each period in the current day...
        for (let i_period = 0; i_period < day.length; i_period++) {
            const period = day[i_period];
            const isFree = Helper.isPeriodFree(period);
            const isNonCommon = Helper.isPeriodNonCommon(period);
            const isConflict = Helper.isPeriodConflict(period);
            const isIndeterminate = Helper.isPeriodIndeterminate(period);

            // If current period is same as previous, extend the previous cell,
            // i.e. block periods.
            if (i_period > 0
                && !isFree && !isNonCommon && !isConflict && !isIndeterminate
                && Helper.arePeriodsEqual(period, day[i_period - 1])) {
                row.lastChild.colSpan++;
                continue;
            }

            /** Table cell that represents a single period. */
            const cell_period = Helper.createElement("td", [DOM.CSS_PERIOD]);

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
                    Helper.createElement("p", [], period[field]))
                );
            }

            row.append(cell_period);
        }
        df.append(row);
    }

    renderTarget.replaceChildren(df);
    fitTimetable();
}

/** Displays the timetable given by the student name.
 * @param {string} timetableKey The key of the timetable.
 * @param {number} semIndex The index of the semester in {@link Constants.COURSES}.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 */
function displayTimetableKey(timetableKey, semIndex, fields) {
    return displayTimetable(
        Helper.getTimetableDetailedFromStudent(
            Storage.ttGet(semIndex, timetableKey),
            semIndex),
        fields,
        null,
        `${timetableKey}'s timetable`
    );
}

/** Compares two or more timetables and displays the common periods.
 * @param {Constants.TimetableDetailed[]} timetables Timetable objects to compare.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 * @see {@link displayTimetable} for more info on `timetables`.
 */
function compareTimetables(timetables, fields) {
    if (timetables.length == 0) {return;}
    const fieldsFiltered = fields.filter((x) => Constants.FIELDS.includes(x));
    if (fieldsFiltered.length == 0) {return;}

    /** @type {Constants.TimetableDetailed} */
    const commonTimetable = [];

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

    // Finally call the `displayTimetable` function to actually handle displaying
    // the timetable to the user.
    displayTimetable(commonTimetable, fields);
}

/** Compares two or more timetables and displays the common periods, as per the
 * timetable keys given.
 * @param {string[]} timetableKeys The keys of the timetables.
 * {@link Constants.FIELDS}.
 * @param {number} semIndex The index of the semester in {@link Constants.COURSES}.
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
    window.addEventListener("resize", fitTimetable);

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

function fitTimetable() {
    const container = e(DOM.DOM_TIMETABLE_CONTAINER);
    container.style.zoom = 1;
    const w = container.scrollWidth, h = container.scrollHeight;

    const wBound = document.body.clientWidth - 10;
    const hBound = Math.min(document.body.scrollHeight, window.innerHeight - 20);

    const factor = Math.min(1, Math.min(wBound / w, hBound / h));
    container.style.zoom = factor;
}

//=| DOM Event handlers |=====================================================//
//   See explanation in `init`.

window.addEventListener("load", init, false);

//=| Testing |================================================================//

Storage.ttSetAll(Constants.FRIENDS);
