import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import * as constants from '../dist/esm/shared/constants/index.js';
import * as helpers from '../dist/esm/shared/helpers/index.js';

const require = createRequire(import.meta.url);

for (const format of ['ESM', 'CommonJS']) {
  const values =
    format === 'ESM'
      ? constants
      : require('../dist/cjs/shared/constants/index.js');
  const functions =
    format === 'ESM' ? helpers : require('../dist/cjs/shared/helpers/index.js');

  test(`${format}: competition identity and URL mappings cover every code`, () => {
    const codes = Object.values(values.CompetitionCode);
    assert.deepEqual(
      Object.keys(values.COMPETITION_ID).sort(),
      [...codes].sort()
    );
    assert.deepEqual(
      Object.keys(values.COMPETITION_URL).sort(),
      [...codes].sort()
    );
    assert.equal(values.COMPETITION_URL.GERMANY_BUNDESLIGA, 'bundesliga');
    assert.deepEqual(
      Object.keys(values.COMPETITION_LABEL).sort(),
      [...codes].sort()
    );
    assert.equal(
      values.COMPETITION_LABEL.INTERNATIONAL_WORLD_CUP,
      'Weltmeisterschaft'
    );
  });

  test(`${format}: seasons follow the Berlin cutoff and fixed tournament rules`, () => {
    const competitionId = values.COMPETITION_ID.GERMANY_BUNDESLIGA;
    assert.equal(
      functions.getSeason(competitionId, '2026-06-30T21:59:59Z'),
      2025
    );
    assert.equal(
      functions.getSeason(competitionId, '2026-06-30T22:00:00Z'),
      2026
    );
    assert.equal(
      functions.getSeason(
        values.COMPETITION_ID.INTERNATIONAL_WORLD_CUP,
        '2026-06-01T12:00:00Z'
      ),
      2026
    );
    assert.throws(
      () => functions.getSeason(competitionId, '2022-08-01T12:00:00Z'),
      /Unsupported competition season: 2022/
    );
  });

  test(`${format}: round histories retain earlier definitions until replaced`, () => {
    const earlierRounds = { 1: 'Group Stage' };
    const newerRounds = { 1: 'League Stage' };
    const rounds = functions.buildCompetitionRounds({
      2: { 2023: earlierRounds, 2025: newerRounds },
    });
    assert.deepEqual(rounds[2024][2], earlierRounds);
    assert.deepEqual(rounds[2026][2], newerRounds);
    assert.equal(
      functions.isTwoLeggedRound(
        values.COMPETITION_ID.ENGLAND_LEAGUE_CUP,
        'Semi-finals'
      ),
      true
    );
    assert.equal(
      functions.isTwoLeggedRound(
        values.COMPETITION_ID.ENGLAND_LEAGUE_CUP,
        'Final'
      ),
      false
    );
    assert.equal(values.COMPETITION_ROUNDS[2026][78][1], 'Regular Season - 1');
  });
}
