import Logic from './Logic/Logic';
import './App.css';

function App() {
  const dom = () => {
    /* eslint-disable no-undef */
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: Logic,
      });
    })
  }

  return (
    <div className="extension-container">
      <h2>
        My first chrome extension creation
      </h2>
      <button
        type='button'
        aria-label='click to auto click on connect button'
        onClick={dom}
      >
        Start Connecting
      </button>
    </div>
  );
}

export default App;
