import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { NavBar } from 'app/components/NavBar';
import { TextButton } from 'app/components/TextButton';
import { Helmet } from 'react-helmet-async';
import { hexagrams } from '../../../utils/hexagrams';
import { LineCast } from 'utils/yarrow';

export function JudgementPage(props) {
  // const [question, setQuestion] = useState<string>('');
  const [imageString, setImageString] = useState<string>('');
  const [commentaryString, setCommentaryString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [changingLines, setChangingLines] = useState<boolean>(false);

  const [judgement, setJudgement] = useState<Judgement>({
    number: 0,
    names: ['something'],
    chineseName: 'string',
    pinyinName: 'string',
    character: 'string',
    topTrigram: 0,
    bottomTrigram: 0,
    binary: 'string',
    lineNumbers: [0],
    linesString: '',
    description: '',
    title: '',
    heaven: '',
    summary: '',
    judgement: [''],
    image: [''],
    lines: [''],
  });

  const [changingJudgement, setChangingJudgement] = useState<Judgement>({
    number: 0,
    names: ['something'],
    chineseName: 'string',
    pinyinName: 'string',
    character: 'string',
    topTrigram: 0,
    bottomTrigram: 0,
    binary: 'string',
    lineNumbers: [0],
    linesString: '',
    description: '',
    title: '',
    heaven: '',
    summary: '',
    judgement: [''],
    image: [''],
    lines: [''],
  });

  useEffect(() => {
    let splitPath = window.location.pathname.split('/');
    if (splitPath.length === 2) {
      organizeDivination(hexagrams);
    } else {
      console.log(splitPath[2].length);
      console.log(splitPath);
      if (splitPath[2].length === 0) {
        organizeDivination(hexagrams);
      } else {
        runAlgorithm(parseInt(splitPath[2]));
      }
    }
  }, []);

  function runAlgorithm(index) {
    console.log(index);
    console.log(hexagrams[index]);
    // this code below is ridiculous, need to normalize JSON
    setJudgement(hexagrams[index - 1]);
    let logo = require(`../../../utils/assets/${index}.png`);
    setImageString(logo.default);
    setLoading(false);
  }

  // Not currently used
  // interface Trigram {
  //   number: number;
  //   names: string[];
  //   chineseName: string;
  //   pinyinName: string;
  //   character: string;
  //   attribute: string;
  //   images: string[];
  //   chineseImage: string;
  //   pinyinImage: string;
  //   familyRelationship: string;
  //   binary: string;
  //   lines: Number[];
  // }

  interface Judgement {
    number: number;
    names: string[];
    chineseName: string;
    pinyinName: string;
    character: string;
    topTrigram: number;
    bottomTrigram: number;
    binary: string;
    lineNumbers: number[];
    description: string;
    linesString: string;
    title: string;
    heaven: string;
    summary: string;
    judgement: string[];
    lines: string[];
    image: string[];
  }

  // @TODO: add functionality for saving questions
  // function validateForm() {
  //   if (question.length > 8) {
  //     return true;
  //   }
  // }

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>,
  // ): Promise<void> => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     console.log('Submitting question: ', question);
  //     //   localStorage.setItem('question', question);
  //     //   props.history.push('/meditation');
  //   }
  // };

  function organizeDivination(hexagrams) {
    let castDivination: number[] = [];
    let changingDivination: number[] = [];
    for (let i = 0; i < 6; i++) {
      let line = LineCast();
      if (line === '1') {
        castDivination.push(1);
        changingDivination.push(1);
      } else if (line === '0') {
        castDivination.push(0);
        changingDivination.push(0);
      } else if (line === 'o') {
        castDivination.push(1);
        changingDivination.push(0);
        setChangingLines(true);
      } else if (line === 'x') {
        castDivination.push(0);
        changingDivination.push(1);
        setChangingLines(true);
      }
    }
    let castString = castDivination.join('');
    let changeString = changingDivination.join('');

    for (let i = 0; i < hexagrams.length; i++) {
      if (hexagrams[i].linesString === castString) {
        setJudgement(hexagrams[i]);
        let logo = require(`../../../utils/assets/${hexagrams[i].number}.png`);
        setImageString(logo.default);
        break;
      }
    }

    for (let m = 0; m < hexagrams.length; m++) {
      if (hexagrams[m].linesString === changeString) {
        setChangingJudgement(hexagrams[m]);
        let changingLogo = require(`../../../utils/assets/${hexagrams[m].number}.png`);
        setCommentaryString(changingLogo.default);
      }
    }
    setLoading(false);
  }

  return (
    <>
     {/* @ts-ignore */}
      <Helmet>
        <title>The Judgement</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      {loading === true ? null : (
        <Wrapper>
          <Title>The Judgement</Title>
          <Title>{judgement.number}</Title>
          <div>
            {judgement.names.map((name, idx) => (
              <P>{name}</P>
            ))}
          </div>
          <img
            style={{
              color: 'white',
              backgroundColor: 'white',
              textAlign: 'center',
              marginTop: 20,
              height: 120,
              width: 120,
            }}
            alt=""
            src={imageString}
          />
          <div style={{ marginRight: '10%', marginLeft: '10%' }}>
            <P>{judgement.chineseName}</P>
            <P>{judgement.description}</P>
          </div>
          {changingLines === true ? (
            <Wrapper>
              <hr />
              <Title>Changing Lines Judgement</Title>
              <Title>{changingJudgement.number}</Title>
              <div>
                {changingJudgement.names.map((name, idx) => (
                  <P>{name}</P>
                ))}
              </div>
              <img
                style={{
                  color: 'white',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  marginTop: 20,
                  height: 120,
                  width: 120,
                }}
                alt=""
                src={commentaryString}
              />
              <div style={{ marginRight: '10%', marginLeft: '10%' }}>
                <P>{changingJudgement.chineseName}</P>
                <P>{changingJudgement.description}</P>
              </div>
            </Wrapper>
          ) : null}
          <TextButton
            onClick={() => props.history.push('/')}
            style={{ fontSize: 28, marginTop: 20, marginBottom: 40 }}
          >
            Begin Anew
          </TextButton>
          <div>
            <P>{judgement.summary}</P>
            {judgement.lines.map(line => {
              return <P>{line}</P>;
            })}
          </div>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  color: ${p => p.theme.text};
  font-size: 1.375rem;

  span {
    font-size: 3.125rem;
  }
`;
