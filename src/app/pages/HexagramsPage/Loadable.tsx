/**
 * Asynchronously loads the component for Hexagrams
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const HexagramsPage = lazyLoad(
  () => import('./index'),
  module => module.HexagramsPage,
  {
    fallback: <LoadingIndicator />,
  },
);
