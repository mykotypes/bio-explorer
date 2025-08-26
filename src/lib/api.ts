import data from '../data/solutions.json';
import type { Solution, Category } from '../types/solution';

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