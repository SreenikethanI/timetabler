from json import load
from csv import reader
from rich.table import Table
import rich

from _common import *

def compare_short_titles(path_csv: str, path_json: str):
    full_titles: dict[str, str] = {} # Mappings from Course ID to Full title
    short_titles_csv: dict[str, str] = {} # Mappings from Course ID to Short title from CSV file
    short_titles_json: dict[str, str] = {} # Mappings from Course ID to Short title from JSON file

    # Load CSV
    with open(path_csv, "r", encoding="utf-8-sig") as f:
        r = reader(f)
        for course_id, title_full, title_short, *_ in r:
            if not course_id:
                continue
            short_titles_csv[course_id] = title_short
            full_titles[course_id] = title_full

    # Load JSON
    data_json = load_semester(path_json)
    for course_id, course in data_json.items():
        if course_id not in full_titles:
            full_titles[course_id] = course["title"]
        short_titles_json[course_id] = course["title_short"]

    # Create table
    table = Table()
    table.add_column("ID")
    table.add_column("Full title")
    table.add_column("Short title CSV")
    table.add_column("Short title JSON")
    for course_id, full_title in full_titles.items():
        short_title_csv = short_titles_csv.get(course_id, "")
        short_title_json = short_titles_json.get(course_id, "")
        if short_title_csv == short_title_json:
            continue
        table.add_row(
            course_id,
            full_title,
            short_title_csv,
            short_title_json,
        )

    # Print table
    rich.print(table)

if __name__ == "__main__":
    PATH_CSV  = "coursewise timetables\\2 - 2023-09 S1.csv"
    PATH_JSON = "coursewise timetables\\2 - 2023-09 S1 new.json"

    compare_short_titles(PATH_CSV, PATH_JSON)
