import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
// import { Input } from '../../components/Input';
import { NavBar } from 'app/components/NavBar';
import Fire from '../../components/Fire';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';

export function QuestionPage() {
  // const [question, setQuestion] = useState<string>('');

  // const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuestion(evt.currentTarget.value);
  // }

  // console.log('Question state: ', question)

  return (
    <>
      <Helmet>
        <title>Consult the Oracle</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>The Oracle Awaits</Title>
        <Fire />
        <P>Enter your question below and prepare to meditate.</P>
        {/* <Input value={question} onChange={handleChange} text="textbox" placeholder="Write here..." /> */}
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
  margin-top: -8vh;
  /* font-weight: bold; */
  color: ${p => p.theme.text};
  font-size: 1.375rem;

  span {
    font-size: 3.125rem;
  }
`;
