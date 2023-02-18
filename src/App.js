/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';

function App() {
  const [isActive, setActive] = useState(false);
  const [timer, setTimer] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      chrome.storage.local.get(['timer']).then((result) => {
        setTimer(result.timer);
      });
    }
  }, [timer]);

  useEffect(() => {
    if (count === 0 || count > 0) {
      chrome.storage.local.get(['count']).then((result) => {
        setCount(result.count);
      });
    }
  }, [count]);

  function script() {
    const buttons = document.querySelectorAll('[aria-label^="Invite"]');
    chrome.storage.local.set({ timer: buttons.length });

    buttons.forEach((btn, idx) => {
      setTimeout(() => {
        const button = btn;
        button.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        button.style.backgroundColor = 'red';
        chrome.storage.local.set({ count: idx + 1 });
      }, 5000 * (idx + 1));
    });
  }

  const dom = (e) => {
    e.target.remove();
    alert(window.location.href);
    setActive(true);
    chrome.storage.local.set({ count: 0 });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: script,
      });
    });
  };

  const children = ({ remainingTime }) => {
    const value = Math.abs(remainingTime / 5 - 5);
    if (remainingTime % 5 === 0) return value;
    return Math.floor(value);
  };

  return (
    <div className="extension-container" id="CONNECT-EXTENSION">
      <h2 className="header-bar">
        LinkedIn AutoConnect
      </h2>
      {
        isActive
          ? (
            <h3 className="invitations-count">
              Invitations Sent
            </h3>
          )
          : (
            <h3>
              &darr;
            </h3>
          )
      }
      <div className="status">
        {
          isActive
            ? (
              <CountdownCircleTimer
                isPlaying
                duration={timer * 5}
                colors={['#4dba12']}
              >
                {children}
              </CountdownCircleTimer>
            )
            : null
        }
      </div>
      <button
        type="button"
        aria-label="click to auto click on connect button"
        onClick={dom}
      >
        {isActive ? 'Stop Connecting' : 'Start Connecting'}
      </button>
    </div>
  );
}

export default App;
