"use strict";

export const EMPTY_COURSE = {"title": "", "IC": ""};
export const EMPTY_COURSE_SECTION = {};
export const EMPTY_SECTION = {"room": "", "instructor": ""};
export const EMPTY_ROOM = {};
export const FIELDS = ["course", "title", "title_short", "IC", "section", "instructor", "room", "section_room"];
export const FIELDS_NAMES = {"course":"Code","title":"Title","title_short":"Title","IC":"IC","section":"Section","instructor":"Instructor","room":"Room","section_room":"Sec/Room"};
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const DAYS_SHORT = ["M", "T", "W", "Th", "F"];
// Below are in minutes.
export const PERIOD_START = 7*60 + 30;
export const PERIOD_DURATION = 50;
export const PERIOD_BREAK = 5;
export const PERIOD_NON_COMMON = {"course": "NON_COMMON"};
export const PERIOD_CONFLICT = {"course": "CONFLICT"};

// export const COURSES = {
//     "BIO F110":  {"title": "Biology Laboratory"      , "title_short": "Biology Lab"       , "IC": "D J Shariff"              },
//     "BIO F111":  {"title": "General Biology"         , "title_short": "Biology"           , "IC": "Neeru Sood"               },
//     "BITS F110": {"title": "Engineering Graphics"    , "title_short": "Engg. Graphics"    , "IC": "Meghana S Charde"         },
//     "BITS F111": {"title": "Thermodynamics"          , "title_short": "Thermodynamics"    , "IC": "Snehaunshu Choudhury"     },
//     "BITS F112": {"title": "Technical Report Writing", "title_short": "Tech. Report W."   , "IC": "Sayantan Chakraborty"     },
//     "CHEM F110": {"title": "Chemistry Laboratory"    , "title_short": "Chemistry Lab"     , "IC": "Geetha Kannan"            },
//     "CHEM F111": {"title": "General Chemistry"       , "title_short": "Chemistry"         , "IC": "Vijaya Ilango"            },
//     "CS F111":   {"title": "Computer Programming"    , "title_short": "Comp. Prog."       , "IC": "Sapna Sadhwani"           },
//     "EEE F111":  {"title": "Electrical Sciences"     , "title_short": "Elec. Sciences"    , "IC": "T G Thomas"               },
//     "MATH D021": {"title": "Remedial Mathematics"    , "title_short": "Remedial Math"     , "IC": "K Kumar"                  },
//     "MATH F111": {"title": "Mathematics I"           , "title_short": "Math I"            , "IC": "Suhel Ahmad Khan"         },
//     "MATH F113": {"title": "Probability & Statistics", "title_short": "Prob. & Stats"     , "IC": "Maneesha"                 },
//     "ME F112":   {"title": "Workshop Practice"       , "title_short": "Workshop Practice" , "IC": "Ravindra Giriraj Bhardwaj"},
//     "PHY F110":  {"title": "Physics Laboratory"      , "title_short": "Physics Lab."      , "IC": "G Amaranath"              },
//     "PHY F111":  {"title": "Mech Oscillations & Wave", "title_short": "Mech, Osc. & Waves", "IC": "R Roop Kumar"             },
// };

const COURSES_Y1S1 = {
    "BIO F110": { // Biology Laboratory
        "title": "Biology Laboratory",
        "title_short": "Biology Lab",
        "IC": "D J Shariff",
        "sections": {
            "P1": {"room": "307", "instructor": "D J SHARIFF"              , "days": "M34"},
            "P2": {"room": "307", "instructor": "D J SHARIFF"              , "days": "M89"},
            "P3": {"room": "307", "instructor": "Neeru Sood"               , "days": "T45"},
            "P4": {"room": "307", "instructor": "Neeru Sood"               , "days": "T89"},
            "P5": {"room": "307", "instructor": "D J SHARIFF"              , "days": "W89"},
            "P6": {"room": "307", "instructor": "D J SHARIFF"              , "days": "Th34"},
            "P7": {"room": "307", "instructor": "Neeru Sood"               , "days": "Th89"},
        },
    },
    "BIO F111": { // General Biology
        "title": "General Biology",
        "title_short": "Biology",
        "IC": "Neeru Sood",
        "sections": {
            "L1": {"room": "101", "instructor": "D J SHARIFF"              , "days": "M1 W4 Th6 F2"},
            "L2": {"room": "105", "instructor": "Neeru Sood"               , "days": "M1 W4 Th6 F2"},
            "L3": {"room": "123", "instructor": "Mainak Dutta"             , "days": "M1 W4 Th6 F2"},
        },
    },
    "BITS F110": { // Engineering Graphics
        "title": "Engineering Graphics",
        "title_short": "Engg. Graphics",
        "IC": "Meghana S Charde",
        "sections": {
            "L1": {"room": "101", "instructor": "MEGHANA S CHARDE"         , "days": "W1"},
            "L2": {"room": "101", "instructor": "Deepthi Mary Dilip"       , "days": "T5"},
            "L3": {"room": "123", "instructor": "Akshay Venkateshwaran"    , "days": "W1"},
            "P1": {"room": "MS5", "instructor": "Deepthi Mary Dilip"       , "days": "M34"},
            "P2": {"room": "MS5", "instructor": "MEGHANA S CHARDE"         , "days": "T89"},
            "P3": {"room": "MS5", "instructor": "Akshay Venkateshwaran"    , "days": "Th34"},
        },
    },
    "BITS F111": { // Thermodynamics
        "title": "Thermodynamics",
        "title_short": "Thermodynamics",
        "IC": "Snehaunshu Choudhury",
        "sections": {
            "L1": {"room": "189", "instructor": "Naveen Shrivastava"       , "days": "M4 T1 W2 F5"},
            "L2": {"room": "165", "instructor": "SNEHAUNSHU CHOUDHURY"     , "days": "M4 T1 W2 F5"},
            "L3": {"room": "190", "instructor": "Majid Hasan Khan"         , "days": "M4 T1 W2 F5"},
        },
    },
    "BITS F112": { // Technical Report Writing
        "title": "Technical Report Writing",
        "title_short": "Tech. Report W.",
        "IC": "Sayantan Chakraborty",
        "sections": {
            "L1": {"room": "334", "instructor": "Shazi S J"                , "days": "T7 F5"},
            "L2": {"room": "336", "instructor": "SAYANTAN CHAKRABORTY"     , "days": "T7 F5"},
        },
    },
    "CHEM F110": { // Chemistry Laboratory
        "title": "Chemistry Laboratory",
        "title_short": "Chemistry Lab",
        "IC": "Geetha Kannan",
        "sections": {
            "P1": {"room": "306", "instructor": "Vijaya Ilango"            , "days": "M34"},
            "P2": {"room": "306", "instructor": "GEETHA KANNAN"            , "days": "M89"},
            "P3": {"room": "306", "instructor": "Vijaya Ilango"            , "days": "T89"},
            "P4": {"room": "306", "instructor": "GEETHA KANNAN"            , "days": "W89"},
            "P5": {"room": "306", "instructor": "GEETHA KANNAN"            , "days": "Th34"},
            "P6": {"room": "306", "instructor": "Vijaya Ilango"            , "days": "Th89"},
        },
    },
    "CHEM F111": { // General Chemistry
        "title": "General Chemistry",
        "title_short": "Chemistry",
        "IC": "Vijaya Ilango",
        "sections": {
            "L1": {"room": "101", "instructor": "Vijaya Ilango"            , "days": "M6 T1 W2 F4"},
            "L2": {"room": "105", "instructor": "Rusal Raj"                , "days": "M6 T1 W2 F4"},
            "L3": {"room": "123", "instructor": "GEETHA KANNAN"            , "days": "M6 T1 W2 F4"},
        },
    },
    "CS F111": { // Computer Programming
        "title": "Computer Programming",
        "title_short": "Comp. Prog.",
        "IC": "Sapna Sadhwani",
        "sections": {
            "L1": {"room": "105", "instructor": "Pramod Gaur"              , "days": "M2 W3 Th5 F1"},
            "L2": {"room": "101", "instructor": "SAPNA SADHWANI"           , "days": "M2 W3 Th5 F1"},
            "L3": {"room": "101", "instructor": "Pramod Gaur"              , "days": "T3 W5 Th2 F3"},
            "P1": {"room": "335", "instructor": "B Vijayakumar"            , "days": "M89"},
            "P2": {"room": "335", "instructor": "S Vadivel"                , "days": "W89"},
            "P3": {"room": "335", "instructor": "Pranav Mothabhau Pawar"   , "days": "Th89"},
        },
    },
    "EEE F111": { // Electrical Sciences
        "title": "Electrical Sciences",
        "title_short": "Elec. Sciences",
        "IC": "T G Thomas",
        "sections": {
            "L1": {"room": "165", "instructor": "T G THOMAS"               , "days": "M1 W6 Th2 F4"},
            "L2": {"room": "189", "instructor": "V Kalaichelvi"            , "days": "M1 W6 Th2 F4"},
            "L3": {"room": "190", "instructor": "Sunil Thomas"             , "days": "M1 W6 Th2 F4"},
        },
    },
    "MATH D021": { // Remedial Mathematics
        "title": "Remedial Mathematics",
        "title_short": "Remedial Math",
        "IC": "K Kumar",
        "sections": {
            "L1": {"room": "165", "instructor": "A Somasundaram/K KUMAR"   , "days": "M5 T2 W9 Th8"},
        },
    },
    "MATH F111": { // Mathematics I
        "title": "Mathematics I",
        "title_short": "Math I",
        "IC": "Suhel Ahmad Khan",
        "sections": {
            "L1": {"room": "101", "instructor": "Priti Bajpai"             , "days": "M5 T2 W7 Th1"},
            "L2": {"room": "105", "instructor": "SUHEL AHMAD KHAN"         , "days": "M5 T2 W7 Th1"},
            "L3": {"room": "123", "instructor": "K Kumar"                  , "days": "M5 T2 W7 Th1"},
            "L4": {"room": "165", "instructor": "SUHEL AHMAD KHAN"         , "days": "M3 T5 Th5 F3"},
            "L5": {"room": "123", "instructor": "Priti Bajpai"             , "days": "M3 T5 Th5 F3"},
            "L6": {"room": "189", "instructor": "K Kumar"                  , "days": "M3 T5 W5 Th5"},
        },
    },
    "MATH F113": { // Probability & Statistics
        "title": "Probability & Statistics",
        "title_short": "Prob. & Stats",
        "IC": "Maneesha",
        "sections": {
            "L1": {"room": "165", "instructor": "MANEESHA"                 , "days": "M7 T9 W5 F1"},
            "L2": {"room": "190", "instructor": "SUHEL AHMAD KHAN"         , "days": "M7 T9 W5 F1"},
            "L3": {"room": "190", "instructor": "MANEESHA"                 , "days": "M5 T2 W9 Th3"},
        },
    },
    "ME F112": { // Workshop Practice
        "title": "Workshop Practice",
        "title_short": "Workshop Practice",
        "IC": "Ravindra Giriraj Bhardwaj",
        "sections": {
            "L1": {"room": "165", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "T3"},
            "L2": {"room": "189", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "W8"},
            "L3": {"room": "165", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "Th4"},
            "P1": {"room": "MG1", "instructor": "Gulshan Kumar"            , "days": "M89"},
            "P2": {"room": "MG1", "instructor": "Naveen Shrivastava"       , "days": "T34"},
            "P3": {"room": "MG1", "instructor": "Priyank Upadhyaya"        , "days": "T89"},
            "P4": {"room": "MG1", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "W34"},
            "P5": {"room": "MG1", "instructor": "Harpreet Singh Bedi"      , "days": "W89"},
            "P6": {"room": "MG1", "instructor": "Ram Karthikeyan"          , "days": "Th34"},
            "P7": {"room": "MG1", "instructor": "Snehaunshu Choudhury"     , "days": "Th89"},
        },
    },
    "PHY F110": { // Physics Laboratory
        "title": "Physics Laboratory",
        "title_short": "Physics Lab.",
        "IC": "G Amaranath",
        "sections": {
            "P1": {"room": "309", "instructor": "R Roop Kumar"             , "days": "M89"},
            "P2": {"room": "309", "instructor": "K K Singh"                , "days": "T34"},
            "P3": {"room": "309", "instructor": "G AMARANATH"              , "days": "T89"},
            "P4": {"room": "309", "instructor": "R Roop Kumar"             , "days": "W34"},
            "P5": {"room": "309", "instructor": "G AMARANATH"              , "days": "W89"},
            "P6": {"room": "309", "instructor": "K K Singh"                , "days": "Th34"},
            "P7": {"room": "309", "instructor": "R Roop Kumar"             , "days": "Th89"},
            "P8": {"room": "309", "instructor": "R Roop Kumar"             , "days": "F23"},
        },
    },
    "PHY F111": { // Mech Oscillations & Wave
        "title": "Mech Oscillations & Wave",
        "title_short": "Mech, Osc. & Waves",
        "IC": "R Roop Kumar",
        "sections": {
            "L1": {"room": "165", "instructor": "R Roop Kumar"             , "days": "M2 T6 W1 Th6"},
            "L2": {"room": "189", "instructor": "K K Singh"                , "days": "M2 T6 W1 Th6"},
            "L3": {"room": "190", "instructor": "G AMARANATH"              , "days": "M2 T6 W1 Th6"},
        },
    },
};

export const COURSES = [
    COURSES_Y1S1,
];

// export const TIMETABLES = {
//     "034 - Sreenikethan Iyer": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
//     "029 - Adithya Nandakumar": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
//     "031 - Ritvik Bhatnagar": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
//     "036 - Mohammed Emaan": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
//     "077 - Adithya Sunoj": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"BIO F110","section":"P3"},{"course":"BIO F110","section":"P3"},{"course":"","section":""},{"course":"BITS F112","section":"L2"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F110","section":"P5"},{"course":"CHEM F110","section":"P5"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L2"}]],
//     "050 - Aditya Agarwal": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"BIO F110","section":"P2"},{"course":"BIO F110","section":"P2"}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L2"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F110","section":"P5"},{"course":"CHEM F110","section":"P5"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L2"}]],
//     "003 - Stellin John": [[{"course":"BIO F111","section":"L1"},{"course":"CS F111","section":"L1"},{"course":"BITS F110","section":"P1"},{"course":"BITS F110","section":"P1"},{"course":"MATH F111","section":"L1"},{"course":"CHEM F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L1"},{"course":"MATH F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F110","section":"L2"},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"","section":""},{"course":"","section":""}],[{"course":"","section":""},{"course":"CHEM F111","section":"L1"},{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L1"},{"course":"CS F111","section":"P2"},{"course":"CS F111","section":"P2"}],[{"course":"MATH F111","section":"L1"},{"course":"","section":""},{"course":"BIO F110","section":"P6"},{"course":"BIO F110","section":"P6"},{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"CHEM F110","section":"P6"},{"course":"CHEM F110","section":"P6"}],[{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"CHEM F111","section":"L1"},{"course":"BITS F112","section":"L1"}]],
//     "321 - Karthik Narayan": [[{"course":"EEE F111","section":"L3"},{"course":"PHY F111","section":"L3"},{"course":"MATH F111","section":"L6"},{"course":"BITS F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"BITS F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"PHY F110","section":"P2"},{"course":"PHY F110","section":"P2"},{"course":"MATH F111","section":"L6"},{"course":"PHY F111","section":"L3"},{"course":"","section":""},{"course":"ME F112","section":"P3"},{"course":"ME F112","section":"P3"}],[{"course":"PHY F111","section":"L3"},{"course":"BITS F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L6"},{"course":"EEE F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L3"}],[{"course":"","section":""},{"course":"EEE F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"ME F112","section":"L3"},{"course":"MATH F111","section":"L6"},{"course":"PHY F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"EEE F111","section":"L3"},{"course":"BITS F111","section":"L3"}]],
//     "298 - Lakesh Thangadurai": [[{"course":"EEE F111","section":"L2"},{"course":"PHY F111","section":"L2"},{"course":"MATH F111","section":"L5"},{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"PHY F110","section":"P2"},{"course":"PHY F110","section":"P2"},{"course":"MATH F111","section":"L5"},{"course":"PHY F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"}],[{"course":"PHY F111","section":"L2"},{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"},{"course":"EEE F111","section":"L2"},{"course":"","section":""},{"course":"ME F112","section":"L2"},{"course":"","section":""}],[{"course":"","section":""},{"course":"EEE F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L5"},{"course":"PHY F111","section":"L2"},{"course":"","section":""},{"course":"ME F112","section":"P7"},{"course":"ME F112","section":"P7"}],[{"course":"MATH F113","section":"L2"},{"course":"","section":""},{"course":"MATH F111","section":"L5"},{"course":"EEE F111","section":"L2"},{"course":"BITS F111","section":"L2"}]],
// };

export const SECTIONS = {
    "034 - Sreenikethan Iyer": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "029 - Adithya Nandakumar": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "031 - Ritvik Bhatnagar": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "036 - Mohammed Emaan": {"BIO F110":["P1"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "077 - Adithya Sunoj": {"BIO F110":["P3"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L2"],"CHEM F110":["P5"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "050 - Aditya Agarwal": {"BIO F110":["P2"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L2"],"CHEM F110":["P5"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},
    "003 - Stellin John": {"BIO F110":["P6"],"BIO F111":["L1"],"BITS F110":["L2","P1"],"BITS F112":["L1"],"CHEM F110":["P6"],"CHEM F111":["L1"],"CS F111":["L1","P2"],"MATH F111":["L1"]},
    "321 - Karthik Narayan": {"BITS F111":["L3"],"EEE F111":["L3"],"MATH F111":["L6"],"MATH F113":["L3"],"ME F112":["L3","P3"],"PHY F110":["P2"],"PHY F111":["L3"]},
    "298 - Lakesh Thangadurai": {"BITS F111":["L2"],"EEE F111":["L2"],"MATH F111":["L5"],"MATH F113":["L2"],"ME F112":["L2","P7"],"PHY F110":["P2"],"PHY F111":["L2"]},

    "sample": {"BIO F110":["P1","P4"],"BIO F111":["L2"],"BITS F110":["L1","P2"],"BITS F112":["L1"],"CHEM F110":["P4"],"CHEM F111":["L2"],"CS F111":["L2","P3"],"MATH F111":["L2"]},

};
