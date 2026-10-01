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

const validateFixture = createSchemaValidator('ExtendedFixtureDTO');
const validateResponse = createSchemaValidator('GetFixtureDTO');

test('the existing match payload permits missing predictions and nullable scores', () => {
  assert.equal(
    validateFixture(fixture),
    true,
    JSON.stringify(validateFixture.errors)
  );
  assert.equal(fixture.score.extratime.home, null);
  assert.equal(Object.hasOwn(fixture, 'prediction'), false);
  assert.equal(Object.hasOwn(fixture.league, 'standings'), false);
});

test('fixture IDs retain both number and string representations', () => {
  const candidate = structuredClone(fixture);
  candidate.fixture.id = String(candidate.fixture.id);

  assert.equal(
    validateFixture(candidate),
    true,
    JSON.stringify(validateFixture.errors)
  );
});

test('missing score fields fail instead of becoming optional or defaulting to zero', () => {
  const candidate = structuredClone(fixture);
  delete candidate.goals.home;

  assert.equal(validateFixture(candidate), false);
  assert.ok(
    validateFixture.errors.some(
      (error) =>
        error.keyword === 'required' && error.params.missingProperty === 'home'
    )
  );
});

test('prediction contracts preserve qoute, allowed probabilities and nullable correctness', () => {
  const candidate = structuredClone(fixture);
  candidate.prediction = {
    bet: 'Home win',
    qoute: 1.8,
    probability: 0.85,
    correct: null,
  };

  assert.equal(
    validateFixture(candidate),
    true,
    JSON.stringify(validateFixture.errors)
  );

  candidate.prediction.probability = 0.42;
  assert.equal(validateFixture(candidate), false);

  candidate.prediction.probability = 0.85;
  candidate.prediction.quote = candidate.prediction.qoute;
  delete candidate.prediction.qoute;
  assert.equal(validateFixture(candidate), false);
});

test('optional prediction may be absent, but its value cannot be null', () => {
  const candidate = structuredClone(fixture);
  candidate.prediction = null;

  assert.equal(validateFixture(candidate), false);
});

test('match responses preserve event goals and nullable assist and extra time', () => {
  const response = {
    data: fixture,
    highlights: [
      {
        time: { elapsed: 90, extra: null },
        team: { id: 85, name: 'Paris Saint Germain', logo: '', goals: 1 },
        player: { id: 1, name: 'Player' },
        assist: { id: null, name: null },
        type: 'Goal',
        detail: 'Normal Goal',
        comments: '',
      },
    ],
  };

  assert.equal(
    validateResponse(response),
    true,
    JSON.stringify(validateResponse.errors)
  );

  delete response.highlights[0].team.goals;
  assert.equal(validateResponse(response), false);
});
