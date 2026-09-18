import Background from "@/components/background";
import Interactions from "@/components/interactions";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Stats from "@/components/stats";
import Solution from "@/components/solution";
import Levels from "@/components/levels";
import TripleCheck from "@/components/triple-check";
import Tech from "@/components/tech";
import Demo from "@/components/demo";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <Background />
      <Interactions />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Solution />
        <Levels />
        <TripleCheck />
        <Tech />
        <Demo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
