import Ajv2020 from 'ajv/dist/2020.js';
import { loadContractDocument } from '../scripts/load-contract-document.mjs';

const document = await loadContractDocument();
const definitions = JSON.parse(
  JSON.stringify(document.components.schemas).replaceAll(
    '#/components/schemas/',
    '#/$defs/'
  )
);
const validator = new Ajv2020({ allErrors: true });

for (const keyword of [
  'x-typescript-constant',
  'x-typescript-type',
  'x-typescript-generic-array',
  'x-typescript-key-type',
]) {
  validator.addKeyword(keyword);
}

const dateTimePattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
validator.addFormat(
  'date-time',
  (value) => dateTimePattern.test(value) && !Number.isNaN(Date.parse(value))
);

export function createSchemaValidator(name) {
  return validator.compile({
    $defs: definitions,
    $ref: `#/$defs/${name}`,
  });
}
