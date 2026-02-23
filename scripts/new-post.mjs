import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';

const BLOG_DIR = path.resolve('src/content/blog');
const EXCLUDED_FILES = new Set(['2026-01-31-thoughts-on-ai-coding-agents.mdx']);
const IS_DRY_RUN = process.argv.includes('--dry-run');

export function toUtcIsoNoMs(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

export function toUtcDatePrefix(date = new Date()) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

export function slugify(title) {
  return title
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function yamlSingleQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

export function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

export function collectListValues(frontmatter, key) {
  const lines = frontmatter.split(/\r?\n/);
  const values = [];
  let inList = false;

  for (const line of lines) {
    if (new RegExp(`^${key}:\\s*$`).test(line)) {
      inList = true;
      continue;
    }

    if (/^[A-Za-z0-9_]+:\s*/.test(line)) {
      inList = false;
    }

    if (!inList) {
      continue;
    }

    const itemMatch = line.match(/^\s*-\s+(.+?)\s*$/);
    if (!itemMatch) {
      continue;
    }

    const raw = itemMatch[1].trim();
    values.push(raw.replace(/^['"]|['"]$/g, ''));
  }

  return values;
}

export async function getExistingTaxonomy({
  blogDir = BLOG_DIR,
  excludedFiles = EXCLUDED_FILES,
} = {}) {
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const categories = new Set();
  const tags = new Set();

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!/\.(md|mdx)$/i.test(entry.name)) continue;
    if (excludedFiles.has(entry.name)) continue;

    const fullPath = path.join(blogDir, entry.name);
    const content = await fs.readFile(fullPath, 'utf8');
    const frontmatter = extractFrontmatter(content);
    if (!frontmatter) continue;

    for (const category of collectListValues(frontmatter, 'categories')) {
      categories.add(category);
    }
    for (const tag of collectListValues(frontmatter, 'tags')) {
      tags.add(tag);
    }
  }

  return {
    categories: [...categories].sort((a, b) => a.localeCompare(b)),
    tags: [...tags].sort((a, b) => a.localeCompare(b)),
  };
}

function printOptions(label, options) {
  output.write(`\n${label}:\n`);
  options.forEach((option, index) => {
    output.write(`  ${index + 1}. ${option}\n`);
  });
}

export function normalizeTagValue(tag) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function parseMultiSelectOrTyped(inputText, options, { normalizeTyped } = {}) {
  const trimmed = inputText.trim();
  if (!trimmed) return [];

  const parts = trimmed
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return [];

  const values = [];

  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      const index = Number(part);
      if (index < 1 || index > options.length) {
        throw new Error(`Selection "${part}" is out of range (1-${options.length}).`);
      }
      values.push(options[index - 1]);
      continue;
    }

    const typedValue = normalizeTyped ? normalizeTyped(part) : part;
    if (!typedValue) {
      throw new Error(`Selection "${part}" did not produce a usable value.`);
    }
    values.push(typedValue);
  }

  return [...new Set(values)];
}

async function askNonEmpty(rl, prompt) {
  while (true) {
    const answer = (await rl.question(prompt)).trim();
    if (answer) return answer;
    output.write('Please enter a title.\n');
  }
}

async function askYesNo(rl, prompt, defaultValue = false) {
  const suffix = defaultValue ? ' [Y/n]: ' : ' [y/N]: ';

  while (true) {
    const answer = (await rl.question(`${prompt}${suffix}`)).trim().toLowerCase();
    if (!answer) return defaultValue;
    if (answer === 'y' || answer === 'yes') return true;
    if (answer === 'n' || answer === 'no') return false;
    output.write('Please answer y or n.\n');
  }
}

async function askMultiSelect(rl, label, options) {
  if (options.length === 0) {
    output.write(`\nNo existing ${label.toLowerCase()} found.\n`);
    return [];
  }

  printOptions(label, options);

  while (true) {
    const answer = await rl.question(
      `Select ${label.toLowerCase()} by number and/or type new values (comma-separated, blank for none): `,
    );
    try {
      return parseMultiSelectOrTyped(answer, options, {
        normalizeTyped: label === 'Tags' ? normalizeTagValue : undefined,
      });
    } catch (error) {
      output.write(`${error.message}\n`);
    }
  }
}

async function askOptionalText(rl, prompt) {
  return (await rl.question(prompt)).trim();
}

async function askFeaturedImageFields(rl) {
  const include = await askYesNo(rl, 'Include featured image fields?', false);
  if (!include) {
    return null;
  }

  let featuredImage_Url = '';
  while (!featuredImage_Url) {
    featuredImage_Url = await askOptionalText(rl, 'featuredImage_Url (e.g. ./images/example.png): ');
    if (!featuredImage_Url) {
      output.write('Please enter a featured image URL/path.\n');
    }
  }

  let featuredImage_Alt = '';
  while (!featuredImage_Alt) {
    featuredImage_Alt = await askOptionalText(rl, 'featuredImage_Alt: ');
    if (!featuredImage_Alt) {
      output.write('Please enter featured image alt text.\n');
    }
  }

  return { featuredImage_Url, featuredImage_Alt };
}

export function buildFrontmatter({ title, dateIso, categories, tags, featuredImage }) {
  const lines = ['---', `title: ${yamlSingleQuote(title)}`, `date: '${dateIso}'`];

  lines.push(categories.length > 0 ? 'categories:' : 'categories: []');
  if (categories.length > 0) {
    for (const category of categories) {
      lines.push(`  - ${category}`);
    }
  }

  lines.push(tags.length > 0 ? 'tags:' : 'tags: []');
  if (tags.length > 0) {
    for (const tag of tags) {
      lines.push(`  - ${tag}`);
    }
  }

  if (featuredImage) {
    lines.push(`featuredImage_Url: ${featuredImage.featuredImage_Url}`);
    lines.push(`featuredImage_Alt: ${yamlSingleQuote(featuredImage.featuredImage_Alt)}`);
  }

  lines.push('---', '', 'Write your post here.', '');
  return lines.join('\n');
}

export async function resolveUniqueFilePath(baseName) {
  let attempt = 0;

  while (true) {
    const candidateName = attempt === 0 ? `${baseName}.mdx` : `${baseName}-${attempt + 1}.mdx`;
    const candidatePath = path.join(BLOG_DIR, candidateName);

    try {
      await fs.access(candidatePath);
      attempt += 1;
    } catch {
      return { fileName: candidateName, filePath: candidatePath };
    }
  }
}

export async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    const { categories: existingCategories, tags: existingTags } = await getExistingTaxonomy();
    const title = await askNonEmpty(rl, 'Post title: ');

    const now = new Date();
    const dateIso = toUtcIsoNoMs(now);
    output.write(`Using GMT/UTC date: ${dateIso}\n`);

    const categories = await askMultiSelect(rl, 'Categories', existingCategories);
    const tags = (await askMultiSelect(rl, 'Tags', existingTags)).sort((a, b) => a.localeCompare(b));
    const featuredImage = await askFeaturedImageFields(rl);

    const slug = slugify(title) || 'untitled';
    const datePrefix = toUtcDatePrefix(now);
    const { fileName, filePath } = await resolveUniqueFilePath(`${datePrefix}-${slug}`);
    const content = buildFrontmatter({ title, dateIso, categories, tags, featuredImage });

    if (IS_DRY_RUN) {
      output.write(`\n[Dry run] Would create ${path.relative(process.cwd(), filePath)}\n`);
      output.write(`Filename: ${fileName}\n`);
      output.write('\n--- Preview ---\n');
      output.write(`${content}`);
      return;
    }

    await fs.mkdir(BLOG_DIR, { recursive: true });
    await fs.writeFile(filePath, content, { flag: 'wx' });

    output.write(`\nCreated ${path.relative(process.cwd(), filePath)}\n`);
    output.write(`Filename: ${fileName}\n`);
  } finally {
    rl.close();
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
