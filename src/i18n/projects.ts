export interface ProjectMeta {
  id: "carscope" | "n8nLibrary" | "lvg";
  name: string;
  tags: string[];
  link: string;
  isPlaceholderLink: boolean;
}

export const projectsMeta: ProjectMeta[] = [
  {
    id: "carscope",
    name: "CarScope AI",
    tags: ["React", "TypeScript", "n8n", "Supabase", "Vercel"],
    // TODO: swap for the custom domain once one is purchased.
    link: "https://carscope-ai.vercel.app/",
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
    id: "lvg",
    name: "LVG Engineering",
    tags: ["Branding", "SVG", "Design"],
    link: "https://lvgengineering.sk",
    isPlaceholderLink: false,
  },
];
