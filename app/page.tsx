import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AssistantChat } from "@/components/layout/assistant-chat";
import { HeroSection } from "@/components/sections/hero-section";
import { SelayangPandangSection } from "@/components/sections/selayang-pandang-section";
import { ProgramSection } from "@/components/sections/program-section";
import { DonasiSection } from "@/components/sections/donasi-section";
import { LokasiSection } from "@/components/sections/lokasi-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SelayangPandangSection />
        <ProgramSection />
        <DonasiSection />
        <LokasiSection />
      </main>
      <Footer />
      <AssistantChat />
    </>
  );
}
