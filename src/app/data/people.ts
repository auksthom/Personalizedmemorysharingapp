export interface Person {
  id: number;   // derived from filename — not stored in JSON
  name: string;
  role: string;
  photo: string;
  accent: string;
  message: string;
  video: string;
  duration: string;
}

// People are managed as content files under src/content/people/*.json —
// edit them directly, or use the /admin CMS to add/update colleagues.
// IDs are automatically derived from the filename prefix so you never
// need to fill in an ID field manually.
const peopleModules = import.meta.glob<Omit<Person, "id">>(
  "../../content/people/*.json",
  { eager: true, import: "default" }
);

function idFromPath(path: string, fallback: number): number {
  const filename = path.split("/").pop() ?? "";
  const n = parseInt(filename, 10);
  return isNaN(n) ? fallback : n;
}

export const PEOPLE: Person[] = Object.entries(peopleModules)
  .map(([path, data], i) => ({ ...data, id: idFromPath(path, 10000 + i) }))
  .sort((a, b) => a.id - b.id);
