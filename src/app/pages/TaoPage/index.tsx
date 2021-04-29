import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { P } from '../../components/P';
import { Link } from 'app/components/Link';
import { TextButton } from 'app/components/TextButton';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { tao } from '../../../utils/tao.js';
export function TaoPage() {
  const [activePassage, setActive] = useState({
    chapterNum: '',
    poem: '',
  });

  const [passages, setPassages] = useState<Array<string>>([]);
  const [verse, setVerse] = useState<number>(0);

  useEffect(() => {
    setActive(tao[0].passage);
  }, []);

  useEffect(() => {
    let newArray: any[] = [];
    let splitStrings = activePassage.poem.split('</br>');
    splitStrings.map((line, index) => {
      if (line !== '</br>') {
        newArray.push(line);
      }
    });
    setPassages(newArray);
  }, [activePassage]);

  function nextChapter() {
    if (verse + 1 !== tao.length) {
      setActive(tao[verse + 1].passage);
      setVerse(verse + 1);
    }
  }

  function previousChapter() {
    if (verse !== 0) {
      setActive(tao[verse - 1].passage);
      setVerse(verse - 1);
    }
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>The Tao Te Ching</title>
        <meta name="description" content="The Tao Te Ching" />
      </Helmet>
      <NavBar />
      <Wrapper>
        {/* @TODO: styling needs major work */}
        <Title>Tao Te Ching</Title>
        {passages.map(poem => {
          return <P>{poem}</P>;
        })}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextButton onClick={previousChapter}>Previous Chapter</TextButton>
          <TextButton onClick={nextChapter}>Next Chapter</TextButton>
        </div>
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
  /* height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT}); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  margin-top: 80px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${p => p.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
