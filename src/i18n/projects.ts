interface ProjectBase {
  id: "n8nLibrary" | "lvg" | "voiceAgent";
  name: string;
  tags: string[];
}

interface LinkProject extends ProjectBase {
  link: string;
  isPlaceholderLink: boolean;
  demoAgentId?: undefined;
}

interface VoiceDemoProject extends ProjectBase {
  demoAgentId: string;
}

export type ProjectMeta = LinkProject | VoiceDemoProject;

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
  {
    id: "voiceAgent",
    name: "Voice Booking Agent",
    tags: ["n8n", "Voice AI", "ElevenLabs", "Google Calendar"],
    demoAgentId: "agent_6001m6vpwb7aebhsep13px2npfwh",
  },
];
