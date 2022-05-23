import { addTeam } from '../../features/teams/teamsSlice';
import { useDispatch } from 'react-redux';
import styles from './TeamsTable.module.scss';

export default function TeamsTable({ addNewTeamEnabled = true, teams }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const { team } = Object.fromEntries(data.entries());

    e.target.reset();

    dispatch(addTeam(team));
  };

  const renderTeams = () => {
    const sortedTeams = [...teams].sort((a, b) =>
      a.points < b.points ? 1 : -1,
    );

    return sortedTeams.map(({ team, played, win, draw, lost, points }, i) => (
      <tr key={window.btoa(`${i}_${team}`)}>
        <td>{i + 1}</td>
        <td>{team}</td>
        <td>{played}</td>
        <td>{win}</td>
        <td>{draw}</td>
        <td>{lost}</td>
        <td>{points}</td>
      </tr>
    ));
  };

  return (
    <div className={styles['wrapper']}>
      {addNewTeamEnabled && (
        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="team"
            className="form-control"
            placeholder="New team"
          />

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      )}
      <div className="group-table-wrapper">
        <table className="table mt-5" data-testid="teams-table">
          <thead>
            <tr>
              <th scope="col">Place</th>
              <th scope="col">Team</th>
              <th scope="col">Played</th>
              <th scope="col">Win</th>
              <th scope="col">Draw</th>
              <th scope="col">Lost</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>{renderTeams()}</tbody>
        </table>
      </div>
    </div>
  );
}
