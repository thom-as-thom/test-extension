function getCurrentTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(tabs[0]);
            }
        });
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                function addEventListenersToInputs() {
                    console.log('Adding event listeners to inputs');
                    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
                    inputs.forEach(input => {
                        input.addEventListener('change', (event) => {
                            console.log('Input changed:', event.target.value);
                        });
                    });
                }
                function openIframes() {
                    const iframes = document.querySelectorAll('iframe');
                    iframes.forEach(iframe => {
                        const url = iframe.src;
                        console.log('Opening iframe URL:', url);
                        window.open(url, '_blank');
                    });
                }

                openIframes();

                addEventListenersToInputs();
            },
        });
    }
})



