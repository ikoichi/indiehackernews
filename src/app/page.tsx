import { CtaBox } from "@/components/CtaBox/CtaBox";
import { ExplainerVideo } from "@/components/ExplainerVideo/ExplainerVideo";
import { FAQ } from "@/components/FAQ/FAQ";
import { Features } from "@/components/Features/Features";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Pricing } from "@/components/Pricing/Pricing";
import { getSEOTags } from "@/components/SEOTags/SEOTags";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { landingPageDescription, landingPageTitle } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: landingPageTitle,
  description: landingPageDescription,
});

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
