#megaview GradeCenter

Makes some improvements to the grade center.

Drag [this link](1) to your bookmarks bar to install.

##Features
- Stickies (holds in place) the following:
    - the student number column
    - the table header (the column names)
    - the horizontal scrollbar (for browsing through columns)
- Allows for an arbitrary amount of student rows to be displayed at once 
    - As a result, one can use the browser's "Find" command to search for a student (CTRL-F)
- Works in Chrome and Firefox (other browser statuses are unknown)

##Usage
1. Enter any Grade Center view
2. Click the bookmark
3. To exit megaview

##Known Issues


- If you leave a grade center and come back again, megaView will only be partially enabled. To fix this, click the bookmark, allow it to disable itself, and then refresh the grade center (or click on the gradecenter link in the sidebar)
- A larger amount of students/rows displayed decreases horizontal scrolling performance (especially over 200 students). Not much can be done about this because of the way Connect tells the browser to store the information.


[1]:javascript:(function(){function e(){var t=frames[1].$('table1_container').children[GCHVhorizontalbarIndex];if(typeof t!=='undefined'&&t.children.length>0){t.style.position='fixed';t.style.top='30px'}else{setTimeout(function(){e()},333)}}if(frames[1].$('superviewinit')==null&&Gradebook.getModel().minimumRows<51){if(!confirm('Activate megaview?')){return}window.onunload=function(){Gradebook.getModel().minimumRows=25};if(typeof GCHVmessage==='undefined'){window.GCHVmessage=document.createElement('p');GCHVmessage.style.marginLeft='10px';GCHVmessage.style.background='#e6a640';GCHVmessage.style.padding='5px';GCHVmessage.style.color='#000';GCHVmessage.style.display='none';GCHVmessage.innerHTML='megaview activated';frames[1].$('statusTitle').appendChild(GCHVmessage)}var t=prompt('Enter # of rows to display (<200 recommended)','200');if(t==null){t=200}window.GCHVhorizontalbarIndex=t<Gradebook.getModel().rows.length?2:1;window.GCHVPreloadGridFn=frames[1].theGradeCenter.reloadGrid;window.GCHVminRows=Gradebook.getModel().minimumRows;Gradebook.getModel().minimumRows=t;Gradebook.getModel().gradebookService.updateNumFrozenColumns(3);frames[1].theGradeCenter.reloadGrid=function(){window.GCHVPreloadGridFn.apply(frames[1].theGradeCenter,arguments);frames[1].$('table1_header').style.position='fixed';frames[1].$('table1_header').style.top='0';frames[1].$('table1_header').style.zIndex='100';e()};frames[1].theGradeCenter.reloadGrid();GCHVmessage.id='superviewinit';GCHVmessage.style.display='inline'}else{if(!confirm('De-Activate megaview?')){return}Gradebook.getModel().minimumRows=window.GCHVminRows;Gradebook.getModel().gradebookService.updateNumFrozenColumns(2);frames[1].theGradeCenter.reloadGrid=window.GCHVPreloadGridFn;frames[1].$('table1_header').style.position='static';frames[1].$('table1_header').style.top='';frames[1].theGradeCenter.reloadGrid();GCHVmessage.id='';GCHVmessage.style.display='none'}})()