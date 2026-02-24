import fs from 'node:fs/promises';
import path from 'node:path';
import { headerSets } from './netlify-headers.config.mjs';

// Convert the readable config shape into Netlify's _headers file format
function toHeadersFile(rules) {
  return `${rules
    .map(({ path: routePath, headers }) => {
      const lines = [routePath];
      for (const [name, value] of Object.entries(headers)) {
        lines.push(`  ${name}: ${value}`);
      }
      return lines.join('\n');
    })
    .join('\n\n')}\n`;
}

async function main() {
  const target = process.argv[2] || 'production';
  const outputPath = process.argv[3] || path.join('dist', '_headers');

  const rules = headerSets[target];
  if (!rules) {
    const available = Object.keys(headerSets).join(', ');
    throw new Error(`Unknown header set "${target}". Available: ${available}`);
  }

  // Netlify reads dist/_headers after the build, so ensure the directory exists and write
  // the generated file as the final build step
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, toHeadersFile(rules), 'utf8');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
