import * as React from 'react';
import Link from 'next/link';
import { Tag } from '../ui/Tag';
import type { Solution } from '../../types/solution';

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <img
        src={solution.image}
        alt={solution.name}
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">{solution.name}</h3>
          <Tag>{solution.category}</Tag>
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">{solution.description}</p>
        <Link className="text-sm font-medium text-teal-700 hover:underline" href={`/solutions/${solution.id}`}>
          View Details →
        </Link>
      </div>
    </article>
  );
}