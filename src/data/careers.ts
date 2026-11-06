import { site } from "./site";

export type Role = {
  /** The role's URL: /careers/<slug>. */
  slug: string;
  title: string;
  /** YYYY-MM-DD. Search engines show this, so refresh it now and then while a role stays open. */
  posted: string;
  duration: string;
  location: string;
  /** Shown as written, e.g. "Paid: 5,000 BDT/month". Left out of the posting when empty. */
  pay?: string;
  summary: string;
  /** Left out of the posting when empty. */
  responsibilities?: string[];
  requirements: string[];
};

export const tracks = [
  { name: "Internships", text: "Learn by doing" },
  { name: "Junior roles", text: "Grow with the work" },
];

/** True of every internship, so they live here once instead of in each role. */
export const internshipTerms = [
  "Flexible hours",
  "Mentorship included",
  "Open year-round",
  "Start on acceptance",
];

const computerRequirement = "Access to a computer [Mandatory; provided where genuinely needed]";

// Only current, confirmed openings go here. When the list is empty, the page says so.
export const roles: Role[] = [
  {
    slug: "web-engineering-intern",
    title: "Web Engineering Intern",
    posted: "2026-11-06",
    duration: "3 months",
    location: "Fully remote",
    summary:
      "Contribute to web applications across front-end, back-end and UI/UX. Interns who perform well will be considered for a junior role on completion.",
    responsibilities: [
      "Develop and maintain front-end features for production applications",
      "Implement responsive, accessible interfaces from design specifications",
      "Assist with back-end API development and front-end integration",
      "Contribute to UI/UX design, including screens and user flows",
      "Diagnose and resolve defects, and test your own changes",
      "Optimize application performance, usability and SEO",
      "Write technical documentation for your work",
      "Collaborate through version control, pull requests and code review",
    ],
    requirements: [
      "Demonstrated motivation and interest in web engineering [Mandatory]",
      "Working knowledge of Git or equivalent version control [Mandatory]",
      "Working knowledge of HTML, CSS and JavaScript [Mandatory]",
      "Clear communication and self-directed remote work [Mandatory]",
      computerRequirement,
      "SvelteKit, Astro, or languages such as Rust, Python or Go [Optional]",
      "Portfolio or personal projects [Optional]",
      "Prior work experience or university degree [Not required]",
    ],
  },
  {
    slug: "systems-engineering-intern",
    title: "Systems Engineering Intern",
    posted: "2026-11-06",
    duration: "3 months",
    location: "Hybrid",
    summary:
      "Contribute to embedded systems projects under senior engineers. Interns who perform well will be considered for a junior role on completion.",
    responsibilities: [
      "Shadow senior engineers and complete assigned tasks under mentorship",
      "Support embedded software on Linux, BSD and RTOS platforms",
      "Work across x86, ARM and other hardware architectures",
      "Assist senior engineers with embedded system design",
      "Assist with system deployment and configuration",
      "Test hardware, microcontroller and firmware components",
      "Assist with diagnosing system, software and hardware faults",
      "Develop scripts and tools to automate routine tasks",
      "Maintain technical documentation and contribute through code review",
    ],
    requirements: [
      "Demonstrated motivation and interest in systems engineering [Mandatory]",
      "Working knowledge of Git or equivalent version control [Mandatory]",
      "Basic knowledge of C, C++ or Python [Mandatory]",
      "Clear communication and self-directed work [Mandatory]",
      computerRequirement,
      "Experience with Linux, BSD, an RTOS or networking [Optional]",
      "Experience with microcontrollers, such as Arduino or ESP [Optional]",
      "Familiarity with PLCs [Highly desirable]",
      "Computer science, electrical engineering or related studies [Optional]",
    ],
  },
];

/** Opens WhatsApp with a first message already typed, so nobody has to work out what to say. */
export const applyLink = (role: Role) =>
  `${site.whatsapp.href}?text=${encodeURIComponent(`Hi Youth Notion, I'm interested in the ${role.title} role.`)}`;

const htmlList = (title: string, items?: string[]) =>
  items?.length
    ? `<p><strong>${title}</strong></p><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : "";

/** schema.org JobPosting data, which is what makes a role eligible for Google's job search. */
export const jobPosting = (role: Role) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: role.title,
  description: [
    `<p>${role.summary}</p>`,
    `<p>${[role.duration, role.location, ...internshipTerms].join(", ")}. Hours are adjusted around your studies or job. Apply on WhatsApp: ${site.whatsapp.label}.</p>`,
    htmlList("Responsibilities", role.responsibilities),
    htmlList("Requirements", role.requirements),
  ].join(""),
  identifier: { "@type": "PropertyValue", name: site.name, value: role.slug },
  datePosted: role.posted,
  employmentType: "INTERN",
  hiringOrganization: {
    "@type": "Organization",
    name: site.name,
    sameAs: site.url,
    logo: `${site.url}/apple-touch-icon.png`,
  },
  // Google allows TELECOMMUTE for fully remote jobs only, and needs a country with it
  // (search targeting only). Any other role is listed at the office address.
  ...(role.location === "Fully remote"
    ? {
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: { "@type": "Country", name: site.address.country },
      }
    : {
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            addressCountry: site.address.countryCode,
          },
        },
      }),
  url: `${site.url}/careers/${role.slug}/`,
});
