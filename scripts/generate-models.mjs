import { mkdir, readFile, writeFile } from 'node:fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';
import prettier from 'prettier';

const schemaUrl = new URL('../openapi/fixtures.openapi.json', import.meta.url);
const document = JSON.parse(await readFile(schemaUrl, 'utf8'));
const schemas = document.components.schemas;
const syntaxTree = await openapiTS(schemaUrl);
const header =
  '// Generated from openapi/fixtures.openapi.json. Do not edit manually.\n';

const aliases = Object.keys(schemas).map(
  (name) => `export type ${name} = components['schemas']['${name}'];`
);
const constants = Object.values(schemas)
  .filter((schema) => schema['x-typescript-constant'])
  .map(
    (schema) =>
      `export const ${schema['x-typescript-constant']} = ${JSON.stringify(
        schema.enum
      )} as const;`
  );

const outputs = {
  'contracts.ts': header + astToString(syntaxTree),
  'models.ts':
    header +
    "import type { components } from './contracts.js';\n\n" +
    aliases.join('\n') +
    '\n',
  'prediction.constants.ts': header + constants.join('\n') + '\n',
};

const checkOnly = process.argv.includes('--check');

for (const [filename, source] of Object.entries(outputs)) {
  const target = new URL(`../src/generated/${filename}`, import.meta.url);
  const formatted = prettier.format(source, {
    parser: 'typescript',
    singleQuote: true,
  });

  if (checkOnly) {
    const existing = await readFile(target, 'utf8');

    if (existing !== formatted) {
      throw new Error(`${filename} is out of date. Run npm run generate.`);
    }
  } else {
    await mkdir(new URL('../src/generated/', import.meta.url), {
      recursive: true,
    });
    await writeFile(target, formatted);
  }
}
