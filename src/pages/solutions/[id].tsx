import { GetStaticPaths, GetStaticProps } from "next";
import { fetchSolutions, fetchSolutionById } from "../lib/api";
import type { Solution } from "../types/solution";
import { SolutionCard } from "../components/explorer/SolutionCard";
import { useRouter } from "next/router";

interface Props {
  solution: Solution | null;
  related: Solution[];
}

export default function SolutionDetails({ solution, related }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!solution) {
    return <div>Solution not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <img
          src={solution.image}
          alt={solution.name}
          className="w-full h-64 object-cover rounded-2xl mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{solution.name}</h1>
        <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
          {solution.category}
        </span>
        <p className="text-gray-700 leading-relaxed">{solution.description}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Related Solutions</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {related.map((rel) => (
            <SolutionCard key={rel.id} solution={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const solutions = await fetchSolutions();

  return {
    paths: solutions.map((s) => ({ params: { id: s.id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const solution = await fetchSolutionById(id);
  const related = (await fetchSolutions()).filter((s) => s.id !== id).slice(0, 3);

  return {
    props: {
      solution: solution || null,
      related,
    },
    revalidate: 60,
  };
};