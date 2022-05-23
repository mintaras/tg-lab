import React from 'react';
import { mount } from 'enzyme';
import TeamsTable from './TeamsTable';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const MOCK_TEAMS = [
  { place: 1, team: 'Greece', played: 3, win: 0, draw: 1, lost: 2, points: 1 },
  { place: 2, team: 'Germany', played: 3, win: 1, draw: 1, lost: 1, points: 4 },
  { place: 3, team: 'Italy', played: 2, win: 1, draw: 0, lost: 1, points: 3 },
  { team: 'Argentina', played: 2, win: 2, draw: 0, lost: 0, points: 6 },
];

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe('TeamsTable component', () => {
  const initialState = { data: MOCK_TEAMS };
  const mockStore = configureStore();
  const renderTeamsTable = () =>
    mount(
      <ReduxProvider reduxStore={mockStore(initialState)}>
        <TeamsTable teams={MOCK_TEAMS} />
      </ReduxProvider>,
    );

  it('should render correct table grid', () => {
    const teamsTable = renderTeamsTable();

    expect(teamsTable.find('table')).toHaveLength(1);
    expect(teamsTable.find('tbody > tr')).toHaveLength(MOCK_TEAMS.length);
    expect(teamsTable.find('td')).toHaveLength(MOCK_TEAMS.length * 7); // multiple team object properties count by teams count
  });
});
