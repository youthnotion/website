import Image from "@/compat/Image";
import Link from "@/compat/Link";

const Footer = () => (
  <footer className="relative z-10 overflow-hidden bg-[#090E34] pt-20 lg:pt-[100px]">
    <div className="container">
      <div className="-mx-4 flex flex-wrap pb-8">
        <div className="w-full px-4 sm:w-1/2 lg:w-4/12">
          <div className="mb-10 w-full">
            <Link href="/" className="mb-6 inline-block max-w-[180px]">
              <Image src="/images/logo/YN-3.svg" alt="Youth Notion" width={210} height={58} />
            </Link>
            <p className="mb-8 max-w-[300px] text-base text-gray-7">
              We empower young people to grow and become valuable contributors to society and the country.
            </p>
            <div className="flex items-center gap-3" aria-label="Connect with Youth Notion">
              <a href="https://www.facebook.com/youthnotion" target="_blank" rel="noopener noreferrer" aria-label="Youth Notion on Facebook" title="Facebook" className="footer-social-link flex h-10 w-10 items-center justify-center rounded-full border border-[#1877F2]/40 bg-[#1877F2]/10 text-[#1877F2] transition hover:border-[#1877F2] hover:bg-[#1877F2]/20 focus:outline-none focus:ring-2 focus:ring-[#1877F2]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/youthnotion/" target="_blank" rel="noopener noreferrer" aria-label="Youth Notion on LinkedIn" title="LinkedIn" className="footer-social-link flex h-10 w-10 items-center justify-center rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#0A66C2] transition hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1A3.7 3.7 0 0 1 15.7 8c3.5 0 4.2 2.3 4.2 5.3v7.2h-3.4v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.5H9V9Z" /></svg>
              </a>
              <a href="https://wa.me/8801787600900" target="_blank" rel="noopener noreferrer" aria-label="Chat with Youth Notion on WhatsApp at +880 1787-600900" title="WhatsApp: +880 1787-600900" className="footer-social-link footer-social-link-whatsapp relative isolate flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] transition hover:border-[#25D366] hover:bg-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.52 14.94L2.2 22l5.2-1.36A9.98 9.98 0 0 0 12.04 22h.01A10 10 0 0 0 12.04 2Zm0 18.3a8.28 8.28 0 0 1-4.22-1.15l-.3-.18-3.09.81.83-3.01-.2-.31A8.3 8.3 0 1 1 12.04 20.3Zm4.56-6.22c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-.1-.74-.68-1.24-1.52-1.39-1.77-.15-.25-.02-.39.11-.52.11-.11.25-.3.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.02 2.59.13.17 1.77 2.7 4.28 3.79.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.07-.1-.23-.16-.48-.28Z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
          <FooterColumn title="Explore" links={[
            ["Home", "/"], ["About", "/about"], ["Our team", "/team"],
            ["Projects", "/projects"], ["Careers", "/careers"],
            ["Frequently asked questions", "/about#faq"],
          ]} />
        </div>

        <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
          <FooterColumn title="Our projects" links={[
            ["Project Terra", "https://youthnotion.github.io/TERRA/"],
            ["Project Sunagorik", "https://youthnotion.github.io/sunagorik"],
            ["Tech4Youth", "/projects#current-projects"],
          ]} />
        </div>

        <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
          <div className="mb-10 w-full">
            <h2 className="mb-7 text-lg font-semibold text-white">Office</h2>
            <address className="max-w-[260px] not-italic text-base leading-relaxed text-gray-7">
              Mamtaz Mahal, Road-08, House-01, 4th Floor, Housing Estate, Maizdee Court, Noakhali
            </address>
          </div>
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
