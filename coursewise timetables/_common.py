from typing import TypedDict, TypeVar
from json import load
from pathlib import Path

SectionJSON = TypedDict("SectionJSON", {"section_name": str, "instructor": str, "room": str, "days": str})
CourseJSON = TypedDict("CourseJSON", {"title": str, "title_short": str, "IC": str, "date_midsem": str, "date_compre": str, "sections": list[SectionJSON]})
SemesterJSON = dict[str, CourseJSON]

def load_semester(path: Path) -> SemesterJSON:
    """Load the contents of the given JSON file.
    Basically a wrapper for `json.load`."""
    with open(path, encoding="utf-8-sig") as f:
        return load(f)

T = TypeVar("T")
def resize_list(l: list[T], size: int, pad_element: T) -> list[T]:
    """Resize the given list to the given size, and return a new list.
    This function either removes excess elements or appends `pad_element` as
    many times as required."""

    result = l[:size] # Trim if excess. Also makes a copy of the given list.

    if len(result) < size: # Extend if required
        result.extend((pad_element for _ in range(size - len(result))))

    return result
