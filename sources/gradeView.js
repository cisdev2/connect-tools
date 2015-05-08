(function(){
    // References to objects and original settings 
    // window.GCHVPreloadGridFn;
    // window.GCHVminRows;
    // window.GCHVhorizontalbarIndex;
    // window.GCHVmessage; 
    
    // used to adjust the width of the sticky-block after the grade center loads/reloads
    function GCHVwait(){
        var waitOnElement = $('table1_container').children[GCHVhorizontalbarIndex];
        if(typeof waitOnElement !== "undefined" && waitOnElement.children.length > 0){
            waitOnElement.style.position='fixed';
            waitOnElement.style.top='86px';
            waitOnElement.style.zIndex = '2000';
            waitOnElement.style.left = 'auto';
            waitOnElement.style.marginLeft = '360px';
            var pcipMaxWidth = $('table1_header').getWidth();
            $('panelcellInfoPanel').style.maxWidth = pcipMaxWidth + 'px';
            waitOnElement.style.maxWidth =  pcipMaxWidth - 360 + 'px';
        } else {
            setTimeout(function(){
                GCHVwait();
            },333);
        }
    }
    
    // If we have NOT activated the script
    if($('gradeviewinit') == null && Gradebook.getModel().minimumRows < 51) {
        
        // Confirm that the user wanted to do this
        if(innerWidth < 1000 && !confirm('Warning: Your viewport/window size is less than 1000px wide. Still activate gradeView?')) {
            return;
        } else if(!confirm('Activate gradeView?')) {
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
            $('statusTitle').appendChild(GCHVmessage);
        }
        
        // promp user for number of rows to display
        var numrows = prompt('Enter # of rows to display (<200 recommended)', '200');
        if (numrows == null) {
            numrows = 200;
        }
        // Detemine the (future, after-resizing) index of the horizontal scroll bar
        window.GCHVhorizontalbarIndex = (numrows<Gradebook.getModel().rows.length) ? 2 : 1;
        // get the current reload grid function (for wrapping the function)
        window.GCHVPreloadGridFn = frames.theGradeCenter.reloadGrid;
        // get the original minimumRows
        window.GCHVminRows = Gradebook.getModel().minimumRows;
        
        //Update minrows
        Gradebook.getModel().minimumRows=numrows;
        //Force the student number column to be sticked
        Gradebook.getModel().gradebookService.updateNumFrozenColumns(3);
        // Override the function to also sticky the header and scrollbar
        frames.theGradeCenter.reloadGrid = function(){
            // Execute the old function as normal
            window.GCHVPreloadGridFn.apply(frames.theGradeCenter,arguments);
            //affix the header
            var tbhs = $('table1_header').style;
            tbhs.position='fixed';
            tbhs.top='35px';
            tbhs.zIndex='1000';
            //affix the container
            GCHVwait();
            
        }
        
        //Activate the script and mark as activated
        frames.theGradeCenter.reloadGrid();
        
        var pcip = $('panelcellInfoPanel');
        pcip.style.position='fixed';
        pcip.style.top='65px';
        pcip.style.zIndex='1000';
        pcip.style.background = '#333';
        pcip.style.height = '41px';
        pcip.style.width = '1153px';
        
        pcip.appendChild($('selectedRows'));
        $('selectedRows').style.margin = "4px 0 0 2px";
        
        //Attach an unLoad event to avoid the glitch when coming back to the grade center
        //this is a copy of the else case from below, but without the reloadGrid call
        window.onbeforeunload = function(event) {
            Gradebook.getModel().minimumRows=window.GCHVminRows;
            Gradebook.getModel().gradebookService.updateNumFrozenColumns(2);
            frames.theGradeCenter.reloadGrid = window.GCHVPreloadGridFn;

            $('table1_header').style.position='static';

            var pcip = $('panelcellInfoPanel').style;
            pcip.position='static';
            pcip.background = 'none';
            pcip.height = 'auto';
            pcip.width = 'auto';

            $('nonAccessibleTableDiv').insert({
              after: $('selectedRows')
            });
            $('selectedRows').style.margin = "0";
            
            GCHVmessage.id = '';
            GCHVmessage.style.display = 'none';
        };
        
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
        frames.theGradeCenter.reloadGrid = window.GCHVPreloadGridFn;
        
        $('table1_header').style.position='static';
        
        var pcip = $('panelcellInfoPanel').style;
        pcip.position='static';
        pcip.background = 'none';
        pcip.height = 'auto';
        pcip.width = 'auto';
        
        $('nonAccessibleTableDiv').insert({
          after: $('selectedRows')
        });
        $('selectedRows').style.margin = "0";
        
        frames.theGradeCenter.reloadGrid();
        
        GCHVmessage.id = '';
        GCHVmessage.style.display = 'none';
    }
})();