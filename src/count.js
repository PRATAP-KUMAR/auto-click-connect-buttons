import DURATION from './duration';

const count = ({ remainingTime }) => {
  const value = Math.abs(remainingTime / DURATION - DURATION);
  let result;
  if (remainingTime % DURATION === 0) {
    result = value;
  } else {
    result = Math.floor(value);
  }

  return (
    <div role="timer" aria-live="assertive" className="timer">
      {result}
    </div>
  );
};

export default count;
