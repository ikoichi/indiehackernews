"use client";

import { CtaBox } from "@/components/CtaBox/CtaBox";
import { ExplainerVideo } from "@/components/ExplainerVideo/ExplainerVideo";
import { FAQ } from "@/components/FAQ/FAQ";
import { Features } from "@/components/Features/Features";
import { Footer } from "@/components/Footer copy/Footer";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Pricing } from "@/components/Pricing/Pricing";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <ExplainerVideo />

      <Features />

      <Testimonials />
      <Pricing />

      <FAQ />

      <CtaBox />

      <Footer />
    </main>
  );
}
