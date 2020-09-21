

function setActive() {
    chrome.browserAction.setIcon( { path: 'icons/action_active.png' } );
    chrome.browserAction.setTitle( { title: '工具已激活' });
}
function setInactive() {
    chrome.browserAction.setIcon( { path: 'icons/action_inactive.png' } );
    chrome.browserAction.setTitle( { title: '工具未激活' });
}


/**
 * 检查tab是否激活
 */
function checkActive() {
    chrome.tabs.getSelected(null, function(tab) {
        if (!tab || tab.id < 0) return; // not really a tab, most likely a devtools window

        if (tab.url.substr(0,4) != 'http') {
            chrome.browserAction.setIcon( { path: 'icons/action_unavailable.png' } );
            chrome.browserAction.setTitle( { title: 'SEO模板抓取工具 [tab没有激活]' });
            chrome.browserAction.disable(tab.id);
            return;
        } else {
            chrome.browserAction.enable(tab.id);
        }

        chrome.tabs.sendMessage(tab.id, { action: 'getStatus' }, function(isActive) {
            if (chrome.runtime.lastError) return;
            if (isActive) {
                setActive();
            } else {
                setInactive();
            }
        });
    });
}

chrome.browserAction.onClicked.addListener(function() {
    //获取当前tab，在当前tab下发送一个消息，发送提示。意义不大。只是为了更友好。
    chrome.tabs.getSelected(null, function(tab) {

        chrome.tabs.sendMessage(tab.id, { 'action': 'toggle' }, function(response) {
            if (chrome.runtime.lastError) {
                // lastError needs to be checked, otherwise Chrome may throw an error
            }
            if (!response) {
                chrome.tabs.executeScript(tab.id, {
                    code: "if (confirm('Seo工具模板工具已安装，是否加载它?\\n此提示只在第一次打开时出现.')) location.reload();"
                });
            }
        });
    });
});

// chrome.extension
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'status' && msg.active == true) {
        setActive();
    } else if (msg.action == 'status' && msg.active == false) {
        setInactive();
    }

    if (msg.action === 'get_saved_elms') {
        sendResponse(localStorage['web:' + msg.website] || '{deleted: [], items: []}');
    } else if (msg.action === 'set_saved_elms') {
        localStorage['web:' + msg.website] = msg.data;
    } else if (msg.action === 'get_settings') {
        sendResponse(localStorage['settings'] || '{}');
    } else if (msg.action === 'set_settings') {
        localStorage['settings'] = msg.data;
    }
});

/**
 * 监听tab的状态，根据状态来确定工具的状态。
 */
chrome.tabs.onActivated.addListener(function(activeInfo) {
    checkActive();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    checkActive();
});

checkActive();