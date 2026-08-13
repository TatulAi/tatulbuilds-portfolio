export interface ProjectMeta {
  id: "carscope" | "n8nLibrary" | "instant" | "lvg";
  name: string;
  tags: string[];
  link: string;
  isPlaceholderLink: boolean;
}

// TODO: replace placeholder links (Instant, LVG Engineering) once public URLs exist.
export const projectsMeta: ProjectMeta[] = [
  {
    id: "carscope",
    name: "CarScope AI",
    tags: ["React", "TypeScript", "n8n", "Supabase", "Vercel"],
    link: "https://github.com/TatulAi/carscope-ai",
    isPlaceholderLink: false,
  },
  {
    id: "n8nLibrary",
    name: "n8n Workflows Library",
    tags: ["n8n", "Automation", "Gmail API"],
    link: "https://github.com/TatulAi/n8n-workflows",
    isPlaceholderLink: false,
  },
  {
    id: "instant",
    name: "Instant",
    tags: ["MJML", "HTML Email", "Client work"],
    link: "#",
    isPlaceholderLink: true,
  },
  {
    id: "lvg",
    name: "LVG Engineering",
    tags: ["Branding", "SVG", "Design"],
    link: "#",
    isPlaceholderLink: true,
  },
];
