# [/](/)coursewise timetables/

This folder contains the main course list as received from BITS official emails.

Each file here is prefixed with a number (0, 1, 2, ...) which will be referred
to as the "Semester index" in the code.

## Creating a file for a Semester
A "Semester" here refers to the entire list of courses available for a certain
semester. This information is received as a PDF in email from the AUGSD
department, for example: "*Draft Timetable_FD_Second  Sem 23-24_19 1 2024.pdf*"

### 👉 Brief steps
Here's a brief on what shall be done with the PDF. Each point is elaborated into
1. The table from the PDF file is imported into an Excel spreadsheet. Manual
   clean-up and data sanitization is performed. (refer to
   [#Cleaning and sanitizing data](#👉-cleaning-and-sanitizing-data))
2. The above Excel file is exported as CSV for easy portability of data.
3. This CSV file is then fed into
   [the Python script](-%20parse%20coursewise%20csv.py) and a resulting JSON
   file is created.
4. This JSON file is then referenced in the [Constants](/scripts/constants.js)
   file under `SEMESTERS_PROMISES`.

### 👉 Cleaning and sanitizing data
1. Import PDF into Excel: *Data* tab → *Get Data* → *From <u>F</u>ile* →
   *From <u>P</u>DF*

2. If each page gets imported as its own table, then ensure all pages have the
   same number of columns, and create a new "Append" query to combine all these
   tables, and click "Use First Row as Headers" (after removing any useless
   Top rows).<br>
   Optionally, rename the columns to something more legible.

3. Import this table into Excel (and delete the other sheets, if any).

4. Add the following columns manually:
   - "#" that just contains the row number. ([More info](#the--column))
   <!-- - "Short title" that contains the shortened title. -->

---
## More info

### The "#" column
**Here's what it is:**
This column contains "row numbers". Start typing 1, 2, 3 for the first 3 cells,
and Auto Fill to the remaining rows. Example:<br>
![Example for the # column](<../docs/cwtt appendix hash.png>)

**Here's the purpose:**
Say you want to temporarily sort by a column, make some changes, and revert the
order of the rows. This # column will help you to get back the original order of
the rows.

**Here's why it matters:**
Take the rows 10 thru 13 in the screenshot above. The
"*BIO F111 General Biology*" course thus takes up 4 rows. Only row 10 has the
course number and the title, and the other rows (rows 11 thru 13) are blank
for these two columns.

So I think you must've figured it out by now that, if we reorder any rows,
then we are losing critical information (example, row 12 was inserted after row
4, then it would add an extra section for *Bio Lab* and remove a section from
*General Bio*, which will be incorrect). Hence it is critical that we preserve
the original order of the rows, which can be achieved using this "#" column.
