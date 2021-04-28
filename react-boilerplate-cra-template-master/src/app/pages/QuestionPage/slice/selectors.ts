import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.question || initialState;

export const selectQuestion = createSelector([selectSlice], state => state);
