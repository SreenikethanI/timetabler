from datetime import datetime, date, time, timedelta
from typing import TypedDict

# >============================================================================<

Period = TypedDict("Period", {"course":str,"title":str,"title_short":str,"IC":str,"section":str,"instructor":str,"room":str,"section_room":str})
Day = list[Period]
Timetable = list[Day]
PeriodLengths = list[list[int]]

# >============================================================================<

DAYS = ("MO", "TU", "WE", "TH", "FR")
DAY_START = 7*60 + 30
PERIOD_LENGTH = 40
BREAK_LENGTH = 5

# >============================================================================<

def are_periods_equal(p1: Period, p2: Period) -> bool:
    """Compares two periods whether they're equal. Equality is determined by
    the equality of course IDs and the section names."""
    return (bool(p1) and bool(p2)
        and p1["course"] == p2["course"]
        and p1["section"] == p2["section"]
    )

def is_period_free(period: Period) -> bool:
    """Returns `True` if the period is free. Freeness is determined by the
    course ID and the section name being falsy values (empty string, `None`,
    ...)"""
    return not period or (not period["course"] and not period["section"])

def format_date(d: datetime) -> str:
    """Formats the given `datetime` object into iCalendar date format.

    Example: 2023-03-23 23:05:00 is formatted as 20230323T230500"""
    return f"{d.year:04}{d.month:02}{d.day:02}T{d.hour:02}{d.minute:02}{d.second:02}"

def get_period_lengths(timetable: Timetable) -> PeriodLengths:
    """Gets the length of each period in each day of the timetable, as follows:
    - `1` if the period is a single period
    - more than 1 if the period is a block period
    - `0` if the period is a continuation of the previous period"""
    lengths: PeriodLengths = [[1 for period in day] for day in timetable]

    for day_i, day in enumerate(timetable):
        prev_period: Period | None = None
        prev_period_index: int = -1

        for period_i, period in enumerate(day):
            if prev_period and are_periods_equal(period, prev_period):
                lengths[day_i][prev_period_index] += 1
                lengths[day_i][period_i] = 0
            else:
                prev_period = period
                prev_period_index = period_i

    return lengths

# >============================================================================<

def write_to_ics(timetable: Timetable, date_start: date, date_end: date, path: str):
    """Creates a iCalendar file from the given timetable.
    `date_start` determines the starting week of this calendar, and `date_end`
    determines the last day of the calendar.

    The ics file is written to the given `path`.

    One event is created for each period in the timetable (block periods are
    counted as one period) and will be set to repeat weekly. A reminder alarm
    5 minutes before the start of the period will be set for all these events."""

    lengths = get_period_lengths(timetable)
    events: list[str] = []
    week_start = date_start - timedelta(days=date_start.weekday())
    date_end_f = format_date(datetime.combine(date_end, time(23,59,59)))

    for day_i, day in enumerate(timetable):
        for period_i, period in enumerate(day):
            length = lengths[day_i][period_i]
            if not length or is_period_free(period):
                continue

            p_date = week_start + timedelta(days=day_i)
            p_time_start = DAY_START + period_i * (PERIOD_LENGTH + BREAK_LENGTH)
            p_time_end = p_time_start + (length * PERIOD_LENGTH) + ((length - 1) * BREAK_LENGTH)
            p_start = datetime.combine(p_date, time(*divmod(p_time_start, 60), 0))
            p_end = datetime.combine(p_date, time(*divmod(p_time_end, 60), 0))

            event = "\n".join((
                "BEGIN:VEVENT",
                f"DTSTART;TZID=Asia/Dubai:{format_date(p_start)}",
                f"DTEND;TZID=Asia/Dubai:{format_date(p_end)}",
                f"RRULE:FREQ=WEEKLY;WKST=MO;UNTIL={date_end_f};BYDAY={DAYS[day_i]}",
                f"DESCRIPTION:{period['title']}",
                f"LOCATION:{period['section_room']}",
                f"SUMMARY:{period['title_short']}",
                "TRANSP:OPAQUE",

                "BEGIN:VALARM",
                "ACTION:DISPLAY",
                f"DESCRIPTION:{period['title_short']} starts in 5 mins",
                "TRIGGER:-P0DT0H5M0S",
                "END:VALARM",

                "END:VEVENT"
            ))
            events.append(event)

    with open(path, "w", encoding="utf-8") as f:
        f.write( "\n\n".join((
            "BEGIN:VCALENDAR\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-TIMEZONE:Asia/Dubai\nBEGIN:VTIMEZONE\nTZID:Asia/Dubai\nX-LIC-LOCATION:Asia/Dubai\nBEGIN:STANDARD\nTZOFFSETFROM:+0400\nTZOFFSETTO:+0400\nTZNAME:+04\nDTSTART:19700101T000000\nEND:STANDARD\nEND:VTIMEZONE",
            *events,
            "END:VCALENDAR"
        )) )

# >============================================================================<

if __name__ == "__main__":
    SREENI: Timetable = [[{"course":"MATH F113","title":"Probability & Statistics","title_short":"Prob. & Stats","IC":"Suhel Ahmed Khan","section":"L3","instructor":"Maneesha","room":"189","section_room":"L3 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"EEE F111","title":"Electrical Sciences","title_short":"Electrical","IC":"T G Thomas","section":"L2","instructor":"Sunil Thomas","room":"189","section_room":"L2 - 189"},{"course":"PHY F111","title":"Mech Oscillations & Wave","title_short":"MOWaves","IC":"Amarnath","section":"L2","instructor":"K K Singh","room":"189","section_room":"L2 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"ME F112","title":"Workshop Practice","title_short":"Workshop","IC":"Ravindra D Bhardwaj","section":"P2","instructor":"Harpreet Singh","room":"MG1","section_room":"P2 - MG1"},{"course":"ME F112","title":"Workshop Practice","title_short":"Workshop","IC":"Ravindra D Bhardwaj","section":"P2","instructor":"Harpreet Singh","room":"MG1","section_room":"P2 - MG1"}],[{"course":"BITS F111","title":"Thermodynamics","title_short":"Thermodynamics","IC":"Shashank Khurana","section":"L2","instructor":"Vincent Kumar","room":"189","section_room":"L2 - 189"},{"course":"EEE F111","title":"Electrical Sciences","title_short":"Electrical","IC":"T G Thomas","section":"L2","instructor":"Sunil Thomas","room":"189","section_room":"L2 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"MATH F113","title":"Probability & Statistics","title_short":"Prob. & Stats","IC":"Suhel Ahmed Khan","section":"L3","instructor":"Maneesha","room":"189","section_room":"L3 - 189"},{"course":"MATH F112","title":"Mathematics II","title_short":"Math II","IC":"S Baskaran","section":"L4","instructor":"A Somasundaram","room":"183","section_room":"L4 - 183"},{"course":"PHY F111","title":"Mech Oscillations & Wave","title_short":"MOWaves","IC":"Amarnath","section":"L2","instructor":"K K Singh","room":"189","section_room":"L2 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""}],[{"course":"PHY F111","title":"Mech Oscillations & Wave","title_short":"MOWaves","IC":"Amarnath","section":"L2","instructor":"K K Singh","room":"189","section_room":"L2 - 189"},{"course":"MATH F113","title":"Probability & Statistics","title_short":"Prob. & Stats","IC":"Suhel Ahmed Khan","section":"L3","instructor":"Maneesha","room":"189","section_room":"L3 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"MATH F112","title":"Mathematics II","title_short":"Math II","IC":"S Baskaran","section":"L4","instructor":"A Somasundaram","room":"183","section_room":"L4 - 183"},{"course":"BITS F111","title":"Thermodynamics","title_short":"Thermodynamics","IC":"Shashank Khurana","section":"L2","instructor":"Vincent Kumar","room":"189","section_room":"L2 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"ME F112","title":"Workshop Practice","title_short":"Workshop","IC":"Ravindra D Bhardwaj","section":"L2","instructor":"Ravindra D Bhardwaj","room":"189","section_room":"L2 - 189"}],[{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"BITS F111","title":"Thermodynamics","title_short":"Thermodynamics","IC":"Shashank Khurana","section":"L2","instructor":"Vincent Kumar","room":"189","section_room":"L2 - 189"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"MATH F112","title":"Mathematics II","title_short":"Math II","IC":"S Baskaran","section":"L4","instructor":"A Somasundaram","room":"183","section_room":"L4 - 183"},{"course":"","title":"","title_short":"","IC":"","section":"","instructor":"","room":"","section_room":""},{"course":"EEE F111","title":"Electrical Sciences","title_short":"Electrical","IC":"T G Thomas","section":"L2","instructor":"Sunil Thomas","room":"189","section_room":"L2 - 189"},{"course":"PHY F110","title":"Physics Laboratory","title_short":"Phy Lab","IC":"R Roopkumar","section":"P8","instructor":"Amarnath","room":"309","section_room":"P8 - 309"},{"course":"PHY F110","title":"Physics Laboratory","title_short":"Phy Lab","IC":"R Roopkumar","section":"P8","instructor":"Amarnath","room":"309","section_room":"P8 - 309"}],[{"course":"MATH F112","title":"Mathematics II","title_short":"Math II","IC":"S Baskaran","section":"L4","instructor":"A Somasundaram","room":"183","section_room":"L4 - 183"},{"course":"PHY F111","title":"Mech Oscillations & Wave","title_short":"MOWaves","IC":"Amarnath","section":"L2","instructor":"K K Singh","room":"189","section_room":"L2 - 189"},{"course":"MATH F113","title":"Probability & Statistics","title_short":"Prob. & Stats","IC":"Suhel Ahmed Khan","section":"L3","instructor":"Maneesha","room":"189","section_room":"L3 - 189"},{"course":"BITS F111","title":"Thermodynamics","title_short":"Thermodynamics","IC":"Shashank Khurana","section":"L2","instructor":"Vincent Kumar","room":"189","section_room":"L2 - 189"},{"course":"EEE F111","title":"Electrical Sciences","title_short":"Electrical","IC":"T G Thomas","section":"L2","instructor":"Sunil Thomas","room":"189","section_room":"L2 - 189"}]]

    PERIOD_LENGTH = 40
    write_to_ics(SREENI, date(2023, 3, 23), date(2023, 4, 21), "Sreeni timetable - Ramadan.ics")
    PERIOD_LENGTH = 50
    write_to_ics(SREENI, date(2023, 4, 24), date(2023, 5, 27), "Sreeni timetable - regular.ics")
