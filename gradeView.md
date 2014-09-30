#gradeView

Makes user interface improvements to the grade center.

For larger operations, "Work Offline" mode continues to be the better choice.

##Installation

Create a new bookmark for your browser and paste the contents of [this file](https://raw.githubusercontent.com/gondek/connect-tools/master/sources/gradeView.bookmark) in the bookmark's URL.

##Features
- Stickies (holds in place) the following:
    - the student number column
    - the table header (the column names)
    - the horizontal scrollbar (for browsing through columns)
    - the column information box (for checking column types)
- Allows for an arbitrary amount of student rows to be displayed at once 
    - As a result, one can use the browser's "Find" command to search for a student (CTRL-F)
- Works in Chrome and Firefox (other browser statuses are unknown)

##Usage
1. Enter any Grade Center view
2. Click the bookmark
3. To exit gradeView, click the bookmark again.

##Known Issues


- If you leave a grade center and come back to the same one again, gradeView may only be partially enabled. To fix this, click the bookmark, allow it to disable itself, and then refresh the grade center (or click on the gradecenter link in the sidebar)
- A larger amount of students/rows displayed decreases horizontal scrolling performance (especially over 200 students). Not much can be done about this because of the way Connect tells the browser to store the information.
