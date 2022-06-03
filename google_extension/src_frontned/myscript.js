/*chrome.action.onClicked.addListener(function(tab) {  
    console.log("wrawrrar")
    chrome.tabs.executeScript({  
        code: 'document.body.style.background="red"'  
    });  
  });
  */


/*
chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    console.log("Message from the background script:");
    console.log(request.test);
    sendResponse({farewell: "Hi from content script"});
});*/


chrome.runtime.onMessage.addListener(  
    function(request, sender, sendResponse) {  
    console.log(request.test)
    console.log(sender.tab ?   
          "取得到tab，這是來自內容腳本的訊息：" + sender.tab.url   
          : "沒有tab，這是來自擴充功能內部的訊息");  
      if (request.test %2 == 1)  {
        document.body.style.backgroundColor="red"
      }else{
        document.body.style.backgroundColor=""
      }
        sendResponse({farewell: "再見"});  
});