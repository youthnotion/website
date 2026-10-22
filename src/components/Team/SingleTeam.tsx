import type { TeamType } from "@/types/team";
import Image from "@/compat/Image";

const SingleTeam = ({ team }: { team: TeamType }) => {
  const isDirector = team.designation.startsWith("Director");
  const initials = team.initials ?? team.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article className={`team-card${isDirector ? " team-card-director" : ""}`}>
      <div className="team-card-content">
        <h3>{team.name}</h3>
        <p className="team-designation">{team.designation}</p>
        <div className="team-project-logos">
          <span className="team-org-logo" title="Youth Notion">
            <Image
              src="/images/logo/logo.svg"
              alt="Youth Notion logo"
              width={20}
              height={20}
            />
          </span>
          {team.sunagorik && (
            <span className="team-project-logo" title="Project Sunagorik">
              <Image
                src="/images/projects/sunagorik-logo.png"
                alt="Project Sunagorik logo"
                width={24}
                height={24}
              />
            </span>
          )}
          {team.terra && (
            <span className="terra-project-mark" title="Project Terra" aria-label="Project Terra">
              <span>&lt;</span>TERRA<span>/&gt;</span>
            </span>
          )}
        </div>
      </div>
      {!team.portraitHidden && (
        <div className="team-portrait-wrap" aria-hidden="true">
          <div className="team-portrait-orbit" />
          <div className={`team-portrait${team.image ? "" : " team-portrait-initials"}`}>
            {team.image ? (
              <Image
                src={team.image}
                alt={team.name}
                className="team-portrait-image"
                width={176}
                height={176}
              />
            ) : (
              <span aria-label={`${team.name} initials`}>{initials}</span>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default SingleTeam;
