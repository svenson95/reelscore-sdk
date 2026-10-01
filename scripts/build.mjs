import { mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const compiler = fileURLToPath(
  new URL('../node_modules/typescript/bin/tsc', import.meta.url)
);

await rm(new URL('../dist/', import.meta.url), {
  recursive: true,
  force: true,
});

for (const configuration of ['tsconfig.esm.json', 'tsconfig.cjs.json']) {
  execFileSync(process.execPath, [compiler, '-p', configuration], {
    cwd: root,
    stdio: 'inherit',
  });
}

await mkdir(new URL('../dist/cjs/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../dist/cjs/package.json', import.meta.url),
  '{"type":"commonjs"}\n'
);
