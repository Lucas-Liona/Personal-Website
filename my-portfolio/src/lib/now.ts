export type NowEntryMeta = {
  slug: string;
  title: string;
  date?: string;
};

export type NowEntry = NowEntryMeta & {
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
    frontmatter[key] = value;
  }

  return { frontmatter, content };
};

const getSlugFromPath = (path: string) => {
  const parts = path.split('/');
  const file = parts[parts.length - 1] ?? '';
  return file.replace(/\.md$/i, '');
};

const rawNowEntries = import.meta.glob('/src/content/now/*.md', { as: 'raw', eager: true }) as Record<
  string,
  string
>;

export const getAllNowEntries = (): NowEntryMeta[] => {
  const entries = Object.entries(rawNowEntries).map(([path, raw]) => {
    const slug = getSlugFromPath(path);
    const { frontmatter } = parseFrontmatter(raw);

    const title = (frontmatter.title as string | undefined) ?? slug;
    const date = frontmatter.date as string | undefined;

    return { slug, title, date };
  });

  return entries.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
};

export const getLatestNowEntry = (): NowEntry | null => {
  const metas = getAllNowEntries();
  if (metas.length === 0) return null;
  return getNowEntryBySlug(metas[0].slug);
};

export const getNowEntryBySlug = (slug: string): NowEntry | null => {
  const entry = Object.entries(rawNowEntries).find(([path]) => getSlugFromPath(path) === slug);
  if (!entry) return null;

  const [, raw] = entry;
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    slug,
    title: (frontmatter.title as string | undefined) ?? slug,
    date: frontmatter.date as string | undefined,
    content,
  };
};
