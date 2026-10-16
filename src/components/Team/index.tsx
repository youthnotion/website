import type { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Ashfaqur Rahman",
    designation: "Chief Coordinator",
    image: "/images/team/ashfaq.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 2,
    name: "Mumtahin Sifat",
    designation: "PR Lead",
    image: "/images/team/sifat.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Rafia Safa",
    designation: "HR Lead",
    image: "/images/team/safa.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 4,
    name: "Sultana Rajia",
    designation: "Campaign Lead",
    image: "/images/team/trisha.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 5,
    name: "Imranul Karim",
    designation: "Operations Lead",
    image: "/images/team/imran.png",
    facebookLink: "https://www.facebook.com/blackbeardimran",
    linkedinLink: "https://www.linkedin.com/in/imranulkarim/",
    instagramLink: "/#",
  },
  {
    id: 6,
    name: "Samsun Naher",
    designation: "Research Lead",
    image: "/images/team/Samsun Naher.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 7,
    name: "Iftekharul Islam",
    designation: "Business Developer",
    image: "/images/team/Iftekharul Islam.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 8,
    name: "Sumit Das",
    designation: "Accountant",
    image: "/images/team/Sumit Das.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 9,
    name: "Sahidul Islam Rahat",
    designation: "Youth Chief",
    image: "/images/team/Sahidul Islam Rahat.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 10,
    name: "Muaz Labib",
    designation: "Youth Chief",
    image: "/images/team/Muaz Labib.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 11,
    name: "Meheraj Patwari",
    designation: "Youth Chief",
    image: "/images/team/Meheraj Patwari.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 12,
    name: "Khalid Saifullah",
    designation: "Graphic/UI Designer",
    image: "/images/team/Evan.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 13,
    name: "Rakan Mohammed",
    designation: "Co Web-Developer",
    image: "/images/team/rakan.png",
    facebookLink: "/#",
    linkedinLink: "/#",
    instagramLink: "/#",
  }
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Founders"
            title="Meet Our Founding Team"
            paragraph="Our team is passionate about youth empowerment, combining civic education and technology to foster growth and leadership."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
