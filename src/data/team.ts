import type { ImageMetadata } from "astro";

import abid from "@/assets/team/abid-hasan.png";
import ashfaq from "@/assets/team/ashfaqur-rahman-chowdhury.png";
import fatin from "@/assets/team/fatin-khan.png";
import iftekharul from "@/assets/team/iftekharul-islam.png";
import imranul from "@/assets/team/imranul-karim.png";
import khaled from "@/assets/team/khaled-saifulla.png";
import meheraj from "@/assets/team/meheraj-patwari.png";
import muaz from "@/assets/team/muaz-labib.png";
import mumtahin from "@/assets/team/mumtahin-sifat.png";
import rafia from "@/assets/team/rafia-safa.png";
import rakan from "@/assets/team/rakan-mahmud.png";
import sahidul from "@/assets/team/sahidul-islam-rahat.png";
import samsun from "@/assets/team/samsun-naher-maisha.png";
import sultana from "@/assets/team/sultana-rajia.png";
import sumit from "@/assets/team/sumit-das.png";

/** Project slugs from `projects.ts` that a member contributes to. */
export type ProjectTag = "sunagorik" | "terra";

export type TeamMember = {
  name: string;
  role: string;
  photo?: ImageMetadata;
  /** Overrides the initials derived from `name` when there is no photo. */
  initials?: string;
  projects: ProjectTag[];
};

// Listed alphabetically; directors are pulled to the front by the team page.
export const team: TeamMember[] = [
  { name: "Abid Hasan", role: "Web Engineering Lead", photo: abid, projects: ["sunagorik", "terra"] },
  {
    name: "Ashfaqur Rahman Chowdhury",
    role: "Director of Operations",
    photo: ashfaq,
    projects: ["sunagorik", "terra"],
  },
  { name: "Fatin Khan", role: "Junior Systems Engineer", photo: fatin, projects: ["sunagorik"] },
  {
    name: "Iftekharul Islam",
    role: "Business Development Lead",
    photo: iftekharul,
    projects: ["sunagorik", "terra"],
  },
  { name: "Imranul Karim", role: "Operations Associate", photo: imranul, projects: ["sunagorik"] },
  { name: "Khaled Saifulla", role: "Digital Graphic Designer", photo: khaled, projects: ["sunagorik"] },
  { name: "Mahadi Sajjad Neloy", role: "Director of Engineering", projects: ["terra"] },
  { name: "Meheraj Patwari", role: "Regional Coordinator", photo: meheraj, projects: ["sunagorik"] },
  { name: "Muaz Labib", role: "Regional Coordinator", photo: muaz, projects: ["sunagorik"] },
  { name: "Mumtahin Sifat", role: "PR Lead · Project Sunagorik", photo: mumtahin, projects: ["sunagorik"] },
  { name: "Rafia Safa", role: "HR Lead · Project Sunagorik", photo: rafia, projects: ["sunagorik"] },
  { name: "Rakan Mahmud", role: "Junior Web Engineer", photo: rakan, projects: ["sunagorik"] },
  { name: "Sahidul Islam Rahat", role: "Regional Coordinator", photo: sahidul, projects: ["sunagorik"] },
  { name: "Samsun Naher Maisha", role: "Director of Research", photo: samsun, projects: ["terra"] },
  {
    name: "Sultana Rajia",
    role: "Campaign Lead · Project Sunagorik",
    photo: sultana,
    projects: ["sunagorik"],
  },
  { name: "Sumit Das", role: "Accountant", photo: sumit, projects: ["sunagorik"] },
];

export const isDirector = (member: TeamMember) => member.role.startsWith("Director");

export const initialsOf = (member: TeamMember) =>
  member.initials ??
  member.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
