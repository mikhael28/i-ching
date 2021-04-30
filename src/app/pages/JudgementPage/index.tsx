import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { NavBar } from 'app/components/NavBar';
import { TextButton } from 'app/components/TextButton';
import { Helmet } from 'react-helmet-async';
import { commentaryLibrary } from '../../../utils/commentary';
import { hexagrams } from '../../../utils/hexagrams';
import { LineCast } from 'utils/yarrow';

export function JudgementPage(props) {
  const [question, setQuestion] = useState<string>('');
  const [imageString, setImageString] = useState<string>('');
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
    lines: [1, 2],
    linesString: '',
    description: '',
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
    lines: [1, 2],
    linesString: '',
    description: '',
  });

  const [commentary, setCommentary] = useState<Commentary>({
    num: 0,
    title: '',
    heaven: '',
    summary: '',
    judgement: [],
    image: [],
    lines: [],
  });

  const [changingCommentary, setChangingCommentary] = useState<Commentary>({
    num: 0,
    title: '',
    heaven: '',
    summary: '',
    judgement: [],
    image: [],
    lines: [],
  });

  useEffect(() => {
    let splitPath = window.location.pathname.split('/');
    if (splitPath.length === 2) {
      organizeDivination();
    } else if (splitPath.length === 3) {
      runAlgorithm(parseInt(splitPath[2]));
    }
  }, []);

  function runAlgorithm(index) {
    console.log(index);
    setJudgement(hexagrams[index]);
    for (let i = 0; i < commentaryLibrary.length; i++) {
      console.log(commentaryLibrary);
      if (commentaryLibrary[i].num === index) {
        setCommentary(commentaryLibrary[i]);
      }
    }
    const logo = require(`../../../utils/assets/${index}.png`);
    setImageString(logo.default);
    setLoading(false);
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
    description: string;
    linesString: string;
  }

  interface Commentary {
    num: number;
    title: string;
    heaven: string;
    summary: string;
    judgement: string[];
    image: string[];
    lines: string[];
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

  function organizeDivination() {
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
    let castHex;
    let changeHex;

    for (let i = 0; i < hexagrams.length; i++) {
      if (hexagrams[i].linesString === castString) {
        castHex = hexagrams[i];
        setJudgement(hexagrams[i]);
        break;
      }
    }

    for (let m = 0; m < hexagrams.length; m++) {
      if (hexagrams[m].linesString === changeString) {
        changeHex = hexagrams[m];
        setChangingJudgement(hexagrams[m]);
      }
    }
    runAlgorithm(castHex.number);
    setLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>The Judgement</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      {loading === true ? null : (
        <Wrapper>
          <Title>The Judgement</Title>
          <div>
            {judgement.names.map((name, idx) => (
              <P>
                {idx + 1}. {name}
              </P>
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
              <div>
                {changingJudgement.names.map((name, idx) => (
                  <P>
                    {idx + 1}. {name}
                  </P>
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
                src={imageString}
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
            <P>{commentary.summary}</P>
            {commentary.lines.map(line => {
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
