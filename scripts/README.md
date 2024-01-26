# [/](/)scripts/

This folder contains JavaScript script files. All of them are run as ES6 modules.

## Main files
| File | Description |
| ---: | --- |
| [main.**js**](main.js) | Main code for the [webpage](/index.html). Keep in mind that this is also a module. |
| [builder.**js**](builder.js) | Code for the builder dialog. |

## Supplementary files
| File | Description |
| ---: | --- |
| [constants.**js**](constants.js) | *Constants* for global usage, such as course lists, etc. as well as Type definitions/hints (JSDoc). |
| [constants_dom.**js**](constants_dom.js) | String constants such as element IDs and CSS style names, for easy refactoring. |
| [storage.**js**](storage.js) | *Variables* for global use, as well as for (limited) persistent storage. |
| [helper.**js**](helper.js) | Functions, mostly related to processing timetables. |

## Extras
| File | Description |
| ---: | --- |
| [service_worker_offline.**js**](service_worker_offline.js) | Code for PWA offline availability, although this doesn't work for some reason. |
| [main_old.**js**](main_old.js) | *(deprecated)* Old code from the previous version of the timetable list, now kept just for archival purposes. |
