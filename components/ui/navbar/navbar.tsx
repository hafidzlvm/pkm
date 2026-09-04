export function NavbarContent({ className }: { className?: string }) {
  return (
    <nav className={className}>
      <ul className="flex flex-col md:flex-row gap-4 md:gap-[35px] text-lg select-none">
        <li>
          <a href="#" className="text-[#515151]">
            About
          </a>
        </li>
        <li>
          <a href="#work-eperience" className="text-[#515151] opacity-50">
            Working Experience
          </a>
        </li>
        <li>
          <a href="#skill-showcase" className="text-[#515151] opacity-50">
            Skill Showcase
          </a>
        </li>
        <li>
          <a href="#project-showcase" className="text-[#515151] opacity-50">
            Project Showcase
          </a>
        </li>
      </ul>
    </nav>
  );
}
