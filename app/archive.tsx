import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <header className="h-20 bg-white shadow">
        <div className="container flex h-full items-center justify-between font-poppins">
          <div className="text-3xl">
            <span>M. Hafidz</span>
          </div>
          <nav>
            <ul className="flex gap-9 text-lg">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#" className="text-[#515151]">
                  Working Experience
                </a>
              </li>
              <li>
                <a href="#" className="text-[#515151]">
                  Skill Showcase
                </a>
              </li>
              <li>
                <a href="#" className="text-[#515151]">
                  Project Showcase
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container h-[665px]">
        <div className="flex-col flex items-center justify-center h-full gap-8">
          <div className="text-[64px] leading-[85px] text-center font-playfair">
            <h1>
              I’m{" "}
              <span className="italic text-neutral-600">Muhammad Hafidz</span>,
            </h1>
            <h1>
              a Full-Stack{" "}
              <span className="italic text-neutral-600">Web Developer</span>
            </h1>
            <h1>based in Indonesia</h1>
          </div>
          <div>
            <p className="font-manrope text-base">
              I have 2 years of experience working on useful and mindful
              products, driven by a passion for impactful design.
            </p>
          </div>
          <Button className="rounded-4xl text-white font-manrope text-sm leading-6 text font-medium shadow-2xl">
            Let's Connect
          </Button>
        </div>
      </main>
    </>
  );
}