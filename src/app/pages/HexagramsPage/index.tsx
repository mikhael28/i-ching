import * as React from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { hexagrams } from '../../../utils/hexagrams';
import './styles.css';

export function HexagramsPage(props) {
  return (
    <>
      <Helmet>
        <title>Hexagrams List</title>
        <meta name="description" content="Research and review" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>Tap to read</Title>
        <div className="exp-cards">
          {hexagrams.map((hex, idx) => {
            const img = require(`../../../utils/assets/${hex.number}.png`);
            return (
              <div
                className="exp-card"
                onClick={() => props.history.push(`/judgement/${hex.number}`)}
              >
                <img src={img.default} />
                <p>{hex.number}</p>
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
