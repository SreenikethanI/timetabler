"use strict";
import * as Constants from './constants.js';
import * as DOM from './constants_dom.js';
import * as Helper from './helper.js';

//=| Flags and globals |======================================================//
/** Flag to determine whether dialog is already visible.
 * @type {boolean} */
var isDialogShown = false;

//=| DOM related |============================================================//

/** Shorthand method for document.getElementById.
 * @param {string} id */
const e = (id) => document.getElementById(id);

//=| Palette |================================================================//
const PALETTE = {
    "Bio sem": [
        "BIO F110","BIO F111","BITS F110","BITS F112","CHEM F110","CHEM F111",
        "CS F111","MATH F111"],
    "Thermo sem": [
        "BITS F111","EEE F111","MATH F111","MATH F113","ME F112","PHY F110",
        "PHY F111",],
}

//=| General |================================================================//

/** Shows the builder dialog with a pre-filled timetable.
 * @param {Constants.Student} student The list of courses to initially display.
 * @param {string} name The name of the student.
 * @returns `true` if OK was clicked, `false` if Cancel was clicked.
 */
export async function showDialog(student, name) {
    if (isDialogShown) {throw "Dialog is already visible.";}
    isDialogShown = true;
    const deferred = new Helper.DeferredPromise();
    e(DOM.DOM_BUILDER_OK).addEventListener("click", () => deferred.resolve(true), {once: true});
    e(DOM.DOM_BUILDER_CANCEL).addEventListener("click", () => deferred.resolve(false), {once: true});

    e(DOM.DOM_BUILDER_CONTAINER).classList.remove(DOM.CSS_BUILDER_HIDDEN);
    /** @type {boolean} */ const dialogResult = await deferred.promise;
    e(DOM.DOM_BUILDER_CONTAINER).classList.add(DOM.CSS_BUILDER_HIDDEN);
    isDialogShown = false;
    return dialogResult;
}
