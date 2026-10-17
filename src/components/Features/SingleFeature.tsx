import type { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { id, icon, title, paragraph } = feature;
  return (
    <article className="objective-card group">
      <div className="objective-card-top">
        <span className="objective-number">0{id}</span>
        <div className="objective-icon">{icon}</div>
      </div>
      <div className="objective-card-copy">
        <h3>{title}</h3>
        <p>{paragraph}</p>
        <span className="objective-rule"><i /></span>
        <span className="objective-label">OUR PRIORITY</span>
      </div>
    </article>
  );
};

export default SingleFeature;
