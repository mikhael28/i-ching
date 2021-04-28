import React from 'react';
import './fire.css';

export default function Fire() {
  return (
    <div className="fire">
      <div className="fire-left">
        <div className="main-fire"></div>
        <div className="particle-fire"></div>
      </div>
      <div className="fire-main">
        <div className="main-fire"></div>
        <div className="particle-fire"></div>
      </div>
      <div className="fire-right">
        <div className="main-fire"></div>
        <div className="particle-fire"></div>
      </div>
      <div className="fire-bottom">
        <div className="main-fire"></div>
      </div>
    </div>
  );
}
