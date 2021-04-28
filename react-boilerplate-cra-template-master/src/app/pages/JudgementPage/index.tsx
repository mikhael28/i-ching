import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { hexagrams } from '../../../utils/hexagrams';

export function JudgementPage(props) {
  const [question, setQuestion] = useState<string>('');
  const [imageString, setImageString] = useState<string>('');

  const [judgement, setJudgement] = useState<Judgement>({
    number: 0,
    names: ['something'],
    chineseName: 'string',
    pinyinName: 'string',
    character: 'string',
    topTrigram: 0,
    bottomTrigram: 0,
    binary: 'string',
    lines: [1, 2],
  });

  useEffect(() => {
    runAlgorithm();
  }, []);

  function runAlgorithm() {
    setJudgement(hexagrams[3]);
    const logo = require(`../../assets/${3}.png`);
    console.log(logo);
    setImageString(logo.default);
  }

  interface Trigram {
    number: number;
    names: string[];
    chineseName: string;
    pinyinName: string;
    character: string;
    attribute: string;
    images: string[];
    chineseImage: string;
    pinyinImage: string;
    familyRelationship: string;
    binary: string;
    lines: Number[];
  }

  interface Judgement {
    number: number;
    names: string[];
    chineseName: string;
    pinyinName: string;
    character: string;
    topTrigram: number;
    bottomTrigram: number;
    binary: string;
    lines: number[];
  }

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
      //   localStorage.setItem('question', question);
      //   props.history.push('/meditation');
    }
  };

  console.log(judgement);

  return (
    <>
      <Helmet>
        <title>The Judgement</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>The Judgement</Title>
        <p style={{ color: 'white' }}>{judgement.character}</p>
        <div style={{ marginRight: '10%', marginLeft: '10%' }}>
          <P>{judgement.chineseName}</P>
        </div>
        <div style={{ backgroundColor: 'white' }}>
          <img style={{ color: 'white' }} src={imageString} />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  /* justify-content: start; */
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  /* min-height: 320px; */
`;

const Title = styled.div`
  /* margin-top: -8vh; */
  /* font-weight: bold; */
  color: ${p => p.theme.text};
  font-size: 1.375rem;

  span {
    font-size: 3.125rem;
  }
`;
