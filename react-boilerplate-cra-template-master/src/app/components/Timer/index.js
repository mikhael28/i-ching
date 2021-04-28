import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styled from 'styled-components/macro';

const minuteSeconds = 60;
const hourSeconds = 3600;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = time => (minuteSeconds - time) | 0;
const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;

export default function Timer() {
  // 8 minutes and 8 seconds
  const remainingTime = 488;

  return (
    <Wrapper>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#6A359C']]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={totalElapsedTime => [
          remainingTime - totalElapsedTime > minuteSeconds,
        ]}
      >
        {({ elapsedTime }) =>
          renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[['#9969C7']]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={totalElapsedTime => [remainingTime - totalElapsedTime > 0]}
      >
        {({ elapsedTime }) =>
          renderTime('seconds', getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: sans-serif;
  text-align: center;
  padding-top: 30px;
  font-size: 22px;
`;
