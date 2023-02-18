/* eslint-disable no-undef */
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import script from './script';
import count from './count';
import './App.css';

import DURATION from './duration';

function App() {
  const [isActive, setActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const onClick = (e) => {
    e.target.remove();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        args: [DURATION],
        function: script,
      });
    });

    chrome.storage.sync.get(['timer'])
      .then((result) => {
        setTimer(result.timer);
        setActive(true);
      });
  };

  return (
    <div className="extension-container">
      <h2 className="header-bar">
        LinkedIn AutoConnect
      </h2>
      {
        isActive
          ? (
            <h3 className="invitations-count">
              {`Invitations found on this page: ${timer}`}
              <br />
              <br />
              <hr />
              <br />
              Invitations Sent
              <br />
            </h3>
          )
          : (
            <h3 className="invitations-count">
              Click the button below to start
            </h3>
          )
      }
      <div className="status">
        {
          isActive
            ? (
              <CountdownCircleTimer
                isPlaying
                duration={timer * DURATION}
                colors="orange"
                size={100}
              >
                {count}
              </CountdownCircleTimer>
            )
            : null
        }
      </div>
      <button
        type="button"
        aria-label="click to auto click on connect button"
        onClick={onClick}
      >
        {isActive ? 'Stop Connecting' : 'Start Connecting'}
      </button>
    </div>
  );
}

export default App;
