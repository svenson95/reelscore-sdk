# reelscore-sdk

OpenAPI contracts, generated TypeScript models, shared TypeScript helpers and
constants. This first migration is consumed by `reelscore` as `reelscore-sdk`.
`reelscore-controller` and `reelscore-ios-app` are future consumers.

## Structure

- `openapi/fixtures.openapi.json`: authoritative OpenAPI 3.1 fixture contracts,
  including the team, league, status and event definitions required by fixtures.
- `src/generated/`: generated TypeScript contracts, named model aliases and
  prediction constants. Commit these files; edit the OpenAPI source instead.
- `src/models/`: public model entry point.
- `src/shared/constants/`: hand-written competition constants.
- `src/shared/helpers/`: TypeScript date logic, tested in Berlin time.
- `scripts/`: reproducible model generation and ESM/CommonJS builds.
- `tests/`: payload compatibility, date behavior and package entry-point tests.

The pre-existing `openai/examples/` placeholders are preserved. They are not used
by generation. The schema directory for this project is `openapi/`.

## Development

```sh
npm ci
npm run generate
npm run check:generated
npm run lint
npm test
npm pack
```

`npm test` builds first. `npm pack` checks generated files, lints, builds and tests
before creating a tarball. The package is private during the local pilot; no
registry publishing is configured. Generated JavaScript and declarations go to
`dist/`; consumers receive both ESM and CommonJS entry points.

```ts
import type { ExtendedFixtureDTO, GetFixtureDTO } from 'reelscore-sdk/models';
import { CompetitionCode } from 'reelscore-sdk/constants';
import { formatFixtureTime } from 'reelscore-sdk/helpers';
```

## First migration and compatibility

The schema preserves the existing reelscore fixture contract, including:

- numeric or string fixture IDs;
- required, nullable scores;
- optional `prediction`, `evaluations` and `league.standings` fields;
- the existing `qoute` spelling and prediction enum values;
- Unix timestamps in seconds;
- open string status codes, matching the existing `string[]` status declarations.

Only fixture-related supporting types move with this contract. Other models and
application-specific state remain in their owning repositories. The existing
reelscore model barrels re-export the generated types during migration.

Controller differences found during comparison: `FixtureLeague.standings` is
required there; its event model has non-null extra time and assists, no
`EventTeam.goals`, and a different detail union. The SDK currently follows
reelscore. The controller needs a separate reviewed migration and validation of
its persisted event data; it has not been switched to this package.

## Swift models

The OpenAPI file is language-independent and is included in the npm tarball
(`reelscore-sdk/openapi/fixtures`). A future pinned Swift generator can consume
this same file directly from a versioned SDK checkout or extracted artifact.
The iOS app does not run or import the npm package itself.

Generate Swift data models from this source and verify decoding against shared
JSON examples. Optional versus nullable values, mixed string/number IDs and Unix
seconds need explicit compatibility checks. TypeScript helpers are executable
JavaScript and do not become Swift implementations through model generation.
Swift generation and integration are intentionally a separate next step.
