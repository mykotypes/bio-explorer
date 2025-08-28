import { Post } from "@/interfaces/post";
import type { Solution, Category } from "@/interfaces/solution";
import data from '@/data/solutions.json';
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Simulate latency for realism
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface Query {
  q?: string;
  categories?: Category[];
  tags?: string[];
}

export async function fetchSolutions(query: Query = {}): Promise<Solution[]> {
  await sleep(150);
  const { q, categories, tags } = query;

  let list: Solution[] = [...(data as Solution[])];

  if (categories && categories.length) {
    list = list.filter((s) => categories.includes(s.category));
  }

  if (tags && tags.length) {
    list = list.filter((s) => s.tags?.some((t) => tags.includes(t)));
  }

  if (q && q.trim()) {
    const needle = q.toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(needle) ||
        s.description.toLowerCase().includes(needle) ||
        s.tags?.some((t) => t.toLowerCase().includes(needle))
    );
  }

  return list;
}

export async function fetchSolutionById(id: string): Promise<Solution | null> {
  await sleep(120);
  const list = data as Solution[];
  return list.find((s) => s.id === id) ?? null;
}