import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { NavBar } from 'app/components/NavBar';
import { TextButton } from 'app/components/TextButton';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export function TimerPage(props) {
  const [question, setQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [minutesState, setMinutesState] = useState<number>(8);

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
        <div className="time">{minutesState} min</div>
        <div>
          {time} {dimension}
        </div>
      </div>
    );
  };

  const getTimeSeconds = time => (minuteSeconds - time) | 0;
  const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;

  useEffect(() => {
    let storedQuestion = localStorage.getItem('question');
    if (storedQuestion !== null) {
      // this if block is a great example of TypeScript preventing a bug
      setQuestion(storedQuestion);
    }
  }, []);
  // const remainingTime = 8;
  const remainingTime = 8;

  return (
    <>
      <Helmet>
        <title>Consult the Oracle</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>Reflect & Meditate</Title>
        <P>{question}</P>
        <TimeWrapper>
          <CountdownCircleTimer
            {...timerProps}
            colors="#9969C7"
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={totalElapsedTime => {
              setMinutesState(minutesState - 1);
              console.log('Remaining time: ', remainingTime);
              console.log('Total elapsed time', totalElapsedTime);
              console.log(remainingTime - totalElapsedTime);
              console.log(remainingTime - totalElapsedTime === 0);
              if (remainingTime - totalElapsedTime === 0) {
                setLoading(true);
                props.history.push('/consulting');
              }
              return [remainingTime - totalElapsedTime >= minuteSeconds, 8];
            }}
          >
            {({ elapsedTime }) =>
              renderTime('seconds', getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </TimeWrapper>
        {loading === true ? (
          <TextButton
            onClick={() => props.history.push('/consulting')}
            style={{ marginTop: 30, fontSize: 32 }}
          >
            Begin Consultation
          </TextButton>
        ) : null}
      </Wrapper>
    </>
  );
}
const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: sans-serif;
  text-align: center;
  padding-top: 30px;
  margin: 10px;
  font-size: 22px;
`;

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -40vh;
  /* font-weight: bold; */
  color: ${p => p.theme.text};
  font-size: 1.375rem;

  span {
    font-size: 3.125rem;
  }
`;
