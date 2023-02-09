"use strict";
import * as Constants from './constants.js';

/** @type {Constants.Students} */
export var timetables = null;
const KEY_PREFIX = "Timetabler_";
const KEY = `${KEY_PREFIX}Timetables`;

// >===========================================================================<

function lsGet() {return window.localStorage ? window.localStorage.getItem(KEY) : null;}
function lsSet(value) {if (window.localStorage) window.localStorage.setItem(KEY, value);}

/** Safely checks whether `key` exists in `timetables`.
 * @param {string} key The key to check
 * @see https://eslint.org/docs/latest/rules/no-prototype-builtins#:~:text=a%20malicious%20client%20could%20send%20a%20JSON%20value%20like%20%7B%22hasOwnProperty%22%3A%201%7D%20and%20cause%20the%20server%20to%20crash.
 */
function isKey(key) {
    return Object.prototype.hasOwnProperty.apply(timetables, key);
    // return Object.hasOwn(timetables, key); // VSCode type hint not working :(
}

/** Synchronizes changes with LocalStorage. */
function sync() {
    if (timetables === null) { 
        // Load from LS
        const fromLs = lsGet();
        timetables = fromLs ? JSON.parse(fromLs) : {};
    } else { 
        // Store into LS
        lsSet(JSON.stringify(timetables));
    }
}

// >===========================================================================<

/** Set the given timetable for the given `key`. Note that the object is first
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {Constants.Student} value
 */
export function set(key, value) {
    sync();
    timetables[key] = structuredClone(value);
    sync();
}

/** Gets the timetable for the given `key`. Note that the returned object is
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage.
 * @param {string} key
 * @returns {Constants.Student}
 */
export function get(key) {
    sync();
    return structuredClone(timetables[key]);
}

/** Removes the timetable for the given key.
 * @param {string} key
 */
export function remove(key) {
    sync();
    if (isKey(key)) {
        delete timetables[key];
        sync();
    }
}

/** Returns all the timetables. Note that the returned object is
 * `structuredClone`d, so any changes further made will not reflect in
 * LocalStorage. */
export function getAll() {
    sync();
    return structuredClone(timetables);
}
