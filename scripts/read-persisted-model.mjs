export function readPersistedModel(source, filePath = '<unknown>') {
  const sdkImport = source.match(
    /import\s+type\s*{\s*([^}]+)\s*}\s*from\s*['"]@reelscore-sdk\/models['"]/s
  );
  const collection = source.match(
    /(?:mongoose\.model|createMongooseModel)(?:<[^>]+>)?\s*\(\s*['"]([^'"]+)['"]/s
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
