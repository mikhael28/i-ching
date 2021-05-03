/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';
import { JudgementPage } from './pages/JudgementPage/Loadable';
import { QuestionPage } from './pages/QuestionPage/index';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { TimerPage } from './pages/TimerPage/index';
import { TaoPage } from './pages/TaoPage/index';
import { LoadingPage } from './pages/LoadingPage';
import { useTranslation } from 'react-i18next';
import { HexagramsPage } from './pages/HexagramsPage/index';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="Oracle of Changes"
        defaultTitle="Oracle of Changes"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="Consult the Oracle, drawing on the wisdom of 5000 years."
        />
      </Helmet>

      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          component={QuestionPage}
        />
        <Route exact path={`/tao`} component={TaoPage} />
        <Route exact path={`/meditation`} component={TimerPage} />
        <Route exact path={`/consulting`} component={LoadingPage} />
        <Route path={`/judgement`} component={JudgementPage} />
        <Route path={`/judgement/:id`} component={JudgementPage} />
        <Route exact path={`/hexagrams`} component={HexagramsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
