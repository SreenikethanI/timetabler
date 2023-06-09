"use strict";
import * as Constants from './constants.js';

const KEY_PREFIX = "Timetabler_";
const KEY_TT           = `${KEY_PREFIX}Timetables`;
const KEY_SELECTIONS   = `${KEY_PREFIX}Selections`;
const KEY_SEM_INDEX    = `${KEY_PREFIX}SemIndex`;
const KEY_COMPARE_MODE = `${KEY_PREFIX}CompareMode`;

/** @type {Constants.Students[]} */ var timetables;
/** @type {string[][]} */           var selections;
/** @type {number} */               var semIndex;
/** @type {boolean} */              var compareMode;
const semIndexDefault = 1;

const LS_AVAILABLE = (() => {
    // https://stackoverflow.com/a/16427725/
    if (typeof localStorage == 'undefined') {return false;}
    const TEST_KEY = `${KEY_PREFIX}LSTest`;
    try {
        localStorage.setItem(TEST_KEY, 'yes');
        if (localStorage.getItem(TEST_KEY) === 'yes') {
            localStorage.removeItem(TEST_KEY);
            return true;
        } else {return false;}
    } catch(e) {return false;}
})();
/** @param {string} key */
function lsGet(key) {return LS_AVAILABLE ? localStorage.getItem(key) : null;}
/** @param {string} value @param {string} key */
function lsSet(value, key) {if (LS_AVAILABLE) localStorage.setItem(key, value);}

// >===========================================================================<

/** Safely checks whether `key` exists in `timetables`.
 * @param {number} semIndex The index of the semester.
 * @param {string} key The key to check
 * @see https://eslint.org/docs/latest/rules/no-prototype-builtins#:~:text=a%20malicious%20client%20could%20send%20a%20JSON%20value%20like%20%7B%22hasOwnProperty%22%3A%201%7D%20and%20cause%20the%20server%20to%20crash.
 * @returns {boolean}
 */
function ttIsKey(semIndex, key) {
    if (semIndex == null || semIndex < 0) {return false;}
    const sem = timetables[semIndex];
    if (sem == null) {return false;}
    return Object.prototype.hasOwnProperty.call(sem, key);

    // return Object.hasOwn(timetables, key); // VSCode type hint not working :(
}

/** Updates LocalStorage with `timetables`.
 * @param {boolean?} updateTT Whether or not to update timetables
 * @param {boolean?} updateSels Whether or not to update selections
 * @param {boolean?} updateSemIndex Whether or not to update semIndex
 * @param {boolean?} updateCompareMode Whether or not to update compare mode
 */
function sync(updateTT, updateSels, updateSemIndex, updateCompareMode) {
    if (updateTT === undefined) updateTT = true;
    if (updateSels === undefined) updateSels = true;
    if (updateSemIndex === undefined) updateSemIndex = true;
    if (updateCompareMode === undefined) updateCompareMode = true;

    if (updateTT) {
        if (timetables === undefined) { // Load from LS
            const fromLs = lsGet(KEY_TT);
            timetables = fromLs ? JSON.parse(fromLs) : [];
            sync(true, false, false, false); // To check for null entries

        } else { // Store into LS
            for (let i = 0; i < timetables.length; i++) {
                // Replace null entries with empty Student object {}
                if (!timetables[i]) {timetables[i] = {};}
            }
            lsSet(JSON.stringify(timetables), KEY_TT);
        }
    }

    if (updateSels) {
        if (selections === undefined) { // Load from LS
            const fromLs = lsGet(KEY_SELECTIONS);
            selections = fromLs ? JSON.parse(fromLs) : [];
            sync(false, true, false, false); // To check for null entries

        } else { // Store into LS
            for (let i = 0; i < selections.length; i++) {
                // Replace null entries with empty string array []
                if (!selections[i]) {selections[i] = [];}
            }
            // lsSet(JSON.stringify(selections), KEY_SELECTIONS);
        }
    }

    if (updateSemIndex) {
        if (semIndex === undefined) { // Load from LS
            const fromLs = lsGet(KEY_SEM_INDEX);
            semIndex = Math.max(0, fromLs ? JSON.parse(fromLs) || 0 : semIndexDefault);
            sync(false, false, true, false);
        } else { // Store into LS
            // lsSet(JSON.stringify(Math.max(0, semIndex || 0)), KEY_SEM_INDEX);
        }
    }

    if (updateCompareMode) {
        if (compareMode === undefined) { // Load from LS
            compareMode = Boolean(JSON.parse(lsGet(KEY_COMPARE_MODE)));
            sync(false, false, false, true);
        } else { // Store into LS
            // lsSet(JSON.stringify(compareMode), KEY_COMPARE_MODE);
        }
    }

}

// >===========================================================================<

/** Set the given timetable for the given `key`. Note that the object is first
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {string} key
 * @param {number} semIndex The index of the semester.
 * @param {Constants.Student} value
 * @throws {RangeError} semIndex must be not null and >= 0.
 */
export function ttSet(semIndex, key, value) {
    if (semIndex == null || semIndex < 0) {throw RangeError("semIndex null or negative.");}
    if (!timetables[semIndex]) {timetables[semIndex] = {};}
    timetables[semIndex][key] = structuredClone(value);
    sync(true, false, false, false);
}

/** Gets the timetable for the given `key` and semester. Note that the returned
 * object is `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {number} semIndex The index of the semester.
 * @param {string} key
 * @returns {Constants.Student?}
 */
export function ttGet(semIndex, key) {
    return ttIsKey(semIndex, key) ? structuredClone(timetables[semIndex][key]) : null;
}

/** Removes the timetable for the given key and semester.
 * @param {number} semIndex The index of the semester.
 * @param {string} key
 */
export function ttRemove(semIndex, key) {
    if (ttIsKey(semIndex, key)) {
        delete timetables[semIndex][key];
        sync(true, false, false, false);
    }
}

/** Returns all the timetables from all semesters. Note that the returned object
 * is `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @returns {Constants.Students[]}
 */
export function ttGetAll() {
    return structuredClone(timetables);
}

/** Overwrites all the timetables. Note that the given object is
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {Constants.Students[]} newTimetables
 */
export function ttSetAll(newTimetables) {
    timetables = structuredClone(newTimetables);
    sync(true, false, false, false);
}

/** Callback for `forEach` method, which takes key and timetable as two args.
 * @callback forEachCallback
 * @param {string} key
 * @param {Constants.Student} timetable
 */
/** Loops through every student in the given semester.
 * @param {number} semIndex
 * @param {forEachCallback} callback
*/
export function ttForEach(semIndex, callback) {
    if (!callback) {return;}
    const sem = timetables[semIndex];
    if (sem == null) {return;}
    Object.entries(sem).forEach(([key, timetable]) => callback(key, timetable));
}

// >===========================================================================<

/** Get an array of selected keys from the local storage
 * @param {number} semIndex
 * @returns {string[]?}
 * @throws {RangeError} semIndex must be not null and >= 0.
 */
export function selectionsGet(semIndex) {
    if (semIndex == null || semIndex < 0) {throw RangeError("semIndex null or negative.");}
    return selections[semIndex] || [];
}

/** Set the given list of selected keys into local storage.
 * @param {number} semIndex
 * @param {string[]} value A string array of keys.
 * @throws {RangeError} semIndex must be not null and >= 0.
*/
export function selectionsSet(semIndex, value) {
    if (semIndex == null || semIndex < 0) {throw RangeError("semIndex null or negative.");}
    if (!Array.isArray(value)) {throw TypeError("selections must be an array.");}
    selections[semIndex] = value;
    // sync(false, true, false, false);
}

// >===========================================================================<

/** Retrieve the semIndex from local storage. Unknown values are parsed as 0.
 * @returns {number}
 */
export function semIndexGet() {
    return semIndex;
}

/** Store the given semIndex to local storage/
 * @param {number} index
 * @throws {RangeError} semIndex must be not null and >= 0.
 */
export function semIndexSet(index) {
    if (index == null || index < 0) {throw RangeError("semIndex null or negative.");}
    semIndex = index;
    // sync(false, false, true, false);
}

// >===========================================================================<

/** Retrieve the compare mode from local storage. `true` means compare mode is
 * enabled. @returns {boolean} */
export function compareModeGet() {return compareMode;}

/** Store compare mode to local storage.
 * @param {boolean} newValue */
export function compareModeSet(newValue) {
    compareMode = Boolean(newValue);
    // sync(false, false, false, true);
}

// >===========================================================================<

sync();
