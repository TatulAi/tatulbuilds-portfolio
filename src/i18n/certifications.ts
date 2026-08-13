export interface CertificationMeta {
  id: "claudeCode";
  status: "in-progress" | "completed";
  issuer?: string;
  link?: string;
}

// TODO: update status to "completed" and add issuer/link once the credential is issued.
// Add more entries here as new certifications/courses are completed — the section
// renders an empty state automatically if this array is ever empty.
export const certificationsMeta: CertificationMeta[] = [
  {
    id: "claudeCode",
    status: "in-progress",
  },
];
