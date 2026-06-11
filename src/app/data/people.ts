export type Mood = "happy" | "sad" | "miserable";

export interface MoodInfo {
  key: Mood;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  desc: string;
}

export const MOODS: MoodInfo[] = [
  {
    key: "happy",
    label: "Happy",
    emoji: "😄",
    color: "#84bd00",
    bg: "#f4fbe6",
    desc: "Feeling good and want to remember the fun times",
  },
  {
    key: "sad",
    label: "Sad",
    emoji: "🥺",
    color: "#20c6b9",
    bg: "#e8f8f6",
    desc: "Missing everyone already — that's okay",
  },
  {
    key: "miserable",
    label: "Miserable",
    emoji: "😩",
    color: "#e03189",
    bg: "#fce4f0",
    desc: "Having a rough day and need a lift",
  },
];

export interface MoodMessage {
  message: string;
  video: string;
  duration: string;
}

export interface Person {
  id: number;
  name: string;
  role: string;
  photo: string;
  accent: string;
  messages: Record<Mood, MoodMessage>;
}

// People are managed as content files under src/content/people/*.json —
// edit them directly, or use the /admin CMS to add/update colleagues.
const peopleModules = import.meta.glob<Person>("../../content/people/*.json", {
  eager: true,
  import: "default",
});

export const PEOPLE: Person[] = Object.values(peopleModules).sort((a, b) => a.id - b.id);
