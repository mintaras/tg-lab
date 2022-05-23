import { configureStore } from '@reduxjs/toolkit';
import matchesSlice from './features/matches/matchesSlice';
import teamsSlice from './features/teams/teamsSlice';

export default configureStore({
  reducer: {
    matches: matchesSlice,
    teams: teamsSlice,
  },
});
