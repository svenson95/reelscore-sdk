import { readFile } from 'node:fs/promises';

const entryPoint = new URL(
  '../openapi/reelscore.openapi.json',
  import.meta.url
);

/** Resolve the domain files into one document for generation and validation. */
export async function loadContractDocument() {
  const document = JSON.parse(await readFile(entryPoint, 'utf8'));
  const documents = new Map();
  const schemas = {};

  for (const [name, reference] of Object.entries(document.components.schemas)) {
    const [filename, pointer] = reference.$ref.split('#');
    const sourceUrl = new URL(filename, entryPoint);

    if (!documents.has(sourceUrl.href)) {
      documents.set(
        sourceUrl.href,
        JSON.parse(await readFile(sourceUrl, 'utf8'))
      );
    }

    if (pointer !== `/components/schemas/${name}`) {
      throw new Error(`Unexpected schema reference for ${name}`);
    }

    const schema = documents.get(sourceUrl.href).components.schemas[name];

    if (schema === undefined) {
      throw new Error(`Missing schema ${name} in ${filename}`);
    }

    schemas[name] = normalizeReferences(schema, document.components.schemas);
  }

  return { ...document, components: { schemas } };
}

function normalizeReferences(value, registeredSchemas) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeReferences(item, registeredSchemas));
  }

  if (value === null || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      if (key !== '$ref') {
        return [key, normalizeReferences(item, registeredSchemas)];
      }

      const [filename, pointer] = item.split('#');
      const name = pointer?.replace('/components/schemas/', '');
      const expected = registeredSchemas[name]?.$ref;

      if (!expected || !pointer.startsWith('/components/schemas/')) {
        throw new Error(`Unregistered schema reference: ${item}`);
      }

      if (filename && expected !== item) {
        throw new Error(`Schema reference points to the wrong domain: ${item}`);
      }

      return [key, `#/components/schemas/${name}`];
    })
  );
}
