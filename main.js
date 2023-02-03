//=| Timetable constants |====================================================//

const COURSES = {
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

const SECTIONS = {
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

const FIELDS_TO_SHOW = ["course", "title_short", "section_room"/*, "instructor"*/];

const EMPTY_COURSE = {"title": "", "IC": ""};
const EMPTY_COURSE_SECTION = {};
const EMPTY_SECTION = {"room": "", "instructor": ""};
const EMPTY_ROOM = {};
const FIELDS = ["course", "title", "title_short", "IC", "section", "instructor", "room", "section_room"];
const FIELDS_NAMES = {"course":"Code","title":"Title","title_short":"Title","IC":"IC","section":"Section","instructor":"Instructor","room":"Room","section_room":"Sec/Room"};
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// Below are in minutes.
const PERIOD_START = 7*60 + 30;
const PERIOD_DURATION = 50;
const PERIOD_BREAK = 5;
const PERIOD_NON_COMMON = {"course": "NON_COMMON"};

const TIMETABLES = {
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

//=| DOM related |============================================================//

/** @param {string} id */
const e = (id) => document.getElementById(id);
const DOM_TIMETABLE = "timetable";
const DOM_LIST = "list";
const DOM_LIST_OPTIONS = "list_options";
const DOM_COMPARE_MODE = "check_compare_mode";
const LEGEND_DISPLAY = "Choose timetable to display:";
const LEGEND_COMPARE = "Select timetables to compare:";

//=| Timetable helper methods |===============================================//

/** Creates a `DocumentFragment` containing header rows.
 * @returns {DocumentFragment} */
function createHeaderRow() {
    const row1 = document.createElement("tr");
    const blank = document.createElement("th");
    blank.rowSpan = 2; blank.colSpan = 2; blank.classList.add("blank");
    row1.append(blank);

    const row2 = document.createElement("tr");

    for (let i = 0; i < 9; i++) {
        const cell_row1 = document.createElement("th");
        cell_row1.classList.add("heading-period-num");
        cell_row1.innerText = i + 1;
        row1.append(cell_row1);

        const time_start = (PERIOD_START
            + PERIOD_DURATION * i
            + PERIOD_BREAK * i);
        const time_end = time_start + PERIOD_DURATION;

        const cell_row2 = document.createElement("td");
        cell_row2.classList.add("heading-period-time");
        cell_row2.innerText = `${formatTime(time_start)} - ${formatTime(time_end)}`;
        row2.append(cell_row2);
    }

    const df = document.createDocumentFragment();
    df.append(row1); df.append(row2);
    return df;
}

/** Parses a "days" string.
 * @param {string} daysString A "days" string, example: `"M_2 W_3 Th_5 F_1"`
 * @returns {Map<string,number[]>} A map containing day as key, and an array of
 * period numbers as value.
 * @example
 * <caption>Example for return value:</caption>
 * new Map([
 *     ["M":  [2,]],
 *     ["T":  [  ]],
 *     ["W":  [3,]],
 *     ["Th": [5,]],
 *     ["F":  [1,]],
 * ])
 */
function parseDays(daysString) {
    /** @type {Map<string,number[]>} */
    const parsed = new Map();

    daysString.split(" ").forEach(dayString => {
        let [day, periodsString] = dayString.split("_", 2);
        const periods = [];
        for (const period of periodsString)
            periods.push(parseInt(period));
        parsed.set(day, periods);
    });

    return parsed;
}

/** Compiles a weekly timetable object containing Course ID and Section from
 * the given list of subjects and sections enrolled by the student.
 * @param {*[]} courses An array of objects containing Course ID and Section.
 */
function compileTimetable(courses) {
    const timetable = [];

    // Preparing a template
    for (let i = 0; i < 5; i++) {
        const day = [];
        // The 9,9,9,9,5 denotes the number of periods per day
        for (let j = [9,9,9,9,5][i] - 1; j >= 0; j--)
            day.push({"course": "", "section": ""});
        timetable.push(day);
    }

    courses.forEach(course => {
        const courseID = course["course"], section = course["section"];

    });

    return timetable;
}

/** Returns a new timetable with complete details (a.k.a. "fields") added to the
 * periods of the given timetable.
 * @param {*} json A timetable which contains only Course ID and Section. */
function getTimetableFull(json) {
    const timetable = [];

    for (const day of json) {
        const day_detailed = [];
        for (const period of day) {
            /** @type {string} */ const course = period["course"];
            /** @type {string} */ const section = period["section"];

            const course_details = COURSES[course] || EMPTY_COURSE;
            const section_details = (SECTIONS[course] || EMPTY_COURSE_SECTION)[section] || EMPTY_SECTION;

            day_detailed.push({
                "course": course,
                "title": course_details["title"],
                "title_short": course_details["title_short"],
                "IC": course_details["IC"],

                "section": section,
                "instructor": section_details["instructor"],
                "room": section_details["room"],
                "section_room": `${section} - ${section_details["room"]}`
            })
        }
        timetable.push(day_detailed);
    }

    return timetable;
}

/** Returns a string Array containing the timetable names selected by the user.
 * @param {boolean} isCompareMode If `true`, only the first user choice will be
 * returned.
 * @returns {string[]} */
function getSelections(isCompareMode) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM_LIST);
    const sels = [];

    for (const option of list.querySelectorAll('label > input')) {
        if (option.checked) { sels.push(option.value); }
        if (!isCompareMode && sels.length) { break; }
    }
    return sels;
}

/** Gets whether compare mode is enabled by the user. @returns {boolean} */
function getIsCompareMode() { return e(DOM_COMPARE_MODE).checked; }

//=| Timetable display/compare methods |======================================//

/** Displays the given timetable.
 * @param {object} timetable Timetable object as returned by `getTimetableFull`.
 * @param {string[]} fields A string array of field names to display. */
function displayTimetable(timetable, fields) {
    if (!timetable) {return;}
    const fieldsFiltered = fields.filter((x) => FIELDS.includes(x));
    if (!fieldsFiltered) {return;}

    const df = document.createDocumentFragment();
    df.append(createHeaderRow());

    // For each day...
    for (let i_day = 0; i_day < timetable.length; i_day++) {
        /** An Array of periods in the current day. */
        const day = timetable[i_day];
        const row = document.createElement("tr");

        /** Table cell for showing the Day name. */
        const cell_day = document.createElement("th");
        cell_day.classList.add("day-name");
        cell_day.innerText = DAYS[i_day];

        /** Table cell for showing the field names (Course ID, room #, etc.) */
        const cell_fields = document.createElement("td");
        cell_fields.classList.add("day-fields");
        cell_fields.append(...fields.map((x) => {
            const p = document.createElement("p");
            p.innerText = FIELDS_NAMES[x];
            return p;
        }));

        row.append(cell_day, cell_fields);

        // For each period in the current day...
        for (let i_period = 0; i_period < day.length; i_period++) {
            const period = day[i_period];
            const isFree = !period["course"];
            const isNonCommon = compareJSON(period, PERIOD_NON_COMMON);

            // If current period is same as previous, extend the previous cell,
            // i.e. account for block periods.
            if (i_period > 0
                && !isFree && !isNonCommon
                && compareJSON(period, day[i_period - 1])) {
                row.lastChild.colSpan++;
                continue;
            }

            /** Table cell that represents a single period. */
            const cell_period = document.createElement("td");
            cell_period.classList.add("period");
            if (isFree) { // Free period
                cell_period.classList.add("period-free");
                cell_period.innerHTML = "&nbsp;";
            } else if (isNonCommon) { // Non-common period. Relevant when the
                // provided timetable is given by the `compareTimetables` function.
                cell_period.classList.add("period-noncommon");
                cell_period.innerHTML = "&times;";
            } else { // Normal busy period
                cell_period.append(...fields.map((field) => {
                    const p = document.createElement("p");
                    p.innerText = period[field];
                    return p;
                }));
            };
            row.append(cell_period);
        }
        df.append(row);
    }

    e(DOM_TIMETABLE).replaceChildren(df);
}

/** Displays the given timetable.
 * @param {*} timetableKey The key of the timetable. Refer to `TIMETABLES`.
 * @param {string[]} fields The fields to display. Refer to `FIELDS`. */
function displayTimetableKey(timetableKey, fields) {
    return displayTimetable(getTimetableFull(TIMETABLES[timetableKey]), fields);
}

/** Compares two or more timetables, and displays the common periods.
 * @param {string[]} timetableKeys The keys of the timetables to compare. Refer to `TIMETABLES`.
 * @param {string[]} fields The fields to display. Refer to `FIELDS`. */
function compareTimetables(timetableKeys, fields) {
    const fieldsFiltered = fields.filter((x) => FIELDS.includes(x));
    if (!fieldsFiltered) {return;}
    const timetables = timetableKeys.map((key) => TIMETABLES[key]).filter((tt) => tt).map((tt) => getTimetableFull(tt));
    if (!timetables.length) {return;}

    const commonTimetable = [];

    // Build a common timetable with 3 types of periods: Busy period, Free period,
    // and Non-common period.

    // For each day...
    for (let i_day = 0; i_day < timetables[0].length; i_day++) {
        const period_count = timetables[0][i_day].length;
        const day = [];

        // For each period in the current day...
        for (let i_period = 0; i_period < period_count; i_period++) {
            /** Determines whether the current period is common to all the given
             * timetables or not. @type {boolean} */
            let isCommon = true;
            /** Temporary variable for holding the current period. It is initialized
             * to the current period in the *first timetable*. The current period
             * in the remaining timetables will be compared with this one, and
             * `isCommon` will be updated accordingly.*/
            const period = timetables[0][i_day][i_period];

            // Note that i_tt starts at 1 (not 0) and ends at length-1.
            for (let i_tt = 1; i_tt < timetables.length; i_tt++) {
                const tt = timetables[i_tt];
                const tt_period = tt[i_day][i_period];
                isCommon = compareJSON(tt_period, period);
                if (!isCommon) break;
            }
            day.push(isCommon ? period : PERIOD_NON_COMMON);
        }

        commonTimetable.push(day);
    }

    // Finally call the `displayTimetable` function to actually handle displaying
    // the timetable to the user.
    displayTimetable(commonTimetable, fields);
}

/** Rebuilds the list of available timetables, as per `TIMETABLES`.
 * If user has selected "Compare timetables", then all choices will have
 * checkboxes rather than radio buttons.
 * Note that, if not in compare mode and `preserveSelections` is `true`, only
 * the first selection will be retained, and all choices will become radio buttons.
 * @param {*} preserveSelection `true` if the current user selection(s) are to be
 * preserved, else `false`.*/
function refreshTimetablesList(preserveSelection) {
    /** @type {HTMLFieldSetElement} */ const list = e(DOM_LIST);
    const isCompareMode = getIsCompareMode();

    // Get previous selections
    const previousSels = preserveSelection ? getSelections(isCompareMode) : [];

    // Create document fragment and a fieldset legend (its text depends on
    // the current mode)
    const listDf = document.createDocumentFragment();
    const legend = document.createElement("legend");
    legend.innerText = isCompareMode ? LEGEND_COMPARE : LEGEND_DISPLAY;
    listDf.append(legend);

    var firstOption = null; // Used later to focus the first option
    var index = 1;
    for (const key in TIMETABLES) {
        // Create label and radio elements
        if (!Object.hasOwnProperty.call(TIMETABLES, key)) {continue;}
        const label = document.createElement("label");
        const option = document.createElement("input");
        option.type = isCompareMode ? "checkbox" : "radio";
        option.name = DOM_LIST_OPTIONS;
        option.value = key;
        option.checked = previousSels.includes(key);
        option.addEventListener("input", handleSelectionChange);
        label.append(option);

        // Add numbering for each option, with accessKey set as well
        const optionNumber = document.createElement("b");
        optionNumber.append(" ");
        if (index <= 10) {
            option.accessKey = index % 10;
            if (index <= 10) {
                const underlined = document.createElement("u");
                if (index == 10) optionNumber.append("1");
                underlined.append(index % 10);
                optionNumber.append(underlined, ".");
            }
        } else optionNumber.append(index, ".");
        label.append(optionNumber, ` ${key}`);

        // Append label (containing radio button) to document fragment
        listDf.append(label, document.createElement("br"));
        if (!firstOption) {firstOption = option;}
        index++;
    }

    list.replaceChildren(listDf);
    if (!isCompareMode && !previousSels.length && firstOption) {
        // Focus first option if nothing was selected previously
        firstOption.checked = true;
        firstOption.focus();
    }
}

function handleSelectionChange() {
    const sels = getSelections(getIsCompareMode());

    if (!sels.length) { // No selection made
        e(DOM_TIMETABLE).replaceChildren(); // Clears all child elements
    } else if (!getIsCompareMode()) { // Display mode
        displayTimetableKey( sels[0], FIELDS_TO_SHOW );
    } else { // Compare mode
        compareTimetables( sels, FIELDS_TO_SHOW );
    }
}

//=| General |================================================================//

/** Converts given minutes into h:mm format.
 * @param {number} minutes
 * @returns {string} */
function formatTime(minutes) {
    minutes = minutes % 1440;
    const h = Math.floor(minutes / 60);
    const m = Math.floor(minutes - h * 60);
    const h_12 = (h % 12) || 12; // if h%12 is 0, then it'll be taken as 12.
    const am_pm = h > 11 ? "pm" : "am";
    const m_str = (m < 10 ? '0' : '') + m;
    return `${h_12}:${m_str}${am_pm}`;
}

/** Compares two objects by converting to a JSON string. @returns {boolean} */
function compareJSON(a, b) { return JSON.stringify(a) == JSON.stringify(b); }

function init() {
    refreshTimetablesList(false);
    handleSelectionChange();
}

function toggleTheme() {
    const link = e("darkThemeCSS");
    link.disabled = !link.disabled;
}
