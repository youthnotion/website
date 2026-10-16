import Image from "@/compat/Image";
import Link from "@/compat/Link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-youth pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl font-kdamthmorpro font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                  Empowering Youth Through Civic Awareness and Technology
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
                  Youth Notion is committed to promoting civic awareness and
                  fostering growth through the integration of information
                  technology. We believe that empowering young people with the
                  right tools and knowledge can drive positive change in their
                  communities and BEYOND.
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <Link
                      href="/#about"
                      className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#current-projects"
                      className="flex items-center gap-4 rounded-md bg-white/[0.12] px-6 py-[14px] text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark"
                    >
                      Current Projects
                    </Link>
                  </li>
                </ul>

                
              </div>
            </div>

            {/* Removed hero image and SVG banners for a cleaner layout */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
