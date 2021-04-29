import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { Input } from '../../components/Input/index';
import { NavBar } from 'app/components/NavBar';
import Fire from '../../components/Fire';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';

export function QuestionPage(props) {
  const [question, setQuestion] = useState<string>('');

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(evt.currentTarget.value);
  };

  function validateForm() {
    if (question.length > 8) {
      return true;
    }
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Submitting question: ', question);
      localStorage.setItem('question', question);
      props.history.push('/meditation');
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div style={{ width: '100%' }}>
            <P>Enter your question below and prepare to meditate.</P>
            <div style={{ marginRight: '10%', marginLeft: '10%' }}>
              <Input
                value={question}
                onChange={handleChange}
                type="text"
                placeholder="Write here..."
              />
            </div>
          </div>
        </form>
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