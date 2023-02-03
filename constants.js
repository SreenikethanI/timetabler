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

export const COURSES = {
    "BIO F110":  {"title": "Biology Laboratory"      , "title_short": "Biology Lab"       , "IC": "D J Shariff"              },
    "BIO F111":  {"title": "General Biology"         , "title_short": "Biology"           , "IC": "Neeru Sood"               },
    "BITS F110": {"title": "Engineering Graphics"    , "title_short": "Engg. Graphics"    , "IC": "Meghana S Charde"         },
    "BITS F111": {"title": "Thermodynamics"          , "title_short": "Thermodynamics"    , "IC": "Snehaunshu Choudhury"     },
    "BITS F112": {"title": "Technical Report Writing", "title_short": "Tech. Report W."   , "IC": "Sayantan Chakraborty"     },
    "CHEM F110": {"title": "Chemistry Laboratory"    , "title_short": "Chemistry Lab"     , "IC": "Geetha Kannan"            },
    "CHEM F111": {"title": "General Chemistry"       , "title_short": "Chemistry"         , "IC": "Vijaya Ilango"            },
    "CS F111":   {"title": "Computer Programming"    , "title_short": "Comp. Prog."       , "IC": "Sapna Sadhwani"           },
    "EEE F111":  {"title": "Electrical Sciences"     , "title_short": "Elec. Sciences"    , "IC": "T G Thomas"               },
    "MATH D021": {"title": "Remedial Mathematics"    , "title_short": "Remedial Math"     , "IC": "K Kumar"                  },
    "MATH F111": {"title": "Mathematics I"           , "title_short": "Math I"            , "IC": "Suhel Ahmad Khan"         },
    "MATH F113": {"title": "Probability & Statistics", "title_short": "Prob. & Stats"     , "IC": "Maneesha"                 },
    "ME F112":   {"title": "Workshop Practice"       , "title_short": "Workshop Practice" , "IC": "Ravindra Giriraj Bhardwaj"},
    "PHY F110":  {"title": "Physics Laboratory"      , "title_short": "Physics Lab."      , "IC": "G Amaranath"              },
    "PHY F111":  {"title": "Mech Oscillations & Wave", "title_short": "Mech, Osc. & Waves", "IC": "R Roop Kumar"             },
};

export const SECTIONS = {
    "BIO F110": { // Biology Laboratory
        "P1": {"room": "307", "instructor": "D J SHARIFF"              , "days": "M_34"},
        "P2": {"room": "307", "instructor": "D J SHARIFF"              , "days": "M_89"},
        "P3": {"room": "307", "instructor": "Neeru Sood"               , "days": "T_45"},
        "P4": {"room": "307", "instructor": "Neeru Sood"               , "days": "T_89"},
        "P5": {"room": "307", "instructor": "D J SHARIFF"              , "days": "W_89"},
        "P6": {"room": "307", "instructor": "D J SHARIFF"              , "days": "Th_34"},
        "P7": {"room": "307", "instructor": "Neeru Sood"               , "days": "Th_89"},
    },
    "BIO F111": { // General Biology
        "L1": {"room": "101", "instructor": "D J SHARIFF"              , "days": "M_1 W_4 Th_6 F_2"},
        "L2": {"room": "105", "instructor": "Neeru Sood"               , "days": "M_1 W_4 Th_6 F_2"},
        "L3": {"room": "123", "instructor": "Mainak Dutta"             , "days": "M_1 W_4 Th_6 F_2"},
    },
    "BITS F110": { // Engineering Graphics
        "L1": {"room": "101", "instructor": "MEGHANA S CHARDE"         , "days": "W_1"},
        "L2": {"room": "101", "instructor": "Deepthi Mary Dilip"       , "days": "T_5"},
        "L3": {"room": "123", "instructor": "Akshay Venkateshwaran"    , "days": "W_1"},
        "P1": {"room": "MS5", "instructor": "Deepthi Mary Dilip"       , "days": "M_34"},
        "P2": {"room": "MS5", "instructor": "MEGHANA S CHARDE"         , "days": "T_89"},
        "P3": {"room": "MS5", "instructor": "Akshay Venkateshwaran"    , "days": "Th_34"},
    },
    "BITS F111": { // Thermodynamics
        "L1": {"room": "189", "instructor": "Naveen Shrivastava"       , "days": "M_4 T_1 W_2 F_5"},
        "L2": {"room": "165", "instructor": "SNEHAUNSHU CHOUDHURY"     , "days": "M_4 T_1 W_2 F_5"},
        "L3": {"room": "190", "instructor": "Majid Hasan Khan"         , "days": "M_4 T_1 W_2 F_5"},
    },
    "BITS F112": { // Technical Report Writing
        "L1": {"room": "334", "instructor": "Shazi S J"                , "days": "T_7 F_5"},
        "L2": {"room": "336", "instructor": "SAYANTAN CHAKRABORTY"     , "days": "T_7 F_5"},
    },
    "CHEM F110": { // Chemistry Laboratory
        "P1": {"room": "306", "instructor": "Vijaya Ilango"            , "days": "M_34"},
        "P2": {"room": "306", "instructor": "GEETHA KANNAN"            , "days": "M_89"},
        "P3": {"room": "306", "instructor": "Vijaya Ilango"            , "days": "T_89"},
        "P4": {"room": "306", "instructor": "GEETHA KANNAN"            , "days": "W_89"},
        "P5": {"room": "306", "instructor": "GEETHA KANNAN"            , "days": "Th_34"},
        "P6": {"room": "306", "instructor": "Vijaya Ilango"            , "days": "Th_89"},
    },
    "CHEM F111": { // General Chemistry
        "L1": {"room": "101", "instructor": "Vijaya Ilango"            , "days": "M_6 T_1 W_2 F_4"},
        "L2": {"room": "105", "instructor": "Rusal Raj"                , "days": "M_6 T_1 W_2 F_4"},
        "L3": {"room": "123", "instructor": "GEETHA KANNAN"            , "days": "M_6 T_1 W_2 F_4"},
    },
    "CS F111": { // Computer Programming
        "L1": {"room": "105", "instructor": "Pramod Gaur"              , "days": "M_2 W_3 Th_5 F_1"},
        "L2": {"room": "101", "instructor": "SAPNA SADHWANI"           , "days": "M_2 W_3 Th_5 F_1"},
        "L3": {"room": "101", "instructor": "Pramod Gaur"              , "days": "T_3 W_5 Th_2 F_3"},
        "P1": {"room": "335", "instructor": "B Vijayakumar"            , "days": "M_89"},
        "P2": {"room": "335", "instructor": "S Vadivel"                , "days": "W_89"},
        "P3": {"room": "335", "instructor": "Pranav Mothabhau Pawar"   , "days": "Th_89"},
    },
    "EEE F111": { // Electrical Sciences
        "L1": {"room": "165", "instructor": "T G THOMAS"               , "days": "M_1 W_6 Th_2 F_4"},
        "L2": {"room": "189", "instructor": "V Kalaichelvi"            , "days": "M_1 W_6 Th_2 F_4"},
        "L3": {"room": "190", "instructor": "Sunil Thomas"             , "days": "M_1 W_6 Th_2 F_4"},
    },
    "MATH D021": { // Remedial Mathematics
        "L1": {"room": "165", "instructor": "A Somasundaram/K KUMAR"   , "days": "M_5 T_2 W_9 Th_8"},
    },
    "MATH F111": { // Mathematics I
        "L1": {"room": "101", "instructor": "Priti Bajpai"             , "days": "M_5 T_2 W_7 Th_1"},
        "L2": {"room": "105", "instructor": "SUHEL AHMAD KHAN"         , "days": "M_5 T_2 W_7 Th_1"},
        "L3": {"room": "123", "instructor": "K Kumar"                  , "days": "M_5 T_2 W_7 Th_1"},
        "L4": {"room": "165", "instructor": "SUHEL AHMAD KHAN"         , "days": "M_3 T_5 Th_5 F_3"},
        "L5": {"room": "123", "instructor": "Priti Bajpai"             , "days": "M_3 T_5 Th_5 F_3"},
        "L6": {"room": "189", "instructor": "K Kumar"                  , "days": "M_3 T_5 W_5 Th_5"},
    },
    "MATH F113": { // Probability & Statistics
        "L1": {"room": "165", "instructor": "MANEESHA"                 , "days": "M_7 T_9 W_5 F_1"},
        "L2": {"room": "190", "instructor": "SUHEL AHMAD KHAN"         , "days": "M_7 T_9 W_5 F_1"},
        "L3": {"room": "190", "instructor": "MANEESHA"                 , "days": "M_5 T_2 W_9 Th_3"},
    },
    "ME F112": { // Workshop Practice
        "L1": {"room": "165", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "T_3"},
        "L2": {"room": "189", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "W_8"},
        "L3": {"room": "165", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "Th_4"},
        "P1": {"room": "MG1", "instructor": "Gulshan Kumar"            , "days": "M_89"},
        "P2": {"room": "MG1", "instructor": "Naveen Shrivastava"       , "days": "T_34"},
        "P3": {"room": "MG1", "instructor": "Priyank Upadhyaya"        , "days": "T_89"},
        "P4": {"room": "MG1", "instructor": "RAVINDRA GIRIRAJ BHARDWAJ", "days": "W_34"},
        "P5": {"room": "MG1", "instructor": "Harpreet Singh Bedi"      , "days": "W_89"},
        "P6": {"room": "MG1", "instructor": "Ram Karthikeyan"          , "days": "Th_34"},
        "P7": {"room": "MG1", "instructor": "Snehaunshu Choudhury"     , "days": "Th_89"},
    },
    "PHY F110": { // Physics Laboratory
        "P1": {"room": "309", "instructor": "R Roop Kumar"             , "days": "M_89"},
        "P2": {"room": "309", "instructor": "K K Singh"                , "days": "T_34"},
        "P3": {"room": "309", "instructor": "G AMARANATH"              , "days": "T_89"},
        "P4": {"room": "309", "instructor": "R Roop Kumar"             , "days": "W_34"},
        "P5": {"room": "309", "instructor": "G AMARANATH"              , "days": "W_89"},
        "P6": {"room": "309", "instructor": "K K Singh"                , "days": "Th_34"},
        "P7": {"room": "309", "instructor": "R Roop Kumar"             , "days": "Th_89"},
        "P8": {"room": "309", "instructor": "R Roop Kumar"             , "days": "F_23"},
    },
    "PHY F111": { // Mech Oscillations & Wave
        "L1": {"room": "165", "instructor": "R Roop Kumar"             , "days": "M_2 T_6 W_1 Th_6"},
        "L2": {"room": "189", "instructor": "K K Singh"                , "days": "M_2 T_6 W_1 Th_6"},
        "L3": {"room": "190", "instructor": "G AMARANATH"              , "days": "M_2 T_6 W_1 Th_6"},
    },
};

export const TIMETABLES = {
    "034 - Sreenikethan Iyer": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "029 - Adithya Nandakumar": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "031 - Ritvik Bhatnagar": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "036 - Mohammed Emaan": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F110","section":"P1"},{"course":"BIO F110","section":"P1"},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F110","section":"P4"},{"course":"CHEM F110","section":"P4"}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L1"}]],
    "077 - Adithya Sunoj": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"BIO F110","section":"P3"},{"course":"BIO F110","section":"P3"},{"course":"","section":""},{"course":"BITS F112","section":"L2"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F110","section":"P5"},{"course":"CHEM F110","section":"P5"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L2"}]],
    "050 - Aditya Agarwal": [[{"course":"BIO F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"CHEM F111","section":"L2"},{"course":"","section":""},{"course":"BIO F110","section":"P2"},{"course":"BIO F110","section":"P2"}],[{"course":"CHEM F111","section":"L2"},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F112","section":"L2"},{"course":"BITS F110","section":"P2"},{"course":"BITS F110","section":"P2"}],[{"course":"BITS F110","section":"L1"},{"course":"CHEM F111","section":"L2"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"MATH F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F110","section":"P5"},{"course":"CHEM F110","section":"P5"},{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CS F111","section":"P3"},{"course":"CS F111","section":"P3"}],[{"course":"CS F111","section":"L2"},{"course":"BIO F111","section":"L2"},{"course":"","section":""},{"course":"CHEM F111","section":"L2"},{"course":"BITS F112","section":"L2"}]],
    "003 - Stellin John": [[{"course":"BIO F111","section":"L1"},{"course":"CS F111","section":"L1"},{"course":"BITS F110","section":"P1"},{"course":"BITS F110","section":"P1"},{"course":"MATH F111","section":"L1"},{"course":"CHEM F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"CHEM F111","section":"L1"},{"course":"MATH F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"BITS F110","section":"L2"},{"course":"","section":""},{"course":"BITS F112","section":"L1"},{"course":"","section":""},{"course":"","section":""}],[{"course":"","section":""},{"course":"CHEM F111","section":"L1"},{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L1"},{"course":"CS F111","section":"P2"},{"course":"CS F111","section":"P2"}],[{"course":"MATH F111","section":"L1"},{"course":"","section":""},{"course":"BIO F110","section":"P6"},{"course":"BIO F110","section":"P6"},{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"CHEM F110","section":"P6"},{"course":"CHEM F110","section":"P6"}],[{"course":"CS F111","section":"L1"},{"course":"BIO F111","section":"L1"},{"course":"","section":""},{"course":"CHEM F111","section":"L1"},{"course":"BITS F112","section":"L1"}]],
    "321 - Karthik Narayan": [[{"course":"EEE F111","section":"L3"},{"course":"PHY F111","section":"L3"},{"course":"MATH F111","section":"L6"},{"course":"BITS F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"BITS F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"PHY F110","section":"P2"},{"course":"PHY F110","section":"P2"},{"course":"MATH F111","section":"L6"},{"course":"PHY F111","section":"L3"},{"course":"","section":""},{"course":"ME F112","section":"P3"},{"course":"ME F112","section":"P3"}],[{"course":"PHY F111","section":"L3"},{"course":"BITS F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L6"},{"course":"EEE F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L3"}],[{"course":"","section":""},{"course":"EEE F111","section":"L3"},{"course":"MATH F113","section":"L3"},{"course":"ME F112","section":"L3"},{"course":"MATH F111","section":"L6"},{"course":"PHY F111","section":"L3"},{"course":"","section":""},{"course":"","section":""},{"course":"","section":""}],[{"course":"","section":""},{"course":"","section":""},{"course":"","section":""},{"course":"EEE F111","section":"L3"},{"course":"BITS F111","section":"L3"}]],
    "298 - Lakesh Thangadurai": [[{"course":"EEE F111","section":"L2"},{"course":"PHY F111","section":"L2"},{"course":"MATH F111","section":"L5"},{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"},{"course":"","section":""},{"course":"","section":""}],[{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"PHY F110","section":"P2"},{"course":"PHY F110","section":"P2"},{"course":"MATH F111","section":"L5"},{"course":"PHY F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"}],[{"course":"PHY F111","section":"L2"},{"course":"BITS F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F113","section":"L2"},{"course":"EEE F111","section":"L2"},{"course":"","section":""},{"course":"ME F112","section":"L2"},{"course":"","section":""}],[{"course":"","section":""},{"course":"EEE F111","section":"L2"},{"course":"","section":""},{"course":"","section":""},{"course":"MATH F111","section":"L5"},{"course":"PHY F111","section":"L2"},{"course":"","section":""},{"course":"ME F112","section":"P7"},{"course":"ME F112","section":"P7"}],[{"course":"MATH F113","section":"L2"},{"course":"","section":""},{"course":"MATH F111","section":"L5"},{"course":"EEE F111","section":"L2"},{"course":"BITS F111","section":"L2"}]],
};
