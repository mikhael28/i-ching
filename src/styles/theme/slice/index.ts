import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { getThemeFromStorage } from '../utils';
import { ThemeKeyType, ThemeState } from './types';

export const initialState: ThemeState = {
  // disabled the option to pick the theme, but keeping the functionality for the future.
  // selected: getThemeFromStorage() || 'system',
  selected: 'dark',
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.selected = action.payload;
    },
  },
});

export const { actions: themeActions, reducer } = slice;

export const useThemeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
