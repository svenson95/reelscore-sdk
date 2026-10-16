import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readPersistedModel } from '../scripts/read-persisted-model.mjs';

test('reads persisted models created with createMongooseModel', () => {
  const source = `
    import type { RapidEventsDTO } from '@reelscore-sdk/models';
    import { createMongooseModel } from '../mongodb.helper';

    export const FixtureEvents = createMongooseModel<RapidEventsDTO>(
      'fixture-events',
      {}
    );
  `;

  assert.deepEqual(readPersistedModel(source, 'fixture-events.model.ts'), {
    collectionName: 'fixture-events',
    modelName: 'RapidEventsDTO',
  });
});

test('continues to read models created with mongoose.model', () => {
  const source = `
    import type { TeamDTO } from '@reelscore-sdk/models';

    export const Team = mongoose.model<TeamDTO>('teams', schema);
  `;

  assert.deepEqual(readPersistedModel(source, 'team.model.ts'), {
    collectionName: 'teams',
    modelName: 'TeamDTO',
  });
});
