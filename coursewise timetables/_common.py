from typing import TypedDict, TypeVar
from json import load

# _single_line_encoder = JSONEncoder(indent=None)
# class SectionJSON:
#     instructor: str
#     """The name of instructor for this section."""
#     room: str
#     """The room number."""
#     days: str
#     """A string like "M3 W5 F7" which means Monday 3rd hour, Wednesday 5th hour, Friday 7th hour."""

#     def __init__(self, instructor: str, room: str, days: str):
#         self.instructor = instructor
#         self.room = room
#         self.days = days

#     def json_str(self) -> str:
#         return _single_line_encoder.encode({
#             "instructor": self.instructor,
#             "room": self.room,
#             "days": self.days,
#         })

# __single_line_encoder = JSONEncoder(indent=None)
# class CustomJSONEncoder(JSONEncoder):

#     # def encode(self, o: Any) -> str:
#     #     if isinstance(o, dict) and all(key in o for key in ("instructor","room","days")):
#     #         return self.__single_line_encoder.encode(o)
#     #     return super().encode(o)

#     # def _iterencode_dict(dct, _current_indent_level):
#     #     if isinstance(dct, dict) and all(key in dct for key in ("instructor","room","days")):
#     #         print("a")
#     #         return __single_line_encoder.encode(dct)
#     #     return super()._JSONEncoder__iterencode_dict(dct, _current_indent_level)

#     def encode(self, o):
#         if isinstance(o, SectionJSON):
#             return o.json_str()
#         return super().encode(o)

SectionJSON = TypedDict("Section", {"instructor": str, "room": str, "days": str})

CourseJSON = TypedDict("Course", {"title": str, "title_short": str, "IC": str, "sections": dict[str, SectionJSON]})

SemesterJSON = dict[str, CourseJSON]

def load_semester(path: str) -> SemesterJSON:
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
