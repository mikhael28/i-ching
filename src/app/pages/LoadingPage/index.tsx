import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import './styles.css';

export function LoadingPage(props) {
  useEffect(() => {
    setTimeout(() => {
      props.history.push('/judgement');
    }, 10000);
  }, []);
  return (
    <>
     {/* @ts-ignore */}
      <Helmet>
        <title>Consulting</title>
        <meta name="description" content="Consulting in Progress" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <div className="Loader"></div>
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
