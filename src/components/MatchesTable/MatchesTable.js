import { updateMatch } from '../../features/matches/matchesSlice';
import { updateTeam } from '../../features/teams/teamsSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './MatchesTable.module.scss';

export default function MatchesTable({ matches }) {
  const dispatch = useDispatch();

  const getTeamName = (matchKey, team) => {
    return document.getElementsByName(`${matchKey}.${team}.score`)[0].dataset
      .team;
  };

  const getTeamScore = (matchKey, team) => {
    return document.getElementsByName(`${matchKey}.${team}.score`)[0].value;
  };

  const getTeamMatchPoints = (team1Score, team2Score) => {
    if (team1Score === team2Score) {
      return 1;
    }
    return team1Score > team2Score ? 3 : 0;
  };

  const handleMatchScoreInputChange = useCallback(
    (matchKey) => {
      const teams = matchKey.split('_');
      if (
        getTeamScore(matchKey, teams[0]) !== '' &&
        getTeamScore(matchKey, teams[1]) !== ''
      ) {
        const team1Score = getTeamScore(matchKey, teams[0]);
        const team2Score = getTeamScore(matchKey, teams[1]);
        const team1Name = getTeamName(matchKey, teams[0]);
        const team2Name = getTeamName(matchKey, teams[1]);
        const team1Points = getTeamMatchPoints(team1Score, team2Score);
        const team2Points = getTeamMatchPoints(team2Score, team1Score);

        dispatch(
          updateMatch({
            [matchKey]: [
              {
                team: team1Name,
                score: team1Score,
                win: team1Points === 3,
                lost: team1Points === 0,
                draw: team1Points === 1,
              },
              {
                team: team2Name,
                score: team2Score,
                win: team2Points === 3,
                lost: team2Points === 0,
                draw: team2Points === 1,
              },
            ],
          }),
        );

        dispatch(updateTeam(team1Name));

        dispatch(updateTeam(team2Name));
      }
    },
    [dispatch],
  );

  const renderMatches = useCallback(() => {
    return Object.keys(matches).map((key) => {
      const team1Score = matches[key][0].score;
      const team2Score = matches[key][1].score;
      const team1 = matches[key][0].team.toLowerCase();
      const team2 = matches[key][1].team.toLowerCase();

      return (
        <tr key={key}>
          <td>{matches[key][0].team}</td>
          <td className="score-form-field-column">
            <input
              data-team={matches[key][0].team}
              className="form-control score-form-field"
              type="number"
              name={`${key}.${team1}.score`}
              defaultValue={team1Score}
              onChange={() => handleMatchScoreInputChange(key)}
            />
          </td>
          <td className="separator-column">:</td>
          <td className="score-form-field-column">
            <input
              data-team={matches[key][1].team}
              className="form-control score-form-field"
              type="number"
              name={`${key}.${team2}.score`}
              defaultValue={team2Score}
              onChange={() => handleMatchScoreInputChange(key)}
            />
          </td>
          <td>{matches[key][1].team}</td>
        </tr>
      );
    });
  }, [matches, handleMatchScoreInputChange]);

  return (
    <div className={styles['wrapper']}>
      <h3 className="display-9 mt-5 text-center">Matches</h3>
      <table className="table mt-4 mb-5">
        <tbody>{renderMatches()}</tbody>
      </table>
    </div>
  );
}
