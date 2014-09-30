(function(){
    // References to objects and original settings 
    // window.GCHVPreloadGridFn;
    // window.GCHVminRows;
    // window.GCHVhorizontalbarIndex;
    // window.GCHVmessage; 
    
    function GCHVwait(){
        var waitOnElement = frames[1].$('table1_container').children[GCHVhorizontalbarIndex];
        if(typeof waitOnElement !== "undefined" && waitOnElement.children.length > 0){
            waitOnElement.style.position='fixed';
            waitOnElement.style.top='30px';
        } else {
            setTimeout(function(){
                GCHVwait();
            },333);
        }
    }
    
    // If we have NOT activated the script
    if(frames[1].$('gradeviewinit') == null && Gradebook.getModel().minimumRows < 51) {
        
        // Confirm that the user wanted to do this
        if(!confirm('Activate gradeView?')) {
            return;
        }
        
        // Create the activated message <p> for later on
        if(typeof GCHVmessage === 'undefined') {
            window.GCHVmessage = document.createElement('p');
            GCHVmessage.style.marginLeft = "10px";
            GCHVmessage.style.background = "#e6a640";
            GCHVmessage.style.padding = "5px";
            GCHVmessage.style.color = "#000";
            GCHVmessage.style.display = "none";
            GCHVmessage.innerHTML = 'gradeView activated';
            frames[1].$('statusTitle').appendChild(GCHVmessage);
        }
        
        // promp user for number of rows to display
        var numrows = prompt('Enter # of rows to display (<200 recommended)', '200');
        if (numrows == null) {
            numrows = 200;
        }
        // Detemine the (future, after-resizing) index of the horizontal scroll bar
        window.GCHVhorizontalbarIndex = (numrows<Gradebook.getModel().rows.length) ? 2 : 1;
        // get the current reload grid function (for wrapping the function)
        window.GCHVPreloadGridFn = frames[1].theGradeCenter.reloadGrid;
        // get the original minimumRows
        window.GCHVminRows = Gradebook.getModel().minimumRows;
        
        //Update minrows
        Gradebook.getModel().minimumRows=numrows;
        //Force the student number column to be sticked
        Gradebook.getModel().gradebookService.updateNumFrozenColumns(3);
        // Override the function to also sticky the header and scrollbar
        frames[1].theGradeCenter.reloadGrid = function(){
            // Execute the old function as normal
            window.GCHVPreloadGridFn.apply(frames[1].theGradeCenter,arguments);
            //affix the header
            frames[1].$('table1_header').style.position='fixed';
            frames[1].$('table1_header').style.top='0';
            frames[1].$('table1_header').style.zIndex='100';
            //affix the container
            GCHVwait();
        }
        
        
        //Activate the script and mark as activated
        frames[1].theGradeCenter.reloadGrid();
        
        GCHVmessage.id = 'gradeviewinit';
        GCHVmessage.style.display = 'inline';
    
    // If the script is already activated
    } else {
        // Confirm that the user wanted to do this
        if(!confirm('De-Activate gradeView?')) {
            return;
        }
        
        //reset everything
        Gradebook.getModel().minimumRows=window.GCHVminRows;
        Gradebook.getModel().gradebookService.updateNumFrozenColumns(2);
        frames[1].theGradeCenter.reloadGrid = window.GCHVPreloadGridFn;
        frames[1].$('table1_header').style.position='static';
        frames[1].$('table1_header').style.top='';
        
        frames[1].theGradeCenter.reloadGrid();
        GCHVmessage.id = '';
        GCHVmessage.style.display = 'none';
    }
})();