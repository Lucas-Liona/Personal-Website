export type MocMeta = {
  slug: string;
  title: string;
  date?: string;
  tags?: string[];
};

export type MocPage = MocMeta & {
  content: string;
};

type Frontmatter = Record<string, unknown>;

const parseFrontmatter = (raw: string): { frontmatter: Frontmatter; content: string } => {
  if (!raw.startsWith('---')) {
    return { frontmatter: {}, content: raw };
  }

  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    return { frontmatter: {}, content: raw };
  }

  const fmBlock = raw.slice(3, end).trim();
  const content = raw.slice(end + '\n---'.length).trimStart();

  const frontmatter: Frontmatter = {};
  for (const line of fmBlock.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      frontmatter[key] = inner
        ? inner.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
    } else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content };
};

const getSlugFromPath = (path: string) => {
  const parts = path.split('/');
  const file = parts[parts.length - 1] ?? '';
  return file.replace(/\.md$/i, '');
};

const rawMocs = import.meta.glob('/src/content/moc/*.md', { as: 'raw', eager: true }) as Record<
  string,
  string
>;

export const getAllMocs = (): MocMeta[] => {
  const mocs = Object.entries(rawMocs).map(([path, raw]) => {
    const slug = getSlugFromPath(path);
    const { frontmatter } = parseFrontmatter(raw);

    const title = (frontmatter.title as string | undefined) ?? slug;
    const date = frontmatter.date as string | undefined;
    const tags = frontmatter.tags as string[] | undefined;

    return { slug, title, date, tags };
  });

  return mocs.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
};

export const getMocBySlug = (slug: string): MocPage | null => {
  const entry = Object.entries(rawMocs).find(([path]) => getSlugFromPath(path) === slug);
  if (!entry) return null;

  const [, raw] = entry;
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    slug,
    title: (frontmatter.title as string | undefined) ?? slug,
    date: frontmatter.date as string | undefined,
    tags: frontmatter.tags as string[] | undefined,
    content,
  };
};
