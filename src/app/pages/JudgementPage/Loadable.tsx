/**
 * Asynchronously loads the component for Tao
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
// import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const JudgementPage = lazyLoad(
  () => import('./index'),
  module => module.JudgementPage,
  {
    fallback: <React.Fragment />,
  },
);
