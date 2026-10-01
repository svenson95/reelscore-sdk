import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import {
  CompetitionCode,
  PREDICTION_PROBABILITIES,
  PREDICTION_CORRECT_VALUES,
} from 'reelscore-sdk/constants';
import { formatFixtureTime } from 'reelscore-sdk/helpers';

const require = createRequire(import.meta.url);

test('ES modules and CommonJS expose the same package contract', () => {
  const commonJs = require('reelscore-sdk');
  const constants = require('reelscore-sdk/constants');
  const helpers = require('reelscore-sdk/helpers');
  const timestamp = Date.parse('2026-07-01T18:30:00Z') / 1000;

  assert.deepEqual(constants.CompetitionCode, CompetitionCode);
  assert.equal(
    commonJs.CompetitionCode.GERMANY_BUNDESLIGA,
    'GERMANY_BUNDESLIGA'
  );
  assert.equal(
    helpers.formatFixtureTime(timestamp),
    formatFixtureTime(timestamp)
  );
  assert.deepEqual(PREDICTION_PROBABILITIES, [0.75, 0.8, 0.85, 0.9, 0.95]);
  assert.deepEqual(PREDICTION_CORRECT_VALUES, [null, false, true]);
});
