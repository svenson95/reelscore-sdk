import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createSchemaValidator } from './schema.testing.mjs';

const team = { id: 1, name: 'Home', logo: '' };

test('lineups preserve wrapped players and nullable provider values', () => {
  const validate = createSchemaValidator('RapidLineupsDTO');
  const lineup = {
    parameters: { fixture: '123' },
    response: [
      {
        team: { ...team, colors: null },
        formation: '4-3-3',
        startXI: [
          {
            player: {
              id: 10,
              name: 'Player',
              number: 9,
              pos: 'F',
              grid: '4:1',
            },
          },
        ],
        substitutes: [
          {
            player: {
              id: 11,
              name: 'Substitute',
              number: 12,
              pos: 'M',
              grid: null,
            },
          },
        ],
        coach: { id: null, name: null, photo: null },
      },
    ],
  };

  assert.equal(validate(lineup), true, JSON.stringify(validate.errors));
  delete lineup.response[0].startXI[0].player;
  assert.equal(validate(lineup), false);
});

test('player statistics preserve missing values rather than converting them to zero', () => {
  const validate = createSchemaValidator('RapidPlayersStatisticsDTO');
  const statistics = {
    games: {
      minutes: null,
      number: 9,
      position: 'F',
      rating: null,
      captain: false,
      substitute: false,
    },
    offsides: null,
    shots: { total: null, on: null },
    goals: { total: null, conceded: null, assists: null, saves: null },
    passes: { total: null, key: null, accuracy: null },
    tackles: { total: null, blocks: null, interceptions: null },
    duels: { total: null, won: null },
    dribbles: { attempts: null, success: null, past: null },
    fouls: { drawn: null, committed: null },
    cards: { yellow: null, red: null },
    penalty: {
      won: null,
      commited: null,
      scored: null,
      missed: null,
      saved: null,
    },
  };
  const response = {
    parameters: { fixture: 123 },
    response: [
      {
        team,
        players: [
          {
            player: { id: 10, name: 'Player', photo: null },
            statistics: [statistics],
          },
        ],
      },
    ],
  };

  assert.equal(validate(response), true, JSON.stringify(validate.errors));
  delete statistics.shots;
  assert.equal(validate(response), false);
});
