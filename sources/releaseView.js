/*
List of globals:
window.RVmessage
window.RVmessageLoading
window.RVmessageDone
window.RVmessageHide
window.RVdetails
window.RVrender
window.RVgetreleases
*/

(function(){
    // first time running -> set up definitions
    if(frames[1].$('releaseviewinit') == null) {
        
        // get the detail <divs>
        window.RVdetails = frames[1].document.getElementsByClassName('details');
        
        // Create the notification area for use later on
        if(typeof RVmessage === 'undefined') {
            window.RVmessage = document.createElement('p');
            RVmessage.style.background = "#e6a640";
            RVmessage.style.padding = "5px";
            RVmessage.style.color = "#000";
            RVmessage.style.display = "none";
            RVmessage.style.fontSize = "15px";
            RVmessage.innerHTML = 'releaseView';
            RVmessage.id = 'releaseviewinit';
            frames[1].$('pageTitleText').appendChild(RVmessage);
        }
        
        // sets the notification area to loading
        window.RVmessageLoading = function() {
            frames[1].$('pageTitleText').appendChild(RVmessage);
            RVmessage.style.display = "block";
            RVmessage.innerHTML = 'releaseView Loading';
            var loadingImage = document.createElement('img');
            loadingImage.setAttribute('src','/images/ci/misc/progress/progress_learningSystem.gif');
            RVmessage.appendChild(loadingImage);
        }
        
        // sets the notification area to done
        window.RVmessageDone = function() {
            frames[1].$('pageTitleText').appendChild(RVmessage);
            RVmessage.style.display = "block";
            RVmessage.innerHTML = 'releaseView Activated';
        }
        
        //sets the notification area to a hidden state
        window.RVmessageHide = function() {
            frames[1].$('pageTitleText').appendChild(RVmessage);
            RVmessage.style.display = "none";
        }
        
        // function that starts displaying all the releases
        window.RVrender = function() {
            for(var i = 0;i<RVdetails.length;i++) {
            // 
            }    
        }
        
        // function that gets the release data from Connect
        window.RVgetreleases = function() {
            
        }
    }
    
    
    if(RVmessage.classList.length == 0) {
        //activate
        
        RVmessage.classList.add('on');
    } else {
        //deactivate
        RVmessage.classList.remove('on');
    }
    
})();