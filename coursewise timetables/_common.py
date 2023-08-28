from typing import TypedDict
from json import load

SectionJSON = TypedDict("Section", {"instructor": str, "room": str, "days": str})
CourseJSON = TypedDict("Course", {"title": str, "title_short": str, "IC": str, "sections": dict[str, SectionJSON]})
SemesterJSON = dict[str, CourseJSON]

def load_semester(path: str) -> SemesterJSON:
    with open(path, encoding="utf-8-sig") as f:
        return load(f)
