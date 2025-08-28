import { GetStaticProps } from "next";
import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

import { fetchSolutions } from "@/lib/api";
import type { Solution } from "@/interfaces/solution";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const placeholderSolutions: Solution[] = [
  {
    id: "1",
    name: "BioPack",
    category: "Sustainability",
    description: "Eco-friendly packaging made from seaweed.",
    image: "/assets/blog/images/grass.png",
    tags: ["eco-friendly", "packaging", "seaweed"],
  },
  {
    id: "2",
    name: "NutriHealth",
    category: "Health",
    description: "Personalized nutrition plans using AI.",
    image: "/assets/blog/images/yeasty.png", 
    tags: ["nutrition", "AI", "health"],
  },
];

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <div className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
     
  
      <section className="bg-brand-light p-8">
        <h1 className="text-4xl font-bold mb-4">
          Explore Biosolutions <br /> That Shape Our Future
        </h1>
        <p className="text-gray-700 mb-6">
          Search and filter through biological innovations in food, health, and sustainability.
        </p>
        <div className="flex items-center bg-white rounded-full shadow-sm px-4 py-2 max-w-md">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search solutions..."
            className="flex-1 outline-none"
          />
        </div>
      </section>

      {/* Filters */}
      <div className="p-6 flex gap-3">
        <span className="tag">Food</span>
        <span className="tag">Health</span>
        <span className="tag">Sustainability</span>
      </div>

      {/* Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        {placeholderSolutions.map((solution) => (
          <div key={solution.id} className="card">
            <img
              src={solution.image || "/placeholder.jpg"}
              alt={solution.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg">{solution.name}</h2>
              <p className="text-gray-600 mb-2">{solution.category}</p>
              <Link href={`/${solution.id}`}>
                <span className="link">View Details →</span>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
      </div>
      
    </section>
  );
}

