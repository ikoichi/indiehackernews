import { CtaBox } from "@/components/CtaBox/CtaBox";
import { ExplainerVideo } from "@/components/ExplainerVideo/ExplainerVideo";
import { FAQ } from "@/components/FAQ/FAQ";
import { Features } from "@/components/Features/Features";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Lifetime } from "@/components/Lifetime/Lifetime";
import { Pricing } from "@/components/Pricing/Pricing";
import { Testimonials } from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <Hero />
        <ExplainerVideo />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CtaBox />
      </main>
      <Footer />
    </>
  );
}
