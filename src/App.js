import { useState } from 'react';
import './App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function App() {

  const [isActive, setActive] = useState(false);

  const Script = () => {
    const buttons = document.querySelectorAll('[aria-label^="Invite"]');
    buttons.forEach((btn, idx) => {
      setTimeout(() => {
        btn.remove();
      }, 5000 * (idx + 1));
    })
  }

  const dom = () => {
    /* eslint-disable no-undef */
    setActive(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: Script
      })
    })
  }

  return (
    <div className="extension-container" id='CONNECT-EXTENSION'>
      <h2>
        Send Inivations
      </h2>
      {
        isActive ?
          <CountdownCircleTimer
            isPlaying
            duration={20}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer> :
          null
      }
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
