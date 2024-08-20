"use strict";
import * as Constants from './constants.js';
import * as DOM from './constants_dom.js';
import * as Helper from './helper.js';
import * as Storage from './storage.js';

//=| Flags and globals |======================================================//
/** Flag to determine whether dialog is already visible. @type {boolean} */
var isDialogShown = false;
// /** Cache categories and courses. @type {Map<string, Constants.Semester>} */
// var categorized = null;
/** User-selected course IDs. @type {string[]} */
const selection = [];

//=| DOM related |============================================================//

/** Shorthand method for document.getElementById. @param {string} id */
const e = (id) => document.getElementById(id);

//=| Custom categories |======================================================//
/** @type {Object.<string, string[]>} */
const CUSTOM_CATEGORIES = {
    "#Year 1 Bio sem": [
        "BIO F110","BIO F111","BITS F110","BITS F112","CHEM F110","CHEM F111",
        "CS F111","MATH F111",],
    "#Year 1 Thermo sem": [
        "BITS F111","EEE F111","MATH F111","MATH F113","ME F112","PHY F110",
        "PHY F111",],
}

//=| Building course list |===================================================//

/** A function that returns the category of the given course, as a string. This
 * is used primarily by {@link categorizeCourses}.
 * @see {@link categorizerYear} for an instance.
 * @callback categorizerCallback
 * @param {string} courseId The ID of the course. Example: "CS F212"
 * @param {Constants.Course} course The Course object itself.
 * @returns {string} The category
 */

/** Returns the first two characters of the course's number. For example,
 * `"CS F212"` returns `"F2"`.
 * @see {@link categorizerCallback} for more info.
 * @param {string} courseId
 * @param {Constants.Course} course
 */
function categorizerYear(courseId, course) {
    const parts = courseId.split(" ", 2);
    if (parts.length < 2) return "";

    let category = parts[1].substring(0, 2) || "";
    if (category.startsWith("F")) category += " - Year " + category.substring(1);
    return category;
}

/** Returns the dept. ID of the course. For example, `"CS F212"` returns `"CS"`.
 * @see {@link categorizerCallback} for more info.
 * @param {string} courseId
 * @param {Constants.Course} course
 */
function categorizerDept(courseId, course) {
    return courseId.includes(" ") ? courseId.split(" ", 2)[0] : "";
}

/**
 * @param {Constants.Semester} semester The semester, i.e. the total available
 * set of courses from which to build the list.
 * @param {categorizerCallback} categorizer Function that returns the category
 * of the given course.
 * @param {string[]} exclude Course IDs to exclude from the list.
 * @param {Object.<string, string[]> | null} customCategories Custom categories
 * to add in addition to the categories returned by the `categorizer`.
 */
function categorizeCourses(semester, categorizer, exclude, customCategories) {
    /** @type {Map<string, Constants.Semester>} */
    const result = new Map();

    for (const [category, courseIds] of Object.entries(customCategories || {})) {
        result.set(category, Object.fromEntries(
            courseIds
            .filter((courseId) => !exclude.includes(courseId) && semester[courseId])
            .map((courseId) => [courseId, semester[courseId]])
        ))
    }

    for (const [courseId, course] of Object.entries(semester)) {
        if (exclude.includes(courseId)) continue;

        const category = categorizer(courseId, course) || "Un-categorized";
        if (!result.has(category)) result.set(category, {});

        result.get(category)[courseId] = course;
    }

    return result;
}

//=| General |================================================================//

/** Loads all the available courses into the dialog box.
 * @param {Constants.Semester} semester The semester, i.e. the total available
 * set of courses from which to build the list.
 * @param {categorizerCallback} categorizer Function that returns the category
 * of the given course.
 * @param {string[]} exclude Course IDs to exclude from the list.
 * @param {Object.<string, string[]> | null} customCategories Custom categories
 * to add in addition to the categories returned by the `categorizer`.
 */
function loadCourses(semester, categorizer, exclude, customCategories) {
    const listAvailable = e(DOM.DOM_BUILDER_COURSES_AVAILABLE);
    const listSelected  = e(DOM.DOM_BUILDER_COURSES_SELECTED);

    // stored globally.
    const categorized = categorizeCourses(semester, categorizer, exclude, customCategories);
    const categorizedSorted = [...categorized].sort((a,b) => a[0].localeCompare(b[0]));

    const df = document.createDocumentFragment();
    categorizedSorted.forEach(([category, courses]) => {
        const container = Helper.createElement("div", [DOM.CSS_BUILDER_LISTBOX_GROUP])
        const heading = Helper.createElement("li", [DOM.CSS_BUILDER_LISTBOX_HEADING], category);
        heading.tabIndex = 0;
        container.append(heading);
        for (const [courseId, course] of Object.entries(courses).sort()) {
            const item = Helper.createElement("li", [DOM.CSS_BUILDER_LISTBOX_ITEM],
                `${courseId} - ${course.title}`);
            item.tabIndex = 0;
            container.append(item);
        }
        df.append(container);
    });

    listAvailable.replaceChildren(df);

}

/** Shows the builder dialog optionally with a pre-filled timetable.
 * @param {Constants.Student} courses The list of *selected* courses and
 * sections to pre-fill the dialog with.
 * @param {string} title The name of the student, which will be automatically
 * suffixed with "'s timetable".
 * @param {number} semIndex The index of the semester in {@link Constants.SEMESTERS}.
 * @returns `true` if Save was clicked, `false` if Discard was clicked.
 */
export async function showDialog(courses, title, semIndex) {
    if (isDialogShown) {throw "Dialog is already visible.";}
    isDialogShown = true;
    const dialogPromise = new Helper.DeferredPromise();

    // parameter initialization
    if (courses == null) courses = {};
    if (title == null) title = ""
    if (semIndex == null) semIndex = Storage.semIndexGet();

    // TODO: Populate dialog contents
    const semester = Constants.SEMESTERS[semIndex];
    loadCourses(semester, categorizerYear, Object.keys(courses), CUSTOM_CATEGORIES);

    // Attach event handlers for dialog buttons
    e(DOM.DOM_BUILDER_OK).addEventListener("click", () => dialogPromise.resolve(true), {once: true});
    const cancelEventListener = () => {
        if (!confirm("Are you sure you want to discard changes?")) return;
        dialogPromise.resolve(false);
        e(DOM.DOM_BUILDER_CANCEL).removeEventListener(cancelEventListener)
    }
    e(DOM.DOM_BUILDER_CANCEL).addEventListener("click", cancelEventListener);

    // Present dialog and wait for user response
    e(DOM.DOM_BUILDER_CONTAINER).classList.remove(DOM.CSS_BUILDER_HIDDEN);
    /** @type {boolean} */ const dialogResult = await dialogPromise.promise;

    // Finish up and return
    e(DOM.DOM_BUILDER_CONTAINER).classList.add(DOM.CSS_BUILDER_HIDDEN);
    isDialogShown = false;
    return dialogResult;
}
