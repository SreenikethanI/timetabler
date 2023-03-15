"use strict";
import * as Constants from './constants.js';
import * as DOM from './constants_dom.js';
import * as Helper from './helper.js';

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

/**
 * 
 * @param {*} parameters 
 * @param {*} go 
 * @param {*} here 
 * @returns `true` if OK was clicked, `false` if Cancel was clicked.
 */
export async function showDialog(parameters, go, here) {
    const deferred = new Helper.DeferredPromise();
    function resolve_ok() {
        deferred.resolve(true);
        e(DOM.DOM_BUILDER_OK).removeEventListener("click", resolve_ok);
    };
    function resolve_cancel() {
        deferred.resolve(false);
        e(DOM.DOM_BUILDER_OK).removeEventListener("click", resolve_cancel);
    };
    e(DOM.DOM_BUILDER_OK).addEventListener("click", resolve_ok);
    e(DOM.DOM_BUILDER_CANCEL).addEventListener("click", resolve_cancel);

    e(DOM.DOM_BUILDER_CONTAINER).classList.remove(DOM.CSS_BUILDER_HIDDEN);
    const dialogResult = await deferred.promise;
    e(DOM.DOM_BUILDER_CONTAINER).classList.add(DOM.CSS_BUILDER_HIDDEN);
    return dialogResult;
}
