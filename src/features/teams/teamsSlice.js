import { createMatch } from '../matches/matchesSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  fetched: false,
};

export const teamsSlice = createSlice({
  name: 'teams',
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
export const { wasFetched, store } = teamsSlice.actions;

export const fetchTeams = () => (dispatch) => {
  dispatch(store(JSON.parse(window.localStorage.getItem('teams')) || []));
  dispatch(wasFetched(true));
};

export const updateTeam = (teamToUpdate) => (dispatch, getState) => {
  try {
    const teams = window.localStorage.getItem('teams');
    const currentTeams = JSON.parse(teams);

    const latestTeams = currentTeams.map((team) => {
      const { team: teamName } = team;

      if (teamName === teamToUpdate) {
        const matches = getState().matches.data;
        const teamStats = Object.keys(matches).reduce(
          (stats, matchKey) => {
            if (matchKey.includes(teamToUpdate.toLowerCase())) {
              if (
                matches[matchKey][0].score !== '' &&
                matches[matchKey][1].score !== ''
              ) {
                for (let i = 0; i < matches[matchKey].length; i++) {
                  if (matches[matchKey][i].team === teamToUpdate) {
                    if (matches[matchKey][i].win) {
                      stats.win += 1;
                      stats.points += 3;
                    }
                    if (matches[matchKey][i].lost) {
                      stats.lost += 1;
                    }
                    if (matches[matchKey][i].draw) {
                      stats.draw += 1;
                      stats.points += 1;
                    }
                  }
                }
                stats.played += 1;
              }
            }
            return stats;
          },
          {
            played: 0,
            win: 0,
            draw: 0,
            lost: 0,
            points: 0,
          },
        );
        return {
          ...team,
          ...teamStats,
        };
      }
      return team;
    });

    window.localStorage.setItem('teams', JSON.stringify(latestTeams));
    dispatch(store(latestTeams));
  } catch (e) {
    throw Error(e);
  }
};

export const addTeam = (team) => (dispatch) => {
  try {
    const teams = window.localStorage.getItem('teams');
    const currentTeams = teams ? JSON.parse(teams) : [];
    const newTeam = {
      team,
      played: 0,
      win: 0,
      draw: 0,
      lost: 0,
      points: 0,
    };
    const latestTeams = [...currentTeams, { ...newTeam }];

    window.localStorage.setItem('teams', JSON.stringify(latestTeams));
    dispatch(store(latestTeams));

    if (currentTeams.length > 0) {
      for (let i = 0; i < currentTeams.length; i++) {
        dispatch(createMatch([currentTeams[i], newTeam]));
      }
    }
  } catch (e) {
    throw Error(e);
  }
};

export default teamsSlice.reducer;
