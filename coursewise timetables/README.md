# [/](/)coursewise timetables/

This folder contains the main course list as received from BITS official emails.

Each file here is prefixed with a number (0, 1, 2, ...) which will be referred
to as the "Semester index" in the code.

---
## Files
The **pdf**, **xlsx**, **csv**, **json** files are documented in the section
[#Creating a file for a Semester](#creating-a-file-for-a-semester). The
remaining files are documented here:
| File | Description |
| ---: | --- |
| [_parse coursewise csv.**py**](<_parse coursewise csv.py>) | Converts the CSV files into JSON files. |
| [_course_titles.**csv**](_course_titles.csv) | A file that contains course titles and short titles for every course ID. I use this instead of extracting them from the PDF itself, since:<br>1. it's easy to maintain "short titles" in one place<br>2. the titles in the PDF files are ... inconsistent 💀 |
| [_common.**py**](_common.py) | Some common functions and type hints. |

Some more files, which I've used maybe once, but kept for the sake of history:
| File | Description |
| ---: | --- |
| [_compare short titles.**py**](<_compare short titles.py>) | To compare the "short title" values between a CSV and a JSON file, just to ensure that they're consistent.<br>This is now deprecated, since the short titles will no longer be stored in the individual CSV files, but rather in a dedicated file ([_parse coursewise csv.py](<_parse coursewise csv.py>)). |
| [_room number change notice.**py**](<_room number change notice.py>) | To get all sections that have a certain room number. See the file contents for more details. |
| [_VBA Add prefix.**bas**](<_VBA Add prefix.bas>) | A quick VBA code to add a prefix to the selected cells.<br>e.g. to convert "**1**","**2**","**3**" to "**P1**","**P2**","**P3**"<br>This is now deprecated, since this is now detected automatically (by [_parse coursewise csv.py](<_parse coursewise csv.py>)). |

---
## Creating a file for a Semester
This section tells you how to start from the Timetable Draft PDF, and end up
with something that can be used by the Timetabler app.

A "Semester" here refers to the entire list of courses available for a certain
semester. This information is received as a PDF in email, either from Kumar sir,
or from the AUGSD department.<br>Example file name: "*Draft Timetable_FD_Second  Sem 23-24_19 1 2024.pdf*"

### Brief outline
Here's a brief on what shall be done with the PDF. The chain is **PDF** →
**CSV** → **JSON**.
1. The table from the PDF file is imported into Excel. **Motive:** Excel feels
   like the best tool to organize tabular data, and also since it can natively
   import tables from PDFs! (follow steps from
   [#Cleaning and sanitizing data](#👉-cleaning-and-sanitizing-data))

2. The Excel file is exported as CSV. **Motive:** easy portability of data, i.e.
   can be parsed using Python's built-in `csv` module, etc.

3. This CSV file is then fed into
   [the Python script](<_parse coursewise csv.py>) and a resulting JSON
   file is created. **Motive:** JavaScript doesn't have native support for CSV,
   but it supports JSON natively. Also, its hierarchial nature feels most
   suitable for representing semester info.
   <!-- TODO: Explain warnings from parser script, and how to deal with each
   warning. -->

4. This JSON file is then referenced in the [Constants](/scripts/constants.js)
   script file under `SEMESTERS_PROMISES`.

### 👉 Cleaning and sanitizing data
1. Import the PDF into Excel: *Data* tab → *Get Data* → *From <u>F</u>ile* →
   *From <u>P</u>DF*

2. If each PDF page gets imported as its own table, then do the following:

   1. ensure all tables have the same number of columns (remove extra)
   2. create a new Append query to combine all these tables
   3. remove any useless Top rows (if any)
   4. click "Use First Row as Headers".

   Optionally, rename the columns to something more legible.

3. Check if any extra columns are imported, such as any empty columns. Make sure
   the columns are in the same order as the following:
   1. COM COD
   2. course id
   3. course title
   4. credit (L P U)
   5. section
   6. instructor/IC
   7. room
   8. days/hours

   See the documentation for the function `parse_csv()` in
   [_parse coursewise csv.py](<_parse coursewise csv.py>) for more info.

4. Import this table into Excel (and delete the other sheets, if any). Do not
   delete the header rows, keep them as-is.

5. Select ALL cells in the worksheet, and enable "Word Wrap". You have to now
   visually search for cells which have more than 1 line in it, and compare that
   cell with the PDF. Make changes to ensure it matches the data intended by the
   PDF.

That's it, you may move to the next step in the process.

<!-- 5. Add a "#" that just contains the row number. ([More info](#the--column)) -->

---
## More info

<!-- ### The "#" column
**Here's what it is:**
This column contains "row numbers". Start typing 1, 2, 3 for the first 3 cells,
and Auto Fill the remaining rows. Example:<br>
![Example for the # column](<../docs/cwtt appendix hash 1.png>)

**Here's the purpose:**
Say you want to temporarily sort by a column, make some changes, and revert the
order of the rows. This # column will help you to get back the original order of
the rows.

**Here's why it matters:**
For example, take the rows 10 thru 13 in the screenshot above. The
"*BIO F111 General Biology*" course thus takes up 4 rows. Only row 10 has the
course number and the title, and the other rows (rows 11 thru 13) are blank
for these two columns.

The conclusion is that, if we reorder any rows, then we are losing critical
information. For example, IF row 12 was inserted after row 4, then it would add
an extra section for *Bio Lab* and remove a section from *General Bio*, which
will be incorrect. Hence it is critical that we preserve the original order of
the rows, which can be achieved using this "#" column. -->

<!-- you get a cookie for reading this 😃😄 -->

<!-- cookies are tasty -->

<!-- except if you have diabetes -->

<!-- sorry if you have diabetes -->
