/* IMPORTANT
This file contains functions discarded from main.js, not to be used anywhere
else. This code may contain references to functions from main.js, which are
intentionally not imported here. Basically functions from *this* file won't run.
*/

//=| Helper methods - user input |============================================//

/** Returns a string Array containing the timetable names selected by the user.
 * @deprecated instead use {@link getSelections}
 * @param {boolean} isCompareMode If `true`, only the first user choice will be
 * returned.
 * @returns {string[]}
 */
function getSelectionsOld(isCompareMode) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM.DOM_LIST);
    /** @type {string[]} */ const sels = [];

    for (const option of list.querySelectorAll('label > input:checked')) {
        sels.push(option.value); // option.checked is guaranteed to be `true`.
        if (!isCompareMode && sels.length > 0) { break; }
    }
    return sels;
}

//=| Timetable list methods |=================================================//

/** Builds the list of available timetables, as per `Constants.FRIENDS`.
 * If user has selected "Compare timetables", then all choices will have
 * checkboxes rather than radio buttons.
 * Note that, if not in compare mode and `preserveSelections` is `true`, only
 * the first selection will be retained, and all choices will become radio buttons.
 * @deprecated instead use {@link loadTimetablesList}
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {boolean} preserveSelection `true` if the current user selection(s) are to be
 * preserved, else `false`.
 */
function loadTimetablesListOld(semIndex, preserveSelection) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM.DOM_LIST);
    const isCompareMode = getIsCompareMode();
    const previousSels = preserveSelection ? getSelectionsOld(isCompareMode) : [];

    // Create document fragment and a fieldset legend (its text depends on
    // the current mode)
    const listDf = document.createDocumentFragment();
    listDf.append(Helper.createElement("legend", [],
        isCompareMode ? DOM.LEGEND_COMPARE : DOM.LEGEND_DISPLAY));

    /** Used later to focus the first option.
     * @type {HTMLInputElement} */
    var firstOption = null;

    var index = 1;
    for (const key in Constants.FRIENDS[semIndex]) {
        // Create radio element
        const option = document.createElement("input");
        option.type = isCompareMode ? "checkbox" : "radio";
        option.name = DOM.DOM_LIST_OPTIONS_OLD;
        option.value = key;
        option.checked = previousSels.includes(key);
        option.addEventListener("input", handleSelectionChangeOld);

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

        // Append label (containing radio button) to document fragment
        listDf.append(
            Helper.createElement("label", [], option, optionNumber, ` ${key}`),
            document.createElement("br")
        );
        if (!firstOption) {firstOption = option;}
        index++;
    }

    list.replaceChildren(listDf);
    if (!isCompareMode && previousSels.length == 0 && firstOption) {
        // Focus first option if nothing was selected previously
        firstOption.checked = true;
        firstOption.focus();
    }

    handleSelectionChangeOld();
}

/** Callback to handle when a selection is made, or if comparison mode is toggled.
 * If called directly, the timetable is forcefully refreshed.
 * @deprecated instead use {@link handleSelectionChange}
 */
function handleSelectionChangeOld() {
    const sels = getSelectionsOld(getIsCompareMode());
    const semIndex = Storage.semIndexGet();

    if (sels.length == 0) { // No selection made
        e(DOM.DOM_TIMETABLE).replaceChildren(); // Clears all child elements
    } else if (!getIsCompareMode()) { // Display mode
        displayTimetableKeyOld( sels[0], semIndex, FIELDS_TO_SHOW );
    } else { // Compare mode
        compareTimetablesKeysOld( sels, semIndex, FIELDS_TO_SHOW );
    }
}

//=| Timetable display/compare methods |======================================//

/** Displays the timetable given by the student name.
 * @deprecated instead use {@link displayTimetableKey}
 * @param {string} timetableKey The key of the timetable. Refer to {@link Constants.FRIENDS}.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 */
function displayTimetableKeyOld(timetableKey, semIndex, fields) {
    return displayTimetable(
        Helper.getTimetableDetailedFromStudent(
            Constants.FRIENDS[semIndex][timetableKey],
            semIndex),
        fields
    );
}

/** Compares two or more timetables and displays the common periods, as per the
 * timetable keys given.
 * @deprecated instead use {@link compareTimetablesKeys}
 * @param {string[]} timetableKeys The keys of the timetables. Refer to {@link Constants.FRIENDS}.
 * {@link Constants.FIELDS}.
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @param {string[]} fields The fields to display. Refer to {@link Constants.FIELDS}.
 */
function compareTimetablesKeysOld(timetableKeys, semIndex, fields) {
    const timetables = (timetableKeys
        .map((key) => Constants.FRIENDS[semIndex][key])
        .filter((tt) => tt)
        .map((tt) => Helper.getTimetableDetailedFromStudent(tt, semIndex))
    );
    compareTimetables(timetables, fields);
}
