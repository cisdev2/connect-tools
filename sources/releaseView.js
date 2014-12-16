(function(){
    
    // see if we are in frame mode or not
    window.RVroot = (frames.length == 0) ? window : frames[1];

    if(RVroot.$('releaseviewinit') != null) {
        return;
    }
    
    // get the detail <divs>
    window.RVdetails = RVroot.document.getElementsByClassName('details');
    
    // Create a new loading message (used for each item)
    function createRVloading() {
        var rvmessage = document.createElement('p');
        rvmessage.style.background = "#f4e4ce";
        rvmessage.style.padding = "5px";
        rvmessage.style.color = "#000";
        rvmessage.style.fontSize = "15px";
        rvmessage.innerHTML = 'releaseView Loading';
        var loadingImage = document.createElement('img');
        loadingImage.setAttribute('src','/images/ci/misc/progress/progress_learningSystem.gif');
        rvmessage.appendChild(loadingImage);
        return rvmessage;
    }

    // function that starts displaying all the releases
    function RVrender() {
        var courseID = RVroot.course_id;
        for(var i = 0;i<RVdetails.length;i++) {
            var contentID = RVdetails[i].parentNode.getElementsByClassName('item clearfix')[0].getAttribute('id');
            var newloader = createRVloading();
            RVdetails[i].parentNode.appendChild(newloader);
            RVgetreleases(contentID,courseID,RVdetails[i],newloader);
        }
    }

    function removeAllFromArray(targetArray) {
        for(var j = 0; j<targetArray.length; j++) {
                targetArray[j].remove();
        }
    }
    
    // function that gets the release data from Connect and writes it
    function RVgetreleases(contentID,courseID,node,loader) {
        
        var baseURL = "/webapps/blackboard/content/listRules.jsp?";
        var parameters = "course_id="+courseID+"&"+"content_id="+contentID;

        // variables for adaptive release info
        var xmlhttp=new XMLHttpRequest(); 
        var availDetails = document.createElement('div'); 
        
        // variables for due date info
        var baseURL2 = "/webapps/assignment/uploadAssignment?";
        var parameters2 = "content_id="+contentID+"&"+"course_id="+courseID
        var xmlhttp2 =new XMLHttpRequest(); 
        var duedate = document.createElement('div'); 
        
        // get due date info
        xmlhttp2.onreadystatechange=function() {
            console.log(xmlhttp2.readyState+ ",,," + xmlhttp2.status);
            if (xmlhttp2.readyState===4 && xmlhttp2.status===200){
                duedate.innerHTML = xmlhttp2.responseText;
                
                // strip out the meta block from the HTML response and prepare it for viewing
                var duedatediv = duedate.select('#metadata .noLabelField')[0];
                duedatediv.style.float = "none";
                duedate.innerHTML = duedatediv.outerHTML;
                if(duedate.innerHTML.indexOf('Due Date') > -1) {
                    // this thing actually has a due date
                    var url = 'https://connect.ubc.ca/webapps/blackboard/execute/manageAssignment?method=showmodify&';
                    url = url + 'course_id='+courseID+'&content_id='+contentID;
                    var newlink = document.createElement('a');
                    newlink.setAttribute('href',url);
                    newlink.innerHTML = "[Edit Due Date]";
                    duedate.appendChild(newlink);
                } else {
                    duedate.innerHTML = "No due date";
                }
            
                //var clearfix = document.createElement('div'); 
                //clearfix.style.clear = "both";
                //duedate.appendChild(clearfix);
                availDetails.appendChild(duedate);
                loader.hide();
            } else {
                setTimeout(function(){
                    if(duedate.innerHTML.length == 0) {
                        duedate.innerHTML = "No due date";
                        availDetails.appendChild(duedate);
                    }
                    loader.hide();
                },3000);
            }
        }
        
        // get adaptive info
        xmlhttp.onreadystatechange=function() {if (xmlhttp.readyState===4 && xmlhttp.status===200){
            availDetails.innerHTML = xmlhttp.responseText;

            // strip out the table from the HTML response and prepare it for viewing
            availDetails.innerHTML = availDetails.select('#the_form')[0].outerHTML;
            availDetails.innerHTML = availDetails.innerHTML.replace("Click <b>Create Rule</b> to add a rule.", "");
            availDetails.style.background = "#f4e4ce";
            availDetails.style.padding = "5px";
            node.appendChild(availDetails);
            availDetails.id = contentID;
            availDetails.classList.add('releaseviewlist');
            
            var rulelinks = RVroot.$$('#'+contentID+'.releaseviewlist .contextMenuContainer a.cmimg.editmode.jsInit');
            //add [edit] links for all the rules
            for(var j = 0;j < rulelinks.length; j++) {
                var ruleid = rulelinks[j].parentElement.parentElement.parentElement.children[0].children[0].value;
                var url = 'https://connect.ubc.ca/webapps/blackboard/execute/content/adaptiveReleaseCriteria?';
                url = url + 'course_id='+courseID+'&content_id='+contentID+'&rule_id='+ruleid;
                var newlink = document.createElement('a');
                newlink.setAttribute('href',url);
                newlink.innerHTML = "[Edit]";
                rulelinks[j].parentElement.appendChild(newlink);
                rulelinks[j].remove();
            }
            
            // hide all the non-relevant ui
            removeAllFromArray(RVroot.$$('#'+contentID+'.releaseviewlist #listContainer_nav_batch_top'));
            removeAllFromArray(RVroot.$$('#'+contentID+'.releaseviewlist #listContainer_nav_batch_bot'));
            removeAllFromArray(RVroot.$$('#'+contentID+'.releaseviewlist #listContainer_pagingcontrols'));
            removeAllFromArray(RVroot.$$('#'+contentID+'.releaseviewlist .smallCell input'));
            removeAllFromArray(RVroot.$$('#'+contentID+'.releaseviewlist #listContainer_selectAll'));
            
            // start the due date
            xmlhttp2.open("GET",baseURL2+parameters2,true);
            xmlhttp2.send();  
        }};
        
        // activate requests
        xmlhttp.open("GET",baseURL+parameters,true);
        xmlhttp.send();  
    }
    
    
    // activate - create message
    window.RVactivated = document.createElement('p');
    RVactivated.style.background = "#e6a640";
    RVactivated.style.padding = "5px";
    RVactivated.style.color = "#000";
    RVactivated.style.fontSize = "15px";
    RVactivated.id = 'releaseviewinit';
    RVactivated.innerHTML = 'releaseView Activated';
    RVroot.$('pageTitleText').appendChild(RVactivated);
    
    // activate - start requests
    RVrender();
    
})();