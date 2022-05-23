import { fetchMatches } from './features/matches/matchesSlice';
import { fetchTeams } from './features/teams/teamsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MatchesTable from './components/MatchesTable/MatchesTable';
import styles from './App.module.scss';
import TeamsTable from './components/TeamsTable/TeamsTable';

function App() {
  const { data: teams, fetched: wasTeamsFetched } = useSelector(
    (state) => state.teams,
  );
  const { data: matches, fetched: wasMatchesFetched } = useSelector(
    (state) => state.matches,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wasTeamsFetched) {
      dispatch(fetchTeams());
    }
    if (!wasMatchesFetched) {
      dispatch(fetchMatches());
    }
  }, [dispatch, wasTeamsFetched, wasMatchesFetched]);

  const isTeamsTableVisible = teams.length > 0;
  const isMatchesTableVisible = Object.keys(matches).length > 0;

  return (
    <div className={styles['wrapper']}>
      {isTeamsTableVisible && <TeamsTable teams={teams} />}
      {isMatchesTableVisible && <MatchesTable matches={matches} />}
    </div>
  );
}

export default App;
