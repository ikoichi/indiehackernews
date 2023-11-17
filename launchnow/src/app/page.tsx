"use client";

import { ExplainerVideo } from "@/components/ExplainerVideo/ExplainerVideo";
import { Features } from "@/components/Features/Features";
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

      <Heading
        my="16px"
        mt="200px"
        px="16px"
        mb="60px"
        fontSize={["28px", "40px", "52px"]}
        textAlign="center"
      >
        The #1 money maker app
      </Heading>

      <Features />

      <Testimonials />
      <Pricing />
    </main>
  );
}
