import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  fetched: false,
};

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    wasFetched: (state, action) => {
      state.fetched = action.payload;
    },
    store: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { wasFetched, store } = matchesSlice.actions;

export const fetchMatches = () => (dispatch) => {
  dispatch(store(JSON.parse(window.localStorage.getItem('matches')) || {}));
  dispatch(wasFetched(true));
};

export const updateMatch = (match) => (dispatch) => {
  try {
    const matches = window.localStorage.getItem('matches');
    const currentMatches = JSON.parse(matches);

    window.localStorage.setItem(
      'matches',
      JSON.stringify({ ...currentMatches, ...match }),
    );
    dispatch(store({ ...currentMatches, ...match }));
  } catch (e) {
    throw Error(e);
  }
};

export const createMatch = (teams) => (dispatch) => {
  try {
    const matches = window.localStorage.getItem('matches');
    const currentMatches = matches ? JSON.parse(matches) : {};
    const newMatch = {
      [`${teams[0].team.toLowerCase()}_${teams[1].team.toLowerCase()}`]: [
        {
          team: teams[0].team,
          score: '',
          win: false,
          lost: false,
          draw: false,
        },
        {
          team: teams[1].team,
          score: '',
          win: false,
          lost: false,
          draw: false,
        },
      ],
    };
    window.localStorage.setItem(
      'matches',
      JSON.stringify({ ...currentMatches, ...newMatch }),
    );

    dispatch(store({ ...currentMatches, ...newMatch }));
  } catch (e) {
    throw Error(e);
  }
};

export default matchesSlice.reducer;
