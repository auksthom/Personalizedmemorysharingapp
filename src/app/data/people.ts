export interface Person {
  id: number;
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
const peopleModules = import.meta.glob<Person>("../../content/people/*.json", {
  eager: true,
  import: "default",
});

export const PEOPLE: Person[] = Object.values(peopleModules).sort((a, b) => a.id - b.id);
