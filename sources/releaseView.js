/*
List of globals:
window.RVroot;
window.RVmessage
window.RVmessageLoading
window.RVmessageDone
window.RVmessageHide
window.RVdetails
window.RVrender
window.RVgetreleases
*/

(function(){
    
    // see if we are in frame mode or not
    window.RVroot = (frames.length == 0) ? window : frames[1];

    // get the detail <divs>
    window.RVdetails = RVroot.document.getElementsByClassName('details');

    // Create the notification area for use later on
    if(typeof RVmessage === 'undefined') {
        window.RVmessage = document.createElement('p');
        RVmessage.style.background = "#e6a640";
        RVmessage.style.padding = "5px";
        RVmessage.style.color = "#000";
        RVmessage.style.display = "none";
        RVmessage.style.fontSize = "15px";
        RVmessage.id = 'releaseviewinit';
    }

    // sets the notification area to loading
    function RVmessageLoading() {
        RVroot.$('pageTitleText').appendChild(RVmessage);
        RVmessage.style.display = "block";
        RVmessage.innerHTML = 'releaseView Loading';
        var loadingImage = document.createElement('img');
        loadingImage.setAttribute('src','/images/ci/misc/progress/progress_learningSystem.gif');
        RVmessage.appendChild(loadingImage);
    }

    // sets the notification area to done
    function RVmessageDone() {
        var temp = RVroot.$$('.smallCell input');
        for(var j = 0; j<temp.length; j++) {
            temp[j].remove();
        }
        temp = RVroot.$$('#listContainer_selectAll');
        for(var j = 0; j<temp.length; j++) {
            temp[j].remove();
        }
    
        RVroot.$('pageTitleText').appendChild(RVmessage);
        RVmessage.style.display = "block";
        RVmessage.innerHTML = 'releaseView Activated';
    }

    //sets the notification area to a hidden state
    function RVmessageHide() {
        RVroot.$('pageTitleText').appendChild(RVmessage);
        RVmessage.style.display = "none";
    }

    // function that starts displaying all the releases
    function RVrender() {
        var courseID = RVroot.contentList.courseId;
        var numreleases = 0;
        for(var i = 0;i<RVdetails.length;i++) {
            if(RVdetails[i].innerHTML.indexOf('Adaptive Release')!==-1) {
                numreleases += 1;
            }
        }
        if(numreleases==0) {
            RVmessageDone();
            return;
        }
        for(var i = 0;i<RVdetails.length;i++) {
            if(RVdetails[i].innerHTML.indexOf('Adaptive Release')!==-1) {
                numreleases -= 1;
                var contentID = RVdetails[i].parentNode.getElementsByClassName('item clearfix')[0].getAttribute('id');
                if(numreleases==0) {
                    RVgetreleases(contentID,courseID,RVdetails[i],RVmessageDone);
                } else {
                    RVgetreleases(contentID,courseID,RVdetails[i],null); //dummy call
                }
            }
        }
        
    }

    // function that gets the release data from Connect and writes it
    function RVgetreleases(contentID,courseID,node,callback) {
        
        var baseURL = "/webapps/blackboard/content/listRules.jsp?";
        var parameters = "course_id="+courseID+"&"+"content_id="+contentID;

        var xmlhttp=new XMLHttpRequest(); 
        var availDetails = document.createElement('div'); 
        xmlhttp.onreadystatechange=function() {if (xmlhttp.readyState===4 && xmlhttp.status===200){
            availDetails.innerHTML = xmlhttp.responseText;
            availDetails.innerHTML = availDetails.select('#listContainer_datatable')[0].outerHTML;
            node.appendChild(availDetails);
            availDetails.id = contentID;
            availDetails.classList.add('releaseviewlist');
            
            var rulelinks = RVroot.$$('#'+contentID+'.releaseviewlist .contextMenuContainer a.cmimg.editmode.jsInit');
            
            for(var j = 0;j < rulelinks.length; j++) {
                var ruleid = rulelinks[j].parentElement.parentElement.parentElement.children[0].children[0].value;
                var url = 'https://connect.ubc.ca/webapps/blackboard/execute/content/adaptiveReleaseCriteria?';
                url = url + 'course_id='+courseID+'&content_id='+contentID+'&rule_id='+ruleid;
                var newlink = document.createElement('a');
                newlink.setAttribute('href',url);
                newlink.innerHTML = "[Edit]";
                rulelinks[0].parentElement.appendChild(newlink);
                rulelinks[0].remove();
            }
            
            if(callback!=null) {
                callback();
            }
        }};
        
        xmlhttp.open("GET",baseURL+parameters,true);
        xmlhttp.send();  
    }
    
    
    //activate
    RVmessageLoading();
    RVrender();
    
})();