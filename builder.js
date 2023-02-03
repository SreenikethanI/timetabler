"use strict";
import * as Constants from './constants.js';
import * as Helper from './helper.js';

//=| DOM related |============================================================//
/** @param {string} id */
const e = (id) => document.getElementById(id);
const DOM_TIMETABLE = "timetable";
const DOM_PALETTE = "palette";

//=| Palette |================================================================//
const PALETTE = {
    "Bio sem": [
        {"course": "BIO F110",  "section": "P1"},
        {"course": "BIO F111",  "section": "L1"},
        {"course": "BITS F110", "section": "L1"},
        {"course": "BITS F110", "section": "P1"},
        {"course": "BITS F112", "section": "L1"},
        {"course": "CHEM F110", "section": "P1"},
        {"course": "CHEM F111", "section": "L1"},
        {"course": "CS F111",   "section": "L1"},
        {"course": "CS F111",   "section": "P1"},
        {"course": "MATH F111", "section": "L1"},
    ],
    "Thermo sem": [
        {"course": "BITS F111", "section": "L"},
        {"course": "EEE F111",  "section": "L"},
        {"course": "MATH F111", "section": "L"},
        {"course": "MATH F113", "section": "L"},
        {"course": "ME F112",   "section": "L"},
        {"course": "ME F112",   "section": "P"},
        {"course": "PHY F110",  "section": "P"},
        {"course": "PHY F111",  "section": "L"},
    ],
}

//=| General |================================================================//

function init() {
    
}

function toggleTheme() {
    const link = e("darkThemeCSS");
    link.disabled = !link.disabled;
}
