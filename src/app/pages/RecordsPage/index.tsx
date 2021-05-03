import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { hexagrams } from '../../../utils/hexagrams';
import './styles.css';

export function RecordsPage(props) {
  const [records, setRecords] = useState<Record[]>([]);

  interface Record {
    question: string;
    date: string;
    hexagram: number;
    changing: boolean;
    changingHexagram: number;
  }

  useEffect(() => {
    let recs = localStorage.getItem('history');
    if (recs === undefined || recs === undefined) {
      return;
    } else {
      // setRecords(recs);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Past Records</title>
        <meta
          name="description"
          content="Review previous consultations with the Oracle"
        />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>Tap to read</Title>
        <div className="exp-cards">
          {records.map((hex, idx) => {
            const img = require(`../../../utils/assets/${hex.hexagram}.png`);
            return (
              <div
                className="exp-card"
                onClick={() => props.history.push(`/judgement/${hex.hexagram}`)}
              >
                <img src={img.default} />
                <p>{hex.hexagram}</p>
                <p>{hex.question}</p>
                <p>{hex.date}</p>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  margin-top: 50px;
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
