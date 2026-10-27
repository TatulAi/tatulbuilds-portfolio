export interface ProjectMeta {
  id: "n8nLibrary" | "lvg";
  name: string;
  tags: string[];
  link: string;
  isPlaceholderLink: boolean;
}

export const projectsMeta: ProjectMeta[] = [
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
