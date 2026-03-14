import { Nav } from "@/app/components/Nav";
import { Landing } from "@/app/components/Landing";
import { About } from "@/app/components/About";
import { Skills } from "@/app/components/Skills";
import { Certifications } from "@/app/components/Certifications";
import { Projects } from "@/app/components/Projects";
import { Gallery } from "@/app/components/Gallery";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { SmoothScrollProvider } from "@/app/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <Landing />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
