from csv import reader
from os.path import isfile
from sys import argv
from typing import TypedDict

# Type definitions
Section = TypedDict("Section", {"room": str, "instructor": str, "days": str})
Sections = dict[str, Section]
Course = TypedDict("Course", {"title": str, "title_short": str, "IC": str, "sections": Sections})
Semester = dict[str, Course]

def bye():
    input("Press Enter to exit.")
    raise SystemExit

def create_empty_course() -> Course:
    return {"title":"", "title_short":"", "IC":"", "sections": {}}

# >>==========================================================================<<

if len(argv) < 2:
    print("Drag and drop a file onto this script.")
    bye()

path_in = argv[1]

if not isfile(path_in):
    print("Given file path doesn't exist.")
    print("   ", path_in)
    bye()

# >>==========================================================================<<

semester: Semester = {}
with open(path_in, "r") as f:
    r = reader(f)

    # Synopsis:
    #   The CSV file has a course ID on the first column only for the
    #   first section of that course. For remaining sections, it'll be blank.
    #   Whenever a non-empty course ID is encountered, an empty Course `dict` is
    #   created, and immediately included in `semester`. A reference to this is
    #   stored in `temp_course`.
    #   Since a `dict` is mutable, we can read further rows and just modify
    #   `temp_course` and it'll automatically reflect in `semester`.

    temp_course: Course = create_empty_course()
    for course_id, title, title_short, section_number, instructor, room, days in r:
        if course_id:
            temp_course = create_empty_course()
            semester[course_id] = temp_course

            temp_course["title"] = title.strip()
            temp_course["title_short"] = title_short.strip()

        instructor = instructor.strip()
        if not temp_course["IC"] and instructor == instructor.upper():
            temp_course["IC"] = instructor.title()

        temp_course["sections"][section_number] = {
            "instructor": instructor,
            "room": room.strip(),
            "days": days.strip(),
        }

# >>==========================================================================<<

result = repr(semester)
print(result)

try:
    from pyperclip import copy
    copy(result)
except ModuleNotFoundError:
    print()
    print("pyperclip not found, so couldn't copy to clipboard.")
