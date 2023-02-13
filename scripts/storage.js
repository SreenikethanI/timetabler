"use strict";
import * as Constants from './constants.js';

/** @type {Constants.Students[]} */
var timetables = null;
const KEY_PREFIX = "Timetabler_";
const KEY = `${KEY_PREFIX}Timetables`;

// >===========================================================================<

function lsGet() {return window.localStorage ? window.localStorage.getItem(KEY) : null;}
function lsSet(value) {if (window.localStorage) window.localStorage.setItem(KEY, value);}

/** Safely checks whether `key` exists in `timetables`.
 * @param {number} semIndex The index of the semester.
 * @param {string} key The key to check
 * @see https://eslint.org/docs/latest/rules/no-prototype-builtins#:~:text=a%20malicious%20client%20could%20send%20a%20JSON%20value%20like%20%7B%22hasOwnProperty%22%3A%201%7D%20and%20cause%20the%20server%20to%20crash.
 * @returns {boolean}
 */
function isKey(semIndex, key) {
    if (semIndex == null) {return false;}
    const sem = timetables[semIndex];
    if (sem == null) {return false;}
    return Object.prototype.hasOwnProperty.call(sem, key);

    // return Object.hasOwn(timetables, key); // VSCode type hint not working :(
}

/** Updates LocalStorage with `timetables`. */
function sync() {
    if (timetables === null) { // Load from LS
        const fromLs = lsGet();
        timetables = fromLs ? JSON.parse(fromLs) : [];
        sync(); // To check for null entries

    } else { // Store into LS
        for (let i = 0; i < timetables.length; i++) {
            // Replace null entries with empty Student object {}
            if (!timetables[i]) {timetables[i] = {};}
        }
        lsSet(JSON.stringify(timetables));
    }
}

// >===========================================================================<

/** Set the given timetable for the given `key`. Note that the object is first
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {string} key
 * @param {number} semIndex The index of the semester.
 * @param {Constants.Student} value
 */
export function set(semIndex, key, value) {
    if (!timetables[semIndex]) {timetables[semIndex] = {};}
    timetables[semIndex][key] = structuredClone(value);
    sync();
}

/** Gets the timetable for the given `key` and semester. Note that the returned
 * object is `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {number} semIndex The index of the semester.
 * @param {string} key
 * @returns {Constants.Student?}
 */
export function get(semIndex, key) {
    return isKey(semIndex, key) ? structuredClone(timetables[semIndex][key]) : null;
}

/** Removes the timetable for the given key and semester.
 * @param {number} semIndex The index of the semester.
 * @param {string} key
 */
export function remove(semIndex, key) {
    if (isKey(semIndex, key)) {
        delete timetables[semIndex][key];
        sync();
    }
}

/** Returns all the timetables from all semesters. Note that the returned object
 * is `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @returns {Constants.Students[]}
 */
export function getAll() {
    return structuredClone(timetables);
}

/** Overwrites all the timetables. Note that the given object is
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {Constants.Students[]} newTimetables
 */
export function setAll(newTimetables) {
    timetables = structuredClone(newTimetables);
    sync();
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
export function forEach(semIndex, callback) {
    if (semIndex == null || !callback) {return;}
    const sem = timetables[semIndex];
    if (sem == null) {return;}
    Object.entries(sem).forEach(([key, timetable]) => callback(key, timetable));
}

sync();
