import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
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
      window.scrollTo(0, 0);
    }
  }

  function previousChapter() {
    if (verse !== 0) {
      setActive(tao[verse - 1].passage);
      setVerse(verse - 1);
      window.scrollTo(0, 0);
    }
  }
  return (
    <div style={{ marginBottom: -30 }}>
      <Helmet>
        <title>The Tao Te Ching</title>
        <meta name="description" content="The Tao Te Ching" />
      </Helmet>
      <NavBar />
      <Wrapper>
        {/* @TODO: styling needs major work */}
        <Title>Tao Te Ching</Title>
        {passages.map(poem => {
          return <Tao>{poem}</Tao>;
        })}
      </Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <TaoButton onClick={previousChapter}>Previous Chapter</TaoButton>
        <TaoButton onClick={nextChapter}>Next Chapter</TaoButton>
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const Tao = styled.p`
  font-size: 1.25rem;
  /* line-height: 1.5; */
  color: ${p => p.theme.textSecondary};
  margin: 0.25rem 6px 0.25rem 6px;
  text-align: center;
`;

const TaoButton = styled.button`
  background: none;
  outline: none;
  padding: 0;
  margin-bottom: 0;
  border: none;
  color: ${p => p.theme.primary};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  &:active {
    opacity: 0.4;
  }
`;
