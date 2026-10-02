import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [apiRepositoryPath] = process.argv.slice(2);

if (!apiRepositoryPath) {
  throw new Error(
    'Usage: node scripts/generate-model-graph.mjs <reelscore-repository>'
  );
}

const databaseDirectory = path.join(
  path.resolve(apiRepositoryPath),
  'apps/api/src/database'
);
const readmePath = fileURLToPath(new URL('../README.md', import.meta.url));
const startMarker = '<!-- model-graph:start -->';
const endMarker = '<!-- model-graph:end -->';

function findModelFiles(directoryPath) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  const nestedFiles = entries.flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      return findModelFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith('.model.ts')
      ? [entryPath]
      : [];
  });

  return nestedFiles;
}

function readPersistedModel(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sdkImport = source.match(
    /import\s+type\s*{\s*([^}]+)\s*}\s*from\s*['"]@reelscore-sdk\/models['"]/s
  );
  const collection = source.match(
    /mongoose\.model(?:<[^>]+>)?\s*\(\s*['"]([^'"]+)['"]/s
  );

  if (!sdkImport || !collection) {
    throw new Error(
      `Could not read collection and SDK model from ${filePath}.`
    );
  }

  const modelName = sdkImport[1].split(',')[0].trim();

  if (!/^[A-Za-z_$][\w$]*$/.test(modelName)) {
    throw new Error(`Expected one named SDK model import in ${filePath}.`);
  }

  return {
    collectionName: collection[1],
    modelName,
  };
}

function createNodeId(prefix, label) {
  return `${prefix}_${label.replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

const modelFiles = findModelFiles(databaseDirectory).sort();
const persistedModels = modelFiles
  .map(readPersistedModel)
  .sort((first, second) =>
    first.collectionName.localeCompare(second.collectionName)
  );

if (persistedModels.length === 0) {
  throw new Error(`No Mongoose model files found under ${databaseDirectory}.`);
}

const diagramLines = [
  '```mermaid',
  'flowchart LR',
  '  subgraph database["MongoDB collections"]',
];

for (const model of persistedModels) {
  const collectionId = createNodeId('collection', model.collectionName);
  diagramLines.push(`    ${collectionId}[("${model.collectionName}")]`);
}

diagramLines.push('  end', '  subgraph sdk["SDK models"]');

for (const modelName of [
  ...new Set(persistedModels.map((model) => model.modelName)),
].sort()) {
  const modelId = createNodeId('model', modelName);
  diagramLines.push(`    ${modelId}["${modelName}"]`);
}

diagramLines.push('  end');

for (const model of persistedModels) {
  const collectionId = createNodeId('collection', model.collectionName);
  const modelId = createNodeId('model', model.modelName);
  diagramLines.push(`  ${collectionId} --> ${modelId}`);
}

diagramLines.push('```');

const readme = fs.readFileSync(readmePath, 'utf8');
const markerStartIndex = readme.indexOf(startMarker);
const markerEndIndex = readme.indexOf(endMarker);

if (
  markerStartIndex === -1 ||
  markerEndIndex === -1 ||
  markerEndIndex < markerStartIndex ||
  readme.indexOf(startMarker, markerStartIndex + startMarker.length) !== -1 ||
  readme.indexOf(endMarker, markerEndIndex + endMarker.length) !== -1
) {
  throw new Error(
    'README must contain exactly one valid model graph marker pair.'
  );
}

const generatedBlock = `${startMarker}\n\n${diagramLines.join(
  '\n'
)}\n\n${endMarker}`;
const blockEndIndex = markerEndIndex + endMarker.length;
const updatedReadme = `${readme.slice(
  0,
  markerStartIndex
)}${generatedBlock}${readme.slice(blockEndIndex)}`;

if (updatedReadme !== readme) {
  fs.writeFileSync(readmePath, updatedReadme);
}
