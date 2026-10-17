import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section id="features" className="objectives-section pb-10 pt-20 lg:pb-[100px] lg:pt-[110px]">
      <div className="container">
        <SectionTitle
          subtitle="Objectives"
          title="A clear path from potential to impact."
          paragraph="We turn youth potential into lasting progress through four connected priorities: opportunity, agency, capability, and community."
          width="690px"
          center
        />

        <div className="objectives-grid mt-12 lg:mt-16">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
