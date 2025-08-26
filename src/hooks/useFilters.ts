'use client';
import * as React from 'react';
import type { Category } from '../types/solution';

export function useFilters() {
  const [q, setQ] = React.useState('');
  const [categories, setCategories] = React.useState<Category[]>([]);

  const toggleCategory = (c: Category) =>
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return { q, setQ, categories, toggleCategory };
}