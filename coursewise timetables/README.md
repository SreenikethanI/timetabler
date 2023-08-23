# [/](/)coursewise timetables/

This folder contains the main course list as received from BITS official emails.

Each file here is prefixed with a number (0, 1, 2, ...) which will be referred to as the "Semester index" in the code.

The below steps briefly describe the procedure to parse the PDF received in email.
1. The table from the PDF file is imported into an Excel spreadsheet. Manual clean-up and data sanitization is performed.
2. The above Excel file is exported as CSV for easy portability of data.
3. This CSV file is then fed into [the Python script](-%20parse%20coursewise%20csv.py) and a resulting JSON file is created.
4. This JSON file is then referenced in the [Constants](/scripts/constants.js) file under `SEMESTERS_PROMISES`.
