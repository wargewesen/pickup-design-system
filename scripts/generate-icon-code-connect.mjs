// Generates one Code Connect template per Heroicon component in the Pickup Figma file.
// Input:  figma/heroicons-manifest.json  ([{ nodeId, set, name }], exported from the Figma file)
// Output: figma/icons/<set>/<name>.<nodeId>.figma.ts
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FILE_URL = 'https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup';

const SETS = {
  outline: '@heroicons/react/24/outline',
  solid: '@heroicons/react/24/solid',
  mini: '@heroicons/react/20/solid',
  micro: '@heroicons/react/16/solid',
};

// "squares-2x2" -> "Squares2X2Icon", "square-3-stack-3d" -> "Square3Stack3DIcon" (digit-led segments uppercase their letters)
const pascal = (name) =>
  name
    .split('-')
    .map((p) => (/^\d/.test(p) ? p.toUpperCase() : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('') + 'Icon';

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'figma/heroicons-manifest.json'), 'utf8'));
const outDir = path.join(root, 'figma/icons');
fs.rmSync(outDir, { recursive: true, force: true });

const missing = [];
let written = 0;
for (const { nodeId, set, name } of manifest) {
  const pkg = SETS[set];
  const component = pascal(name);
  const exports = require(pkg);
  if (!(component in exports)) {
    missing.push(`${set}/${name} -> ${pkg}#${component}`);
    continue;
  }
  const dir = path.join(outDir, set);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${name}.${nodeId.replace(':', '-')}.figma.ts`);
  fs.writeFileSync(
    file,
    `// url=${FILE_URL}?node-id=${nodeId.replace(':', '-')}
// source=https://github.com/tailwindlabs/heroicons
// component=${component}
import figma from 'figma'

export default {
  example: figma.code\`<${component} />\`,
  imports: ['import { ${component} } from "${pkg}"'],
  id: 'heroicons-${set}-${name}',
  metadata: { nestable: true },
}
`,
  );
  written++;
}

console.log(`Wrote ${written} icon templates to figma/icons`);
if (missing.length) {
  console.warn(`No @heroicons/react export for ${missing.length} icons:\n  ${missing.join('\n  ')}`);
}
