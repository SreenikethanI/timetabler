from csv import reader
from json import dump
from typing import NamedTuple
# from collections import defaultdict
from os.path import realpath

from _common import *

class ParseWarning(NamedTuple):
    """Represents a warning from the `parse_csv` function."""
    row_num: int
    """The row number in the CSV file, starting from `1`."""
    message: str
    """The warning message."""
    col_num: int | None = None
    """The column number in the CSV file, starting from `1`."""
    # line_contents: str | None = None
    # """The original contents of the line."""

    def __str__(self) -> str:
        r = self.row_num
        c = self.col_num
        m = self.message
        # l = self.line_contents
        return "".join((
            f"Warning (row {r}",
            f", column {c}" if c is not None else "",
            f"): {m}",
            # "\nLine contents:\n{l}"
        ))

# >>==========================================================================<<

def bye(msg):
    """Print the given message and exit."""
    input(f"{msg}\nPress Enter to exit.")
    raise SystemExit

def create_empty_course() -> CourseJSON:
    """Create a `CourseJSON` object with all properties set to empty strings,
    empty dicts, etc. as applicable."""
    return {"title":"", "title_short":"", "IC":"", "sections": {}}

# >>==========================================================================<<

def load_course_titles(path_in: str) -> dict[str, tuple[str, str]]:
    """Load course titles and short titles from the given CSV file.

    The CSV file SHOULD have a header row, and SHOULD have the following columns
    in the same order mentioned below:
    1. Course ID
    2. Title
    3. Short title

    Extra columns are ignored, and missing columns are taken as blank."""

    titles: dict[str, tuple[str, str]] = {}

    with open(path_in, "r", encoding="utf-8-sig") as f:
        r = reader(f)
        next(r) # Skip headers
        for cols in r:
            (course_id, title, title_short) = map(str.strip,
                                                  resize_list(cols, 3, ""))
            if not course_id: continue
            titles[course_id] = (title or title_short, title_short)

    return titles

def parse_csv_old(path_in: str) -> tuple[SemesterJSON, list[ParseWarning]]:
    """[deprecated] Parse the given CSV file and return a dict.

    The CSV file SHOULD NOT have a header row, and SHOULD have the following
    columns in the same order mentioned below:
    1. course id
    2. title
    3. short title
    4. section number
    5. instructor
    6. room
    7. days

    Extra columns are ignored, and missing columns are taken as blank."""

    warnings: list[ParseWarning] = []

    semester: SemesterJSON = {}
    with open(path_in, "r", encoding="utf-8-sig") as f:
        r = reader(f)

        # Start with an empty course, to which we keep adding entries, until we
        # encounter the next course ID.
        current_course: CourseJSON = create_empty_course()
        for row_num, cols in enumerate(r, start=1):
            if not any(cols):
                warnings.append(ParseWarning(row_num, "Empty row."))

            # Unpack columns and strip all columns.
            (course_id, title, title_short, section_number, instructor, room,
             days) = map(str.strip, resize_list(cols, 7, ""))

            # Next course ID, so create a new Course object
            if course_id:
                current_course = create_empty_course()
                semester[course_id] = current_course
                current_course["title"] = title
                current_course["title_short"] = title_short

            # If section number is missing, then this row is pointless.
            if not section_number:
                warnings.append(ParseWarning(row_num, "Missing section number.", 4))
                continue

            # Check for Instructor-in-Charge. BITS convention is to write IC's
            # name in ALL CAPS.
            if not current_course["IC"] and instructor.isupper():
                current_course["IC"] = instructor.title()

            # Create a section object in the current course.
            current_course["sections"][section_number] = {
                "instructor": instructor,
                "room": room,
                "days": days,
            }

    return semester, warnings

def parse_csv(path_csv: str, path_titles: str) -> tuple[SemesterJSON, list[ParseWarning]]:
    """Parse the given CSV file and return a dict.

    The CSV file SHOULD have a header row, and SHOULD have the following columns
    in the same order mentioned below:
    1. COM COD
    2. course id
    3. course title
    4. credit (L P U)
    5. section
    6. instructor/IC
    7. room
    8. days/hours

    Extra columns are ignored, and missing columns are taken as blank."""

    # Removed from docstring above (ignore, basically):
    # 1. row number a.k.a. "#" (check `coursewise timetables/README.md` for info)

    semester: SemesterJSON = {}
    warnings: list[ParseWarning] = []
    def warn(row_num: int, message: str, col_num: int | None = None):
        """Appends a warning to the `warnings` list."""
        warnings.append(ParseWarning(row_num, message, col_num))

    titles = load_course_titles(path_titles)
    # course_has_LP: dict[str, tuple[bool, bool]] = defaultdict(lambda: (False, False))
    # row_num_prev: int | None = None
    with open(path_csv, "r", encoding="utf-8-sig") as f:
        r = reader(f)
        next(r) # Skip headers

        # Start with an empty course, to which we keep adding entries, until we
        # encounter the next course ID.
        curr_course: CourseJSON = create_empty_course()
        section_prefix: str = "L"
        for row_num_csv, cols in enumerate(r, start=1):
            if not any(cols):
                warn(row_num_csv, "Empty row.")
                continue

            # Unpack columns and strip all columns.
            cols_filtered = list(map(str.strip, resize_list(cols, 8, "")))

            for col_index, col in enumerate(cols_filtered):
                if "\n" in col or "\r" in col:
                    warn(row_num_csv, "Newline found, replacing with space.",
                         col_index + 1)
                    cols_filtered[col_index] = (col
                                                .replace("\r\n", " ")
                                                .replace("\n", " ")
                                                .replace("\r", " ")
                                                )

            (_com_cod, course_id, course_title, credit_LPU, section_number,
             instructor, room, days) = cols_filtered

            # Verify Row number, just for redundancy.
            # NOTE: This was a temporary idea, but I feel now it's unnecessary
            # and just extra effort.
            # try:
            #     row_num_int = int(row_num)
            #     if row_num_prev is None:
            #         row_num_prev = row_num_int
            #     elif row_num_int < row_num_prev:
            #         warn(row_num_csv, "Row # is not ascending, did you forget to sort?", 1)
            # except:
            #     warn(row_num_csv, "Row number isn't an int.", 1)

            # Course ID encountered, so create a new Course object, and figure
            # out whether the course has lectures and/or practicals sections
            if course_id:
                curr_course = create_empty_course()
                semester[course_id] = curr_course
                if course_id in titles:
                    (curr_course["title"], curr_course["title_short"]) = titles[course_id]
                else:
                    warn(row_num_csv, f"Course ID {course_id} not found in Titles CSV.")
                    curr_course["title"] = course_title
                section_prefix = "L"

                try:
                    # Try to parse first three values as ints
                    credit_parts = list(map(int, credit_LPU.split()))[:3]
                except:
                    # Ideally we should create a parse warning here, but by
                    # setting `credit_parts` as an empty list, the warning will
                    # instead be risen by the `else` block below.
                    credit_parts = []

                if len(credit_parts) == 1:
                    # course_has_LP[course_id] = (True, False)
                    section_prefix = "L"

                elif len(credit_parts) == 3:
                    credit_L, credit_P, credit_U = credit_parts
                    # course_has_LP[course_id] = (credit_L > 0, credit_P > 0)

                    section_prefix = "P" if credit_L == 0 and credit_P > 0 else "L"

                else:
                    warn(row_num_csv, "Course credits should have 1 or 3 NUMBERS only.", 5)

            elif course_title.lower() == "practical":
                # note that `not course_id` is also True. Course ID is blank.
                section_prefix = "P"

            # If section number is missing, then this row might describe the IC.
            if not section_number:
                if instructor:
                    curr_course["IC"] = instructor.title()
                else:
                    # Does NOT describe the IC, so seems like an error.
                    warn(row_num_csv, "Missing section number.", 6)

                # Since section number is missing, we don't add a section object
                # later on, and thus `continue` the loop.
                continue

            else:
                try:
                    section_number_int = int(section_number)
                except:
                    warn(row_num_csv, "Section number isn't an int.", 6)
                    continue

            # At this point of code, `section_number_int` will definitely have
            # a value assigned to it.
            section_number_prefixed = f"{section_prefix}{section_number_int}"

            # Check for Instructor-in-Charge. BITS convention is to write IC's
            # name in ALL CAPS.
            if not curr_course["IC"] and instructor.isupper():
                curr_course["IC"] = instructor.title()

            # Create a section object in the current course.
            curr_course["sections"][section_number_prefixed] = {
                "instructor": instructor,
                "room": room,
                "days": days,
            }

    return semester, warnings

# >>==========================================================================<<

if __name__ == "__main__":
    ### Import modules
    from sys import argv
    from os.path import isfile, splitext

    ### Load CSV file path from command-line argument.
    path_in = argv[1] if len(argv) >= 2 else ""
    while True:
        if isfile(path_in): break
        if path_in: print("  Error: CSV file path doesn't exist.")
        path_in = input("Enter CSV path: ").replace('"', '').strip()

    path_out = splitext(path_in)[0] + ".json"

    ### Load Titles CSV file path from command-line argument.
    path_titles = argv[2] if len(argv) >= 3 else "_course_titles.csv"
    while True:
        if isfile(path_titles): break
        if path_titles: print("  Error: Titles CSV path doesn't exist.")
        path_titles = input("Enter path for \"_course_titles.csv\": ").replace('"', '').strip()
    print()

    ### Confirm before start
    print("These are the paths:")
    print("  Input CSV  :", path_in)
    print("  Output JSON:", path_out)
    print("  Titles CSV :", path_titles)
    if isfile(path_out):
        yn = input("Output file already exists, overwrite? [y/N] ").strip()[-1:].lower()
        # Check for just "y", so that other inputs will be interpreted as a No.
        if yn != "y": bye("Cancelling.")
    else:
        yn = input("Start? [Y/n] ").strip()[-1:].lower()
        if yn != "y": bye("Cancelling.")
    print()

    ### Parse
    semester, warnings = parse_csv(path_in, path_titles)
    print("Parsed CSV.")
    if warnings:
        print(len(warnings), "warnings found:")
        for w in warnings:
            print(w)

    ### Output
    with open(path_out, "w") as f:
        dump(semester, f, indent=4)
    print("Written to output path.")
