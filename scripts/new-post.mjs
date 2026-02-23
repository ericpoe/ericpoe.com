import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';

const BLOG_DIR = path.resolve('src/content/blog');
const EXCLUDED_FILES = new Set(['2026-01-31-thoughts-on-ai-coding-agents.mdx']);
const IS_DRY_RUN = process.argv.includes('--dry-run');

// Format a Date as UTC ISO-8601 without milliseconds for frontmatter consistency
export function toUtcIsoNoMs(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

// Left-pad numeric date parts used in filenames
function pad2(value) {
  return String(value).padStart(2, '0');
}

// Build the YYYY-MM-DD prefix for generated filenames using UTC date parts
export function toUtcDatePrefix(date = new Date()) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

// Convert a title into a filesystem-safe kebab-case slug
export function slugify(title) {
  return title
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

// Quote YAML string values with single quotes and escape embedded apostrophes
export function yamlSingleQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

// Extract the top YAML frontmatter block from a markdown or MDX file
export function extractFrontmatter(content) {
  // Read only the first YAML frontmatter block at the top of the file
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

// Read a YAML list field like categories/tags from a frontmatter string
export function collectListValues(frontmatter, key) {
  const lines = frontmatter.split(/\r?\n/);
  const values = [];
  let inList = false;

  for (const line of lines) {
    // We only collect list items while inside the requested frontmatter key
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
// Scan existing blog posts to build sorted unique category and tag option lists
export async function getExistingTaxonomy({
  blogDir = BLOG_DIR,
  excludedFiles = EXCLUDED_FILES,
} = {}) {
  // Build prompt options from existing posts so the wizard stays in sync with current taxonomy
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

// Print numbered options for interactive selection prompts
function printOptions(label, options) {
  output.write(`\n${label}:\n`);
  options.forEach((option, index) => {
    output.write(`  ${index + 1}. ${option}\n`);
  });
}

// Normalize typed tags so they satisfy the repo kebab-case tag convention
export function normalizeTagValue(tag) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

// Parse comma-separated selections that may include indexes, typed values, or both
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
    // Numeric entries reference existing options; anything else is treated as a new typed value
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

// Prompt until a non-empty answer is provided
async function askNonEmpty(rl, prompt) {
  while (true) {
    const answer = (await rl.question(prompt)).trim();
    if (answer) return answer;
    output.write('Please enter a title.\n');
  }
}

// Prompt for a yes/no answer with a default value
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

// Prompt for one or more selections from existing values, with optional typed additions
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

// Read a single optional text value from the prompt
async function askOptionalText(rl, prompt) {
  return (await rl.question(prompt)).trim();
}

// Optionally collect featured image frontmatter fields from the user
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

// Build the MDX starter file with frontmatter in repo-required key order
export function buildFrontmatter({ title, dateIso, categories, tags, featuredImage }) {
  // Keep frontmatter key order aligned with repo conventions and the content schema
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

// Find a non-conflicting output filename by appending a numeric suffix when needed
export async function resolveUniqueFilePath(baseName) {
  let attempt = 0;

  while (true) {
    // Avoid overwriting an existing post by suffixing -2, -3, etc
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

// Run the interactive CLI flow and write or preview the generated post file
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
  // Allow importing helpers in tests without starting the interactive CLI
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
