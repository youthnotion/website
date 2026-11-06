// Organisation-wide facts used by the layout, header, footer and structured data.

export const site = {
  name: "Youth Notion",
  url: "https://youthnotion.orgs.bd",
  tagline: "Youth-led. Future-ready.",
  description:
    "Youth Notion is a youth-led organization in Maijdee, Noakhali, Bangladesh, empowering young people through education, civic awareness, technology, and community action.",
  mission: "We empower young people to grow and become valuable contributors to society and the country.",
  address: {
    street: "Mamtaz Mahal, Road-08, House-01, 4th Floor, Housing Estate",
    locality: "Maijdee Court",
    region: "Noakhali",
    country: "Bangladesh",
    countryCode: "BD",
  },
  whatsapp: { label: "+880 1787-600900", href: "https://wa.me/8801787600900" },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
];

export type Social = { name: string; href: string; icon: "facebook" | "linkedin" | "whatsapp" };

export const socials: Social[] = [
  { name: "Facebook", href: "https://www.facebook.com/youthnotion", icon: "facebook" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/youthnotion/", icon: "linkedin" },
  { name: "WhatsApp", href: site.whatsapp.href, icon: "whatsapp" },
];
