// Copy for the home and about pages that is not tied to a single component.

export type Objective = { title: string; text: string; icon: "bridge" | "spark" | "stack" | "hands" };

export const objectives: Objective[] = [
  {
    title: "Bridging the Gap",
    text: "Identify and address the gaps in human resources, skills, education, and civic awareness among youth.",
    icon: "bridge",
  },
  {
    title: "Youth Empowerment",
    text: "Empowering youth to be self-reliant, responsible citizens, and active contributors to national development.",
    icon: "spark",
  },
  {
    title: "Skilled Youth Community",
    text: "Equip every young person with skills, education, and values to drive positive change and responsibility.",
    icon: "stack",
  },
  {
    title: "Social Responsibility",
    text: "Instill social responsibility, encourage active community participation, and promote a healthy lifestyle for youth.",
    icon: "hands",
  },
];

export const journey = [
  { name: "Awareness", text: "Understand the issues shaping our communities." },
  { name: "Practical skills", text: "Build the tools and confidence to take part." },
  { name: "Youth leadership", text: "Turn ideas into action alongside others." },
  {
    name: "Community impact",
    text: "More informed, capable young people shaping a stronger future together.",
  },
];

export const faqs = [
  {
    question: "What is Youth Notion?",
    answer:
      "Youth Notion is a non-profit organization based in Maijdee, Noakhali. It aims to empower young people to become self-reliant, responsible citizens and active contributors to national development.",
  },
  {
    question: "What are the main goals of Youth Notion?",
    answer:
      "Our goals include addressing gaps in human resources, skills, education, and civic awareness among youth; empowering them to be self-reliant and responsible; fostering a sense of social responsibility and community involvement; and promoting a drug-free lifestyle.",
  },
  {
    question: "How does Youth Notion plan to achieve its goals in education?",
    answer:
      "We plan and provide career guidance, promote technical and vocational skills training, support education for disadvantaged groups, and raise awareness about social and environmental issues.",
  },
  {
    question: "How does Youth Notion promote civic responsibility among youth?",
    answer:
      "Youth Notion instills civic responsibility by raising awareness about social and environmental issues, promoting democratic values, and encouraging active participation in community development projects.",
  },
  {
    question: "What kind of research activities does Youth Notion conduct?",
    answer:
      "We conduct surveys and research to identify the challenges faced by the youth and to develop effective solutions. We also carry out studies on various social issues and their impact on young people.",
  },
  {
    question: "How can someone become a member of Youth Notion?",
    answer:
      "To become a general member of Youth Notion, one must be a Bangladeshi citizen, at least 18 years old, of sound mind and good moral character, and committed to the organization's ideals. You must also pay a membership fee and monthly dues.",
  },
];
