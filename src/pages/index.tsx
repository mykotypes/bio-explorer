import { GetStaticProps } from "next";
import { fetchSolutions } from "../lib/api";
import type { Solution } from "../types/solution";
import Link from "next/link";

interface Props {
  solutions: Solution[];
}

export default function Home({ solutions }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Solutions</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {solutions.map((solution) => (
          <Link key={solution.id} href={`/${solution.id}`}>
            <span className="block p-4 border rounded-lg hover:shadow-lg">
              <h2 className="text-xl font-semibold">{solution.name}</h2>
              <p className="text-gray-600">{solution.category}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const solutions = await fetchSolutions();

  return {
    props: {
      solutions,
    },
    revalidate: 60,
  };
};