"use strict";

/*
=== Some terminology ===
The following are constant pre-determined data, given by the university:
  • A `Semester` object consists of `Course`s.
  • A `Course`   object consists of some properties, including a `Sections`.
  • A `Sections` object consists of `Section`s.
  • A `Section`  object consists of many properties.

The following are real-life data which can change depending on person:
  • A `Students` object consists of student names mapped to a `Student` each.
  • A `Student`  object consists of course IDs mapped to arrays of section numbers to which they're enrolled into.

The following are timetable information derived/constructed from each `Student`:
  • A `TimetableMinimal` object is an array of `DayMinimal`.
  • A `DayMinimal`       object is an array of `PeriodMinimal`.
  • A `PeriodMinimal`    object consists of course ID and section of ONE period.

The following are the detailed equivalents of the corresponding minimal objects:
  • A `TimetableDetailed` object is an array of `DayDetailed`.
  • A `DayDetailed`       object is an array of `PeriodDetailed`.
  • A `PeriodDetailed`    object consists of all relevant info for ONE period.
*/

/** @typedef {{course: string, section: string}} PeriodMinimal */
/** @typedef {PeriodMinimal[]} DayMinimal */
/** @typedef {DayMinimal[]} TimetableMinimal */

/** @typedef {{course:string, title:string, title_short:string, IC:string, section:string, instructor:string, room:string, section_room:string}} PeriodDetailed */
/** @typedef {PeriodDetailed[]} DayDetailed */
/** @typedef {DayDetailed[]} TimetableDetailed */

/** List of fields for a period. */
export const FIELDS = ["course", "title", "title_short", "IC", "section", "instructor", "room", "section_room"];
/** Human-friendly names of fields for a period. */
export const FIELDS_NAMES = {course:"Code",title:"Title",title_short:"Title",IC:"IC",section:"Section",instructor:"Instructor",room:"Room",section_room:"Sec/Room"};
/** List of days. */
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
/** List of days in short form, as given in the Coursewise Timetable. */
export const DAYS_SHORT = ["M", "T", "W", "Th", "F"];

// Below are in minutes.
/** Starting time of a period, i.e. 7:30 AM. Represented as number of minutes from 12 AM. */
export const PERIOD_START = 7*60 + 30;
/** Duration of a period, in minutes. */
export const PERIOD_DURATION = 50;
/** Duration of break between two periods, in minutes. */
export const PERIOD_BREAK = 5;

//=| Template objects |=======================================================//

/** @returns {Section} */
export const GET_SECTION_BLANK = () => ({room: "", instructor: "", days: ""});
/** @returns {Course} */
export const GET_COURSE_BLANK = () => ({title: "", title_short: "", IC: "", sections: {}});
/** @returns {PeriodMinimal} */
export const GET_PERIOD_NON_COMMON = () => ({course: "NON_COMMON", section: ""});
/** @returns {PeriodMinimal} */
export const GET_PERIOD_CONFLICT = () => ({course: "CONFLICT", section: ""});

/** @param {PeriodMinimal} period @returns {boolean} */
export const IS_PERIOD_NON_COMMON = (period) => period.course == "NON_COMMON";
/** @param {PeriodMinimal} period @returns {boolean} */
export const IS_PERIOD_CONFLICT = (period) => period.course == "CONFLICT";

//=| Courses |================================================================//

/** @typedef {{room:string, instructor:string, days:string}} Section */
/** @typedef {Object.<string, Section>} Sections */
/** @typedef {{title:string, title_short:string, IC:string, sections:Sections}} Course */
/** @typedef {Object.<string, Course>} Semester */

/** @type {Semester} Courses under Year 1 Semester 1 */
const SEMESTER_Y1S1 = {
    "BIO F110": {
        title: "Biology Laboratory",
        title_short: "Biology Lab",
        IC: "D J Shariff",
        sections: {
            "P1": {room: "307", instructor: "D J SHARIFF"              , days: "M34"},
            "P2": {room: "307", instructor: "D J SHARIFF"              , days: "M89"},
            "P3": {room: "307", instructor: "Neeru Sood"               , days: "T45"},
            "P4": {room: "307", instructor: "Neeru Sood"               , days: "T89"},
            "P5": {room: "307", instructor: "D J SHARIFF"              , days: "W89"},
            "P6": {room: "307", instructor: "D J SHARIFF"              , days: "Th34"},
            "P7": {room: "307", instructor: "Neeru Sood"               , days: "Th89"},
        },
    },
    "BIO F111": {
        title: "General Biology",
        title_short: "Biology",
        IC: "Neeru Sood",
        sections: {
            "L1": {room: "101", instructor: "D J SHARIFF"              , days: "M1 W4 Th6 F2"},
            "L2": {room: "105", instructor: "Neeru Sood"               , days: "M1 W4 Th6 F2"},
            "L3": {room: "123", instructor: "Mainak Dutta"             , days: "M1 W4 Th6 F2"},
        },
    },
    "BITS F110": {
        title: "Engineering Graphics",
        title_short: "Engg. Graphics",
        IC: "Meghana S Charde",
        sections: {
            "L1": {room: "101", instructor: "MEGHANA S CHARDE"         , days: "W1"},
            "L2": {room: "101", instructor: "Deepthi Mary Dilip"       , days: "T5"},
            "L3": {room: "123", instructor: "Akshay Venkateshwaran"    , days: "W1"},
            "P1": {room: "MS5", instructor: "Deepthi Mary Dilip"       , days: "M34"},
            "P2": {room: "MS5", instructor: "MEGHANA S CHARDE"         , days: "T89"},
            "P3": {room: "MS5", instructor: "Akshay Venkateshwaran"    , days: "Th34"},
        },
    },
    "BITS F111": {
        title: "Thermodynamics",
        title_short: "Thermodynamics",
        IC: "Snehaunshu Choudhury",
        sections: {
            "L1": {room: "189", instructor: "Naveen Shrivastava"       , days: "M4 T1 W2 F5"},
            "L2": {room: "165", instructor: "SNEHAUNSHU CHOUDHURY"     , days: "M4 T1 W2 F5"},
            "L3": {room: "190", instructor: "Majid Hasan Khan"         , days: "M4 T1 W2 F5"},
        },
    },
    "BITS F112": {
        title: "Technical Report Writing",
        title_short: "Tech. Report W.",
        IC: "Sayantan Chakraborty",
        sections: {
            "L1": {room: "334", instructor: "Shazi S J"                , days: "T7 F5"},
            "L2": {room: "336", instructor: "SAYANTAN CHAKRABORTY"     , days: "T7 F5"},
        },
    },
    "CHEM F110": {
        title: "Chemistry Laboratory",
        title_short: "Chemistry Lab",
        IC: "Geetha Kannan",
        sections: {
            "P1": {room: "306", instructor: "Vijaya Ilango"            , days: "M34"},
            "P2": {room: "306", instructor: "GEETHA KANNAN"            , days: "M89"},
            "P3": {room: "306", instructor: "Vijaya Ilango"            , days: "T89"},
            "P4": {room: "306", instructor: "GEETHA KANNAN"            , days: "W89"},
            "P5": {room: "306", instructor: "GEETHA KANNAN"            , days: "Th34"},
            "P6": {room: "306", instructor: "Vijaya Ilango"            , days: "Th89"},
        },
    },
    "CHEM F111": {
        title: "General Chemistry",
        title_short: "Chemistry",
        IC: "Vijaya Ilango",
        sections: {
            "L1": {room: "101", instructor: "Vijaya Ilango"            , days: "M6 T1 W2 F4"},
            "L2": {room: "105", instructor: "Rusal Raj"                , days: "M6 T1 W2 F4"},
            "L3": {room: "123", instructor: "GEETHA KANNAN"            , days: "M6 T1 W2 F4"},
        },
    },
    "CS F111": {
        title: "Computer Programming",
        title_short: "Comp. Prog.",
        IC: "Sapna Sadhwani",
        sections: {
            "L1": {room: "105", instructor: "Pramod Gaur"              , days: "M2 W3 Th5 F1"},
            "L2": {room: "101", instructor: "SAPNA SADHWANI"           , days: "M2 W3 Th5 F1"},
            "L3": {room: "101", instructor: "Pramod Gaur"              , days: "T3 W5 Th2 F3"},
            "P1": {room: "335", instructor: "B Vijayakumar"            , days: "M89"},
            "P2": {room: "335", instructor: "S Vadivel"                , days: "W89"},
            "P3": {room: "335", instructor: "Pranav Mothabhau Pawar"   , days: "Th89"},
        },
    },
    "EEE F111": {
        title: "Electrical Sciences",
        title_short: "Elec. Sciences",
        IC: "T G Thomas",
        sections: {
            "L1": {room: "165", instructor: "T G THOMAS"               , days: "M1 W6 Th2 F4"},
            "L2": {room: "189", instructor: "V Kalaichelvi"            , days: "M1 W6 Th2 F4"},
            "L3": {room: "190", instructor: "Sunil Thomas"             , days: "M1 W6 Th2 F4"},
        },
    },
    "MATH D021": {
        title: "Remedial Mathematics",
        title_short: "Remedial Math",
        IC: "K Kumar",
        sections: {
            "L1": {room: "165", instructor: "A Somasundaram/K KUMAR"   , days: "M5 T2 W9 Th8"},
        },
    },
    "MATH F111": {
        title: "Mathematics I",
        title_short: "Math I",
        IC: "Suhel Ahmad Khan",
        sections: {
            "L1": {room: "101", instructor: "Priti Bajpai"             , days: "M5 T2 W7 Th1"},
            "L2": {room: "105", instructor: "SUHEL AHMAD KHAN"         , days: "M5 T2 W7 Th1"},
            "L3": {room: "123", instructor: "K Kumar"                  , days: "M5 T2 W7 Th1"},
            "L4": {room: "165", instructor: "SUHEL AHMAD KHAN"         , days: "M3 T5 Th5 F3"},
            "L5": {room: "123", instructor: "Priti Bajpai"             , days: "M3 T5 Th5 F3"},
            "L6": {room: "189", instructor: "K Kumar"                  , days: "M3 T5 W5 Th5"},
        },
    },
    "MATH F113": {
        title: "Probability & Statistics",
        title_short: "Prob. & Stats",
        IC: "Maneesha",
        sections: {
            "L1": {room: "165", instructor: "MANEESHA"                 , days: "M7 T9 W5 F1"},
            "L2": {room: "190", instructor: "SUHEL AHMAD KHAN"         , days: "M7 T9 W5 F1"},
            "L3": {room: "190", instructor: "MANEESHA"                 , days: "M5 T2 W9 Th3"},
        },
    },
    "ME F112": {
        title: "Workshop Practice",
        title_short: "Workshop Practice",
        IC: "Ravindra Giriraj Bhardwaj",
        sections: {
            "L1": {room: "165", instructor: "RAVINDRA GIRIRAJ BHARDWAJ", days: "T3"},
            "L2": {room: "189", instructor: "RAVINDRA GIRIRAJ BHARDWAJ", days: "W8"},
            "L3": {room: "165", instructor: "RAVINDRA GIRIRAJ BHARDWAJ", days: "Th4"},
            "P1": {room: "MG1", instructor: "Gulshan Kumar"            , days: "M89"},
            "P2": {room: "MG1", instructor: "Naveen Shrivastava"       , days: "T34"},
            "P3": {room: "MG1", instructor: "Priyank Upadhyaya"        , days: "T89"},
            "P4": {room: "MG1", instructor: "RAVINDRA GIRIRAJ BHARDWAJ", days: "W34"},
            "P5": {room: "MG1", instructor: "Harpreet Singh Bedi"      , days: "W89"},
            "P6": {room: "MG1", instructor: "Ram Karthikeyan"          , days: "Th34"},
            "P7": {room: "MG1", instructor: "Snehaunshu Choudhury"     , days: "Th89"},
        },
    },
    "PHY F110": {
        title: "Physics Laboratory",
        title_short: "Physics Lab.",
        IC: "G Amaranath",
        sections: {
            "P1": {room: "309", instructor: "R Roop Kumar"             , days: "M89"},
            "P2": {room: "309", instructor: "K K Singh"                , days: "T34"},
            "P3": {room: "309", instructor: "G AMARANATH"              , days: "T89"},
            "P4": {room: "309", instructor: "R Roop Kumar"             , days: "W34"},
            "P5": {room: "309", instructor: "G AMARANATH"              , days: "W89"},
            "P6": {room: "309", instructor: "K K Singh"                , days: "Th34"},
            "P7": {room: "309", instructor: "R Roop Kumar"             , days: "Th89"},
            "P8": {room: "309", instructor: "R Roop Kumar"             , days: "F23"},
        },
    },
    "PHY F111": {
        title: "Mech Oscillations & Wave",
        title_short: "Mech, Osc. & Waves",
        IC: "R Roop Kumar",
        sections: {
            "L1": {room: "165", instructor: "R Roop Kumar"             , days: "M2 T6 W1 Th6"},
            "L2": {room: "189", instructor: "K K Singh"                , days: "M2 T6 W1 Th6"},
            "L3": {room: "190", instructor: "G AMARANATH"              , days: "M2 T6 W1 Th6"},
        },
    },
};

/** @type {Semester} Courses under Year 1 Semester 2 */
const SEMESTER_Y1S2 = {
    "BIO F110": {
        title: "Biology Laboratory",
        title_short: "Bio Lab",
        IC: "D J Shariff",
        sections: {
            "P1": {instructor: "D J SHARIFF"           , room: "307" , days: "M34"},
            "P2": {instructor: "Pallab Sanpui"         , room: "307" , days: "M89"},
            "P3": {instructor: "D J Shariff"           , room: "307" , days: "T34"},
            "P4": {instructor: "Neeru Sood"            , room: "307" , days: "W12"},
            "P5": {instructor: "Mainak Dutta"          , room: "307" , days: "W89"},
            "P6": {instructor: "Neeru Sood"            , room: "307" , days: "Th34"},
            "P7": {instructor: "D J Shariff"           , room: "307" , days: "Th89"},
        },
    },
    "BIO F111": {
        title: "General Biology",
        title_short: "Biology",
        IC: "Neeru Sood",
        sections: {
            "L1": {instructor: "NEERU SOOD"            , room: "101" , days: "M5 T6 Th1 F2"},
            "L2": {instructor: "D J Shariff"           , room: "123" , days: "M1 T6 W2 F2"},
            "L3": {instructor: "S Ramachandran"        , room: "165" , days: "M5 T6 Th1 F2"},
        },
    },
    "BITS F110": {
        title: "Engineering Graphics",
        title_short: "Engg. Graphics",
        IC: "Meghana S Charde",
        sections: {
            "L1": {instructor: "Akshay Venkateshwaran" , room: "101" , days: "T2"},
            "L2": {instructor: "MEGHANA S CHARDE"      , room: "165" , days: "M1"},
            "L3": {instructor: "MEGHANA S CHARDE"      , room: "123" , days: "T2"},
            "P1": {instructor: "MEGHANA S CHARDE"      , room: "MS5" , days: "M89"},
            "P2": {instructor: "Akshay Venkateshwaran" , room: "MS5" , days: "W34"},
            "P3": {instructor: "MEGHANA S CHARDE"      , room: "MS5" , days: "Th89"},
        },
    },
    "BITS F111": {
        title: "Thermodynamics",
        title_short: "Thermodynamics",
        IC: "Shashank Khurana",
        sections: {
            "L1": {instructor: "SHASHANK KHURANA"      , room: "183" , days: "T1 W6 Th2 F4"},
            "L2": {instructor: "Vincent Kumar"         , room: "189" , days: "T1 W6 Th2 F4"},
            "L3": {instructor: "Majid H Khan"          , room: "190" , days: "T1 W6 Th2 F4"},
        },
    },
    "BITS F112": {
        title: "Technical Report Writing",
        title_short: "TRW",
        IC: "Sayantan Chakraborty",
        sections: {
            "L1": {instructor: "SAYANTAN CHAKRABORTY"  , room: "334" , days: "T8 F5"},
            "L2": {instructor: "Shazi S J"             , room: "336" , days: "T8 F5"},
        },
    },
    "CHEM F110": {
        title: "Chemistry Laboratory",
        title_short: "Chem Lab",
        IC: "Vijaya Ilango",
        sections: {
            "P1": {instructor: "Rusal Raj"             , room: "306" , days: "M34"},
            "P2": {instructor: "VIJAYA ILANGO"         , room: "306" , days: "M89"},
            "P3": {instructor: "Rusal Raj"             , room: "306" , days: "W34"},
            "P4": {instructor: "VIJAYA ILANGO"         , room: "306" , days: "W89"},
            "P5": {instructor: "Rusal Raj"             , room: "306" , days: "Th34"},
            "P6": {instructor: "Geetha"                , room: "306" , days: "Th89"},
        },
    },
    "CHEM F111": {
        title: "General Chemistry",
        title_short: "Chemistry",
        IC: "Vijaya Ilango",
        sections: {
            "L1": {instructor: "VIJAYA ILANGO"         , room: "101" , days: "M6 T1 Th6 F3"},
            "L2": {instructor: "Geetha"                , room: "123" , days: "M6 T1 Th6 F3"},
            "L3": {instructor: "Rusal Raj"             , room: "165" , days: "M6 T1 Th6 F3"},
        },
    },
    "CS F111": {
        title: "Computer Programming",
        title_short: "Computer Prog.",
        IC: "Sapna Sadhwani",
        sections: {
            "L1": {instructor: "SAPNA SADHWANI"        , room: "101" , days: "M1 T9 W6 Th2"},
            "L2": {instructor: "Pramod Gaur"           , room: "123" , days: "M2 T9 W6 Th2"},
            "L3": {instructor: "Sapna Sadhwani"        , room: "165" , days: "T2 W2 Th4 F4"},
            "P1": {instructor: "Sapna Sadhwani"        , room: "333" , days: "M34"},
            "P2": {instructor: "Pramod Gaur"           , room: "333" , days: "T34"},
            "P3": {instructor: "Sapna Sadhwani"        , room: "333" , days: "W89"},
        },
    },
    "EEE F111": {
        title: "Electrical Sciences",
        title_short: "Electrical",
        IC: "T G Thomas",
        sections: {
            "L1": {instructor: "T G THOMAS"            , room: "183" , days: "M5 T2 Th7 F5"},
            "L2": {instructor: "Sunil Thomas"          , room: "189" , days: "M5 T2 Th7 F5"},
            "L3": {instructor: "T G Thomas"            , room: "190" , days: "M1 W2 Th3 F3"},
        },
    },
    "MATH F112": {
        title: "Mathematics II",
        title_short: "Math II",
        IC: "S Baskaran",
        sections: {
            "L1": {instructor: "S BASKARAN"            , room: "101" , days: "T5 W5 Th5 F1"},
            "L2": {instructor: "K Kumar"               , room: "123" , days: "T5 W5 Th5 F4"},
            "L3": {instructor: "Priti Bajpai"          , room: "165" , days: "T5 W5 Th5 F1"},
            "L4": {instructor: "A Somasundaram"        , room: "183" , days: "T5 W5 Th5 F1"},
            "L5": {instructor: "Suhel Ahmed Khan"      , room: "190" , days: "T5 W5 Th5 F1"},
            "L6": {instructor: "Priti Bajpai"          , room: "189" , days: "M2 T3 W8 Th8"},
        },
    },
    "MATH F113": {
        title: "Probability & Statistics",
        title_short: "Prob. & Stats",
        IC: "Suhel Ahmed Khan",
        sections: {
            "L1": {instructor: "SUHEL AHMED KHAN"      , room: "183" , days: "M1 T8 W2 F3"},
            "L2": {instructor: "Maneesha"              , room: "190" , days: "M5 T2 Th7 F5"},
            "L3": {instructor: "Maneesha"              , room: "189" , days: "M1 T4 W2 F3"},
        },
    },
    "ME F112": {
        title: "Workshop Practice",
        title_short: "Workshop",
        IC: "Ravindra D Bhardwaj",
        sections: {
            "L1": {instructor: "RAVINDRA D BHARDWAJ"   , room: "190" , days: "M2"},
            "L2": {instructor: "Ravindra D Bhardwaj"   , room: "189" , days: "W9"},
            "L3": {instructor: "Ravindra D Bhardwaj"   , room: "183" , days: "Th1"},
            "P1": {instructor: "Majid H Khan"          , room: "MG1" , days: "M34"},
            "P2": {instructor: "Harpreet Singh"        , room: "MG1" , days: "M89"},
            "P3": {instructor: "Naveen Shrivastava"    , room: "MG1" , days: "T34"},
            "P4": {instructor: "Majid H Khan"          , room: "MG1" , days: "T89"},
            "P5": {instructor: "Harpreet Singh"        , room: "MG1" , days: "W34"},
            "P6": {instructor: "Priyank Upadhyaya"     , room: "MG1" , days: "Th34"},
            "P7": {instructor: "Naveen Shrivastava"    , room: "MG1" , days: "Th89"},
        },
    },
    "PHY F110": {
        title: "Physics Laboratory",
        title_short: "Phy Lab",
        IC: "R Roopkumar",
        sections: {
            "P1": {instructor: "R ROOPKUMAR"           , room: "309" , days: "M34"},
            "P2": {instructor: "Amarnath"              , room: "309" , days: "M89"},
            "P3": {instructor: "R Roopkumar"           , room: "309" , days: "T34"},
            "P4": {instructor: "K K Singh"             , room: "309" , days: "T89"},
            "P5": {instructor: "K K Singh"             , room: "309" , days: "W34"},
            "P6": {instructor: "Amarnath"              , room: "309" , days: "W89"},
            "P7": {instructor: "R Roopkumar"           , room: "309" , days: "Th34"},
            "P8": {instructor: "Amarnath"              , room: "309" , days: "Th89"},
        },
    },
    "PHY F111": {
        title: "Mech Oscillations & Wave",
        title_short: "MOWaves",
        IC: "Amarnath",
        sections: {
            "L1": {instructor: "AMARNATH"              , room: "183" , days: "M6 T6 W1 F2"},
            "L2": {instructor: "K K Singh"             , room: "189" , days: "M6 T6 W1 F2"},
            "L3": {instructor: "R Roopkumar"           , room: "190" , days: "M6 T6 W1 F2"},
        },
    },
};

//=| Friends |================================================================//

/** @typedef {Object.<string, string[]>} Student */
/** @typedef {Object.<string, Student>} Students */

/** @type {Students} Friends' timetables under Year 1 Semester 1 */
const FRIENDS_Y1S1 = {
    "034 - Sreenikethan Iyer":  {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "029 - Adithya Nandakumar": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "031 - Ritvik Bhatnagar":   {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "036 - Mohammed Emaan":     {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "077 - Adithya Sunoj":      {"BIO F110":["P3"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L2"],"CHEM F110":["P5"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "050 - Aditya Agarwal":     {"BIO F110":["P2"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L2"],"CHEM F110":["P5"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "003 - Stellin John":       {"BIO F110":["P6"],"BIO F111":["L1"],"BITS F110":["L2","P1"],"BITS F112":["L1"],"CHEM F110":["P6"],"CHEM F111":["L1"],"CS F111":["L1","P2"],"MATH F111":["L1"]},
    "321 - Karthik Narayan":    {"BITS F111":["L3"],"EEE F111":["L3"],"MATH F111":["L6"],"MATH F113":["L3"],"ME F112":["L3","P3"],"PHY F110":["P2"],"PHY F111":["L3"]},
    "298 - Lakesh Thangadurai": {"BITS F111":["L2"],"EEE F111":["L2"],"MATH F111":["L5"],"MATH F113":["L2"],"ME F112":["L2","P7"],"PHY F110":["P2"],"PHY F111":["L2"]},

    // "sample": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    // "sample": {"BIO F111":["L2","L1"]},
    // "sample": {"BIO F111":["L2"],"CS F111":["L2"]},
    "sample": {"BIO F111":["L2"],"CS F111":["L2","P3","L1"]},

};

/** @type {Students} Friends' timetables under Year 1 Semester 2 */
const FRIENDS_Y1S2 = {
    "Ryan":               {"BITS F111": ["L1"], "EEE F111": ["L1"], "MATH F112": ["L4"], "MATH F113": ["L1"], "ME F112": ["L3","P2"], "PHY F110": ["P7"], "PHY F111": ["L1"]},
    "Ritvik":             {"BITS F111": ["L1"], "EEE F111": ["L1"], "MATH F112": ["L4"], "MATH F113": ["L1"], "ME F112": ["L3","P2"], "PHY F110": ["P7"], "PHY F111": ["L1"]},
    "Adithya Nandakumar": {"BITS F111": ["L1"], "EEE F111": ["L1"], "MATH F112": ["L4"], "MATH F113": ["L1"], "ME F112": ["L3","P2"], "PHY F110": ["P7"], "PHY F111": ["L1"]},
    "Sreeni":             {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L4"], "MATH F113": ["L3"], "ME F112": ["L2","P2"], "PHY F110": ["P8"], "PHY F111": ["L2"]},
    "Emaan":              {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L4"], "MATH F113": ["L3"], "ME F112": ["L2","P2"], "PHY F110": ["P8"], "PHY F111": ["L2"]},
    "Aditya Agarwal":     {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L6"], "MATH F113": ["L3"], "ME F112": ["L2","P2"], "PHY F110": ["P4"], "PHY F111": ["L2"]},
    "Adithya Sunoj":      {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L6"], "MATH F113": ["L3"], "ME F112": ["L2","P6"], "PHY F110": ["P5"], "PHY F111": ["L2"]},
    "Stephen":            {"BITS F111": ["L2"], "EEE F111": ["L2"], "MATH F112": ["L6"], "MATH F113": ["L3"], "ME F112": ["L2","P6"], "PHY F110": ["P5"], "PHY F111": ["L2"]},
};

//=| Collections of all semesters |===========================================//

/** @type {Semester[]} List of courses under all semesters. */
export const SEMESTERS = [
    SEMESTER_Y1S1,
    SEMESTER_Y1S2,
];

/** @type {Students[]} List of friends' timetables under all semesters. */
export const FRIENDS = [
    FRIENDS_Y1S1,
    FRIENDS_Y1S2,
];
