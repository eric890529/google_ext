chrome.runtime.onInstalled.addListener(() => {
    // 一次性的創建一個右鍵選單項目
    chrome.contextMenus.create({  
        "id": 'test',//一定要有id
        "title": "查字典",  
        "type": "normal",  
        "contexts": ['selection']
    });  
  })
  
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // 確認點擊的項目 id 是 showImageUrl
  if (info.menuItemId !== "test") { return }
  console.log(info.selectionText)
  // 傳送訊息給目前頁面的內容腳本
  let newUrl = "https://tw.voicetube.com/definition/" + info.selectionText  // 組合成新網址
  chrome.tabs.create({ url: newUrl })   
    
})



/*
chrome.action.onClicked.addListener(function(tab) {  
  console.log("wrawrrar")
  chrome.tabs.executeScript({  //注意m3寫法
      code: 'document.body.style.backgroundColor="red"'  
  });  
});
*/

let count = 0
chrome.action.onClicked.addListener(function(tab) {//監聽icon 但有popup時不會啟用
  // No tabs or host permissions needed!
  //const tabId = getTabId();
  count++;
  console.log('Turning ' + tab.url + ' red!' );
 /* chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['myscript.js'],
  });*/
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {  
    console.log(tabs)
    chrome.tabs.sendMessage(tabs[0].id, { test: count }, function(response) {  
        console.log(response.farewell);  
    });  
  });
});
