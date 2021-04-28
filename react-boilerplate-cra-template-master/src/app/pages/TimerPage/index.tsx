import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { NavBar } from 'app/components/NavBar';
import Timer from '../../components/Timer';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';

export function TimerPage(props) {
  const [question, setQuestion] = useState<string>('');

  useEffect(() => {
    let storedQuestion = localStorage.getItem('question');
    if (storedQuestion !== null) {
      // this if block is a great example of TypeScript preventing a bug
      setQuestion(storedQuestion);
    }
  }, []);

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
        <Timer />
      </Wrapper>
    </>
  );
}

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
