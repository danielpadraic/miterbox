import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { InquiryProvider } from "@/components/InquiryProvider";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ContactModal } from "@/components/ContactModal";

export default function HomePage() {
  return (
    <InquiryProvider>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Process />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <ContactModal />
    </InquiryProvider>
  );
}
