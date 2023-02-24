/* eslint-disable no-undef */
import { useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import script from './script';
import DURATION from './duration';
import './Popup.css';

function Popup() {
  const [isActive, setActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const buttonRef = useRef();

  const onClick = () => {
    setActive((x) => !x);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        args: [DURATION, isActive],
        func: script,
      });
    });

    if (isActive) buttonRef.current.remove();

    setTimeout(() => {
      chrome.storage.local.get(['timer'])
        .then((result) => {
          setTimer(result.timer);
          setTimeout(() => {
            buttonRef.current.remove();
          }, (result.timer * 1000 * DURATION));
        });
    }, 300);
  };

  const count = ({ remainingTime }) => {
    const TOTAL_DURATION = timer * DURATION;
    const result = Math.floor((TOTAL_DURATION - remainingTime) / DURATION);
    return (
      <div role="timer" aria-live="assertive" className="timer">
        {result}
      </div>
    );
  };

  return (
    <div className="extension-container">
      <h2 className="header-bar">
        LinkedIn AutoConnect
      </h2>
      {
        isActive
          ? (
            <>
              <h3 className="found">
                {`Invitations found on this page: ${timer}`}
              </h3>
              <hr />
            </>
          )
          : null
      }
      <h3 className="sent">
        Invitations Sent
      </h3>
      <div className="status">
        <CountdownCircleTimer
          isPlaying={!!isActive}
          duration={timer * DURATION}
          colors="orange"
          size={100}
        >
          {count}
        </CountdownCircleTimer>
      </div>
      <button
        ref={buttonRef}
        type="button"
        aria-label="click to auto click on connect button"
        onClick={onClick}
      >
        {isActive ? 'Stop Connecting' : 'Start Connecting'}
      </button>
    </div>
  );
}

export default Popup;
