"""This notice came in an email from K Kumar sir on 28/Aug/2023"""

from _common import *
from rich.table import Table
import rich

def get_courses_with_room(semester: SemesterJSON, room: str) -> dict[str, list[str]]:
    """Returns a mapping of Course IDs with a list of sections which are
    located in the given room number."""

    result: dict[str, list[str]] = {}
    for course_id, course in semester.items():
        matched_sections: list[str] = [
            section
            for section, section_details in course['sections'].items()
            if section_details['room'].lower() == room.lower()
        ]
        if matched_sections:
            result[course_id] = matched_sections

    return result

def print_result(semester: SemesterJSON, courses_sections_map: dict[str, list[str]]):
    table = Table()
    table.add_column("Course ID")
    table.add_column("Title")
    table.add_column("Sections")
    for course_id, sections in courses_sections_map.items():
        course = semester[course_id]
        table.add_row(
            course_id,
            course["title_short"] or course["title"],
            ", ".join(sections),
        )
    rich.print(table)

if __name__ == "__main__":
    PATH = "coursewise timetables\\2 - 2023-09 S1 new.json"
    ROOM = "221"

    semester = load_semester(PATH)
    result = get_courses_with_room(semester, ROOM)
    print_result(semester, result)
