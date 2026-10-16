import Image from "@/compat/Image";
import Link from "@/compat/Link";

const Footer = () => (
  <footer className="relative z-10 overflow-hidden bg-[#090E34] pt-20 lg:pt-[100px]">
    <div className="container">
      <div className="-mx-4 flex flex-wrap pb-8">
        <div className="w-full px-4 sm:w-1/2 lg:w-5/12">
          <div className="mb-10 w-full">
            <Link href="/" className="mb-6 inline-block max-w-[180px]">
              <Image src="/images/logo/YN-3.svg" alt="Youth Notion" width={210} height={58} />
            </Link>
            <p className="mb-8 max-w-[300px] text-base text-gray-7">
              We empower young people to grow and become valuable contributors to society and the country.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://www.facebook.com/youthnotion" target="_blank" rel="noopener noreferrer" aria-label="Youth Notion on Facebook" className="font-semibold text-gray-7 hover:text-white">Facebook</a>
              <a href="https://www.linkedin.com/company/youthnotion/" target="_blank" rel="noopener noreferrer" aria-label="Youth Notion on LinkedIn" className="font-semibold text-gray-7 hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
          <FooterColumn title="Explore" links={[
            ["Home", "/"], ["About", "/about"], ["Our team", "/#team"],
            ["Current projects", "/#current-projects"], ["Frequently asked questions", "/#faq"],
          ]} />
        </div>

        <div className="w-full px-4 sm:w-1/2 lg:w-4/12">
          <FooterColumn title="Our projects" links={[
            ["Project Terra", "https://youthnotion.github.io/TERRA/"],
            ["Sunagorik", "https://youthnotion.github.io/sunagorik"],
            ["Tech4Youth", "/#current-projects"],
          ]} />
        </div>

      </div>
      <div className="flex flex-col gap-3 border-t border-white/20 py-6 text-sm text-gray-7 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Youth Notion. All rights reserved.</span>
        <a href="#top" className="text-gray-7 hover:text-white">Back to top ↑</a>
      </div>
    </div>
    <span aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-48 w-80 opacity-10"><Image src="/images/footer/shape-1.svg" alt="" width={320} height={192} /></span>
  </footer>
);

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="mb-10 w-full">
      <h2 className="mb-7 text-lg font-semibold text-white">{title}</h2>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}><Link href={href} className="text-base text-gray-7 hover:text-white">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
