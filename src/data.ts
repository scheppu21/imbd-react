export type Movie = {
  id: number;
  title: string;
  image: string;
};

export type Actor = {
  id: number;
  name: string;
  coverImage?: string;
  image: string;
  bio?: string;
  birthDate?: string;
  knownFor?: Movie[];
  awards?: { title: string; year: number }[]; // ✅ Corrected awards type
};

// Sample data
export const actors: Actor[] = [
  {
    id: 1,
    name: "Leonardo DiCaprio",
    coverImage: "https://example.com/leonardo-bg.jpg",
    image: "https://example.com/leonardo.jpg",
    bio: "Oscar-winning actor known for Titanic and Inception.",
    birthDate: "1974-11-11",
    knownFor: [
      { id: 101, title: "Inception", image: "https://example.com/inception.jpg" },
      { id: 102, title: "Titanic", image: "https://example.com/titanic.jpg" }
    ],
    awards: [
      { title: "Best Actor - The Revenant", year: 2016 },
      { title: "Golden Globe - The Aviator", year: 2005 }
    ]
  }
];
