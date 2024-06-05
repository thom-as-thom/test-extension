import { useState, useEffect } from 'react';

function useCurrentTab() {
  const [tab, setTab] = useState<chrome.tabs.Tab | null>(null);

  const getCurrentTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setTab(tabs[0]);
    });
  };

  useEffect(() => {
    getCurrentTab();
  }, []);

  return [tab, getCurrentTab] as const;
}

export default useCurrentTab;