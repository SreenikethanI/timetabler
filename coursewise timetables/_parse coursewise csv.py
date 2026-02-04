from csv import reader
from json import dump
from typing import NamedTuple
import re
from pathlib import Path

from _common import resize_list, CourseJSON, SemesterJSON

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
    empty lists, etc. as applicable."""
    return {"title":"", "title_short":"", "IC":"", "sections": []}

# >>==========================================================================<<

def load_course_titles(path_in: Path) -> dict[str, tuple[str, str]]:
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
            (course_id, title, title_short) = map(str.strip, resize_list(cols, 3, ""))
            if not course_id: continue
            titles[course_id] = (title or title_short, title_short)

    return titles

def parse_csv(path_csv: Path, path_titles: Path) -> tuple[SemesterJSON, list[ParseWarning]]:
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
    NUM_COLS = 8

    semester: SemesterJSON = {}
    warnings: list[ParseWarning] = []
    def warn(row_num: int, message: str, col_num: int | None = None):
        """Appends a warning to the `warnings` list."""
        warnings.append(ParseWarning(row_num, message, col_num))

    titles = load_course_titles(path_titles)
    with open(path_csv, "r", encoding="utf-8-sig") as f:
        r = reader(f)
        next(r) # Skip headers

        # Start with an empty course, to which we keep adding entries, until we
        # encounter the next course ID.
        curr_course: CourseJSON = create_empty_course()
        curr_course_row_num_csv: int = -1
        section_prefix: str = "L"
        for row_num_csv, cols in enumerate(r, start=2): # 2 as I skipped headers
            if not any(cols):
                warn(row_num_csv, "Empty row.")
                continue

            # Unpack columns and strip all columns.
            cols_filtered = resize_list(cols, NUM_COLS, "")

            for col_index, col in enumerate(cols_filtered):
                if "\n" in col or "\r" in col:
                    warn(row_num_csv, "Newline found, replacing with space.", col_index + 1)
                    col = col.replace("\r\n", " ").replace("\n", " ").replace("\r", " ")
                while "  " in col: col = col.replace("  ", " ")
                col = col.replace(" /", "/").replace("/ ", "/")
                col = col.strip()
                cols_filtered[col_index] = col

            (_com_cod, course_id, course_title, credit_LPU, section_number, instructor, room, days) = cols_filtered

            # They randomly decide to split with comma, ampersand or slash
            # depending on the color of the moon. Come on, man...
            instructor_list = [x.strip() for x in re.split(r"/|&|,", instructor) if x.strip()]
            instructor_list_title = [x.title() if x.upper() != "TBA" else x for x in instructor_list]

            # Course ID encountered, so create a new Course object, and figure
            # out whether the course has lectures and/or practicals sections
            if course_id:

                # Warn if the previous course's IC was not recognized.
                if curr_course_row_num_csv > 0 and not curr_course["IC"]:
                    warn(curr_course_row_num_csv, f"Cannot recognize IC.", 6)

                curr_course = create_empty_course()
                curr_course_row_num_csv = row_num_csv
                semester[course_id] = curr_course
                if course_id in titles:
                    (curr_course["title"], curr_course["title_short"]) = titles[course_id]
                else:
                    warn(row_num_csv, f"Course ID {course_id} not found in Titles CSV.")
                    curr_course["title"] = course_title

                section_prefix = "L"

                try:
                    # Try to parse first three values as ints
                    credit_parts = list(map(int, credit_LPU.replace("*", "").split()))[:3]
                except:
                    # Ideally we should create a parse warning here, but by
                    # setting `credit_parts` as an empty list, the warning will
                    # instead be risen by the `else` block below.
                    credit_parts = []

                if len(credit_parts) == 1:
                    section_prefix = "L"

                elif len(credit_parts) == 3:
                    credit_L, credit_P, credit_U = credit_parts

                    section_prefix = "P" if credit_L == 0 and credit_P > 0 else "L"

                else:
                    warn(row_num_csv, "Course credits should have 1 or 3 numbers only.", 5)

            if course_title.lower().startswith("practical"):
                section_prefix = "P"

            # If section number is missing, then this row might describe the IC.
            if not section_number:
                if instructor_list:
                    curr_course["IC"] = ", ".join(instructor_list_title)
                else:
                    # Does NOT describe the IC, so seems like an error.
                    warn(row_num_csv, "Missing section number.", 6)

                # Since section number is missing, we discard this section.
                continue

            # Try parsing section number. The old PDFs till 2025-09 have it
            # numbered 1,2,3,... whereas 2026-01 onwards have it numbered
            # as L1,L2,L3,... P1,P2,P3,... Q1,Q2,Q3,...
            # So if the section number is just a number, then we add the L/P
            # prefix, otherwise it can be understood that the section number
            # already has the L/P/Q prefix.
            if section_number.isdigit():
                section_number = f"{section_prefix}{section_number}"
            else:
                pass

            # Check for Instructor-in-Charge. BITS convention is to write IC's
            # name in ALL CAPS.
            if not curr_course["IC"]:
                instructors_ic = ", ".join([
                    x.title() if x.upper() != "TBA" else x
                    for x in instructor_list
                    if x.isupper()
                ])
                if instructors_ic: curr_course["IC"] = instructors_ic

            # Create a section object in the current course.
            curr_course["sections"].append({
                "section_name": section_number,
                "instructor": " / ".join(instructor_list_title),
                "room": room,
                "days": days,
            })

    return semester, warnings

# >>==========================================================================<<

if __name__ == "__main__":
    ### Import modules
    from sys import argv

    ### Load CSV file path from command-line argument.
    path_in = Path(argv[1] if len(argv) >= 2 else "")
    while True:
        if path_in.is_file(): break
        if path_in: print("  Error: CSV file path doesn't exist.")
        path_in = Path(input("Enter CSV path: ").replace('"', '').strip())

    path_out = path_in.with_suffix(".json")

    ### Load Titles CSV file path from command-line argument.
    path_titles = Path(argv[2] if len(argv) >= 3 else "_course_titles.csv")
    while True:
        if path_titles.is_file(): break
        if path_titles: print("  Error: Titles CSV path doesn't exist.")
        path_titles = Path(input("Enter path for \"_course_titles.csv\": ").replace('"', '').strip())
    print()

    ### Confirm before start
    print("These are the paths:")
    print("  Input CSV  :", path_in)
    print("  Output JSON:", path_out)
    print("  Titles CSV :", path_titles)
    if path_out.is_file():
        yn = input("Output file already exists, overwrite? [y/N] ").strip()[-1:].lower()
        # Check for just "y", so that other inputs will be interpreted as a No.
        if yn != "y": bye("Cancelling.")
    else:
        yn = input("Start? [Y/n] ").strip()[-1:].lower()
        if yn == "n": bye("Cancelling.")
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
        dump(semester, f, indent=2)
    print("Written to output path.")
