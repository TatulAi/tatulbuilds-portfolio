export interface CertificationMeta {
  id: "claude101" | "claudeCode101";
  status: "in-progress" | "completed";
  issuer?: string;
  link?: string;
}

// Add more entries here as new certifications/courses are completed — the section
// renders an empty state automatically if this array is ever empty.
export const certificationsMeta: CertificationMeta[] = [
  {
    id: "claude101",
    status: "completed",
    issuer: "Anthropic",
    link: "/certificate-gw6aukrd7a6n-1787059054.pdf",
  },
  {
    id: "claudeCode101",
    status: "completed",
    issuer: "Anthropic",
    link: "/certificate-yg3vxyjazfws-1786602473.pdf",
  },
];
