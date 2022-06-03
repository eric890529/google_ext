chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {  
    //console.log(tabs)
    chrome.scripting.executeScript( {
        target: {tabId: tabs[0].id},
        func: getText,
    }, function(selection) {
        console.log(selection)
        
        if(selection[0].result === ""){
            document.getElementById("input").innerHTML = "default";
            document.getElementById("output").innerHTML = "default";
        }else{
            translate(selection[0].result, {to: 'zh-tw'}).then(res => {
                //console.log(res);
                console.log(res.text);
                var transText = res.text;
                document.getElementById("input").innerHTML = selection[0].result;
                document.getElementById("output").innerHTML = transText;
            }).catch(err => {
                console.error(err);
            });
        }
    }); 
});

const element = document.getElementById("myBtn");
element.addEventListener("click", function() {
    axios.get(host+'/sql')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

var { translate } = require("google-translate-api-browser");
const host = "http://localhost:5001"
const axios = require('axios').default;


function getText(){
    return window.getSelection().toString();
}