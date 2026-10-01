import { mkdir, readFile, writeFile } from 'node:fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';
import prettier from 'prettier';
import ts from 'typescript';
import { loadContractDocument } from './load-contract-document.mjs';

const document = await loadContractDocument();
const schemas = document.components.schemas;
const syntaxTree = await openapiTS(document, {
  transform(schema) {
    // Preserve existing TypeScript Date contracts; JSON and Swift use date-time strings.
    if (schema['x-typescript-key-type'] === 'number') {
      return numericDictionaryType(schema.additionalProperties);
    }

    if (schema['x-typescript-type'] === 'Date') {
      return ts.factory.createTypeReferenceNode('Date');
    }
  },
});
const header =
  '// Generated from openapi/reelscore.openapi.json. Do not edit manually.\n';

const aliases = Object.entries(schemas).map(([name, schema]) => {
  const genericProperty = schema['x-typescript-generic-array'];

  if (genericProperty) {
    // OpenAPI describes the envelope; TypeScript retains the original payload generic.
    return `export type ${name}<T> = Omit<components['schemas']['${name}'], '${genericProperty}'> & { ${genericProperty}: T[] };`;
  }

  return `export type ${name} = components['schemas']['${name}'];`;
});
const constants = Object.values(schemas)
  .filter((schema) => schema['x-typescript-constant'])
  .map(
    (schema) =>
      `export const ${schema['x-typescript-constant']} = ${JSON.stringify(
        schema.enum
      )} as const;`
  );

const outputs = {
  'src/generated/contracts.ts': header + astToString(syntaxTree),
  'src/generated/models.ts':
    header +
    "import type { components } from './contracts.js';\n\n" +
    aliases.join('\n') +
    '\n',
  'src/generated/prediction.constants.ts': header + constants.join('\n') + '\n',
  'openapi/reelscore.bundled.openapi.json': JSON.stringify(document),
};

const checkOnly = process.argv.includes('--check');

for (const [filename, source] of Object.entries(outputs)) {
  const target = new URL(`../${filename}`, import.meta.url);
  const formatted = prettier.format(source, {
    parser: filename.endsWith('.json') ? 'json' : 'typescript',
    singleQuote: true,
  });

  if (checkOnly) {
    const existing = await readFile(target, 'utf8');

    if (existing !== formatted) {
      throw new Error(`${filename} is out of date. Run npm run generate.`);
    }
  } else {
    await mkdir(new URL('./', target), { recursive: true });
    await writeFile(target, formatted);
  }
}

function numericDictionaryType(valueSchema) {
  let valueType;

  if (valueSchema.$ref) {
    const name = valueSchema.$ref.split('/').at(-1);
    const schemasType = ts.factory.createIndexedAccessTypeNode(
      ts.factory.createTypeReferenceNode('components'),
      ts.factory.createLiteralTypeNode(
        ts.factory.createStringLiteral('schemas')
      )
    );
    valueType = ts.factory.createIndexedAccessTypeNode(
      schemasType,
      ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(name))
    );
  } else if (valueSchema.type === 'string') {
    valueType = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  } else {
    throw new Error('Unsupported numeric dictionary value');
  }

  const key = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'key',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
  );
  const index = ts.factory.createIndexSignature(undefined, [key], valueType);

  return ts.factory.createTypeLiteralNode([index]);
}
