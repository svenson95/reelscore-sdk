import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createSchemaValidator } from './schema.testing.mjs';

const fixture = JSON.parse(
  await readFile(
    new URL('./fixtures/extended-fixture.json', import.meta.url),
    'utf8'
  )
);
const team = { id: 85, name: 'Home', logo: '' };
const teamDetails = {
  ...team,
  code: 'HOM',
  country: 'Germany',
  founded: 1900,
  national: false,
};
const coach = {
  id: 1,
  name: 'Coach',
  firstname: 'First',
  lastname: 'Last',
  age: 50,
  birth: { date: '1976-01-01', place: 'Berlin', country: 'Germany' },
  nationality: 'German',
  height: '',
  weight: '',
  photo: '',
  team,
  career: [{ team, start: '2025-01-01', end: '2026-01-01' }],
};

function assertValid(validate, value) {
  assert.equal(validate(value), true, JSON.stringify(validate.errors));
}

test('team documents retain required fields and serialized Date values', () => {
  const validate = createSchemaValidator('TeamDTO');
  const candidate = {
    _id: 'team-id',
    team: { ...teamDetails },
    venue: {
      id: 1,
      name: 'Stadium',
      address: '',
      city: 'Berlin',
      capacity: 1000,
      surface: 'grass',
      image: '',
    },
    createdAt: '2026-10-01T12:00:00.000Z',
    updatedAt: '2026-10-01T12:00:00.000Z',
  };

  assertValid(validate, candidate);
  delete candidate.team.founded;

  assert.equal(validate(candidate), false);
});

test('competition schemas preserve coverage fields and league variants', () => {
  const validate = createSchemaValidator('CompetitionDTO');
  const candidate = {
    _id: 'competition-id',
    league: { id: 78, name: 'Bundesliga', type: 'League', logo: '' },
    country: { name: 'Germany', code: 'DE', flag: '' },
    seasons: [
      {
        year: 2026,
        start: '2026-07-01',
        end: '2027-06-30',
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: true,
            statistics_players: true,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: true,
          predictions: true,
          odds: true,
        },
      },
    ],
  };

  assertValid(validate, candidate);
  candidate.league.type = 'Unsupported';

  assert.equal(validate(candidate), false);
});

test('standings permit nullable form and description while keeping them required', () => {
  const validate = createSchemaValidator('StandingRanks');
  const played = {
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
  };
  const candidate = {
    rank: 1,
    team,
    points: 0,
    goalsDiff: 0,
    group: '',
    form: null,
    status: '',
    description: null,
    all: played,
    home: played,
    away: played,
    update: '2026-10-01',
  };

  assertValid(validate, candidate);
  delete candidate.form;

  assert.equal(validate(candidate), false);
});

test('live fixture batches preserve typed operation documents and timestamp serialization', () => {
  const validate = createSchemaValidator('LiveFixturesUpdateDTO');
  const operation = {
    status: 'success',
    time: '2026-10-01T12:00:00.000Z',
    documents: [fixture],
    errors: null,
  };
  const candidate = { updates: [{ fixtureId: fixture.fixture.id, operation }] };

  assertValid(validate, candidate);
  operation.documents = [{ fixture: fixture.fixture }];

  assert.equal(validate(candidate), false);
});

test('search result tags select the matching payload shape', () => {
  const validate = createSchemaValidator('SearchResult');
  const candidate = { id: '85', type: 'teams', data: { team: teamDetails } };

  assertValid(validate, candidate);
  candidate.type = 'competitions';

  assert.equal(validate(candidate), false);
});

test('the existing coach career tuple accepts exactly one entry', () => {
  const validate = createSchemaValidator('TeamCoachDTO');

  assertValid(validate, coach);
  assert.equal(validate({ ...coach, career: [] }), false);
  assert.equal(
    validate({ ...coach, career: [...coach.career, ...coach.career] }),
    false
  );
});
