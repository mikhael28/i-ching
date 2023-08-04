import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { Input } from '../../components/Input/index';
import { NavBar } from 'app/components/NavBar';
import Fire from '../../components/Fire';
import { Helmet } from 'react-helmet-async';
import { AiOutlineEnter } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import './styles.css';

export function QuestionPage(props) {
  const [question, setQuestion] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('history') === undefined) {
      localStorage.setItem('history', JSON.stringify([]));
    }
    localStorage.setItem('question', '');
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(evt.currentTarget.value);
    if (question.length > 7) {
      setDisabled(false);
    } else if (question.length <= 7) {
      setDisabled(true);
    }
  };

  function validateForm() {
    if (question.length > 8) {
      return true;
    } else {
      return false;
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
     {/* @ts-ignore */}
      <Helmet>
        <title>Consult the Oracle</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      <Fire />
      <Wrapper>
        <Title>The Oracle Awaits</Title>
        <form onSubmit={handleSubmit}>
          <div style={{ width: '100%' }}>
            <P>Enter your question below, reflect & meditate</P>
            <div
              style={{ marginRight: '10%', marginLeft: '10%', display: 'flex' }}
            >
              <Input
                value={question}
                onChange={handleChange}
                type="text"
                placeholder="Write here..."
              />
              <button disabled={disabled}>Ask</button>
            </div>
          </div>
        </form>
      </Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: -40,
        }}
      >
        <Item href="mailto:mikhael@hey.com">
          <FaMoneyCheckAlt />
          &nbsp;&nbsp;Hiring?
        </Item>

        <Item
          href="https://github.com/mikhael28/i-ching"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          <AiFillGithub />
          &nbsp;&nbsp;Source Code
        </Item>
      </div>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  margin-top: 200px;
`;

const Title = styled.div`
  margin-top: -8vh;
  color: ${p => p.theme.text};
  font-size: 1.375rem;

  span {
    font-size: 3.125rem;
  }
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
