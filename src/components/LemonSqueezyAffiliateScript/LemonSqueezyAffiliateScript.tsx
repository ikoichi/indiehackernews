"use client";

import Script from "next/script";
import { useEffect } from "react";

export const LemonSqueezyAffiliateScript = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.lemonSqueezyAffiliateConfig = { store: "<store_name>" };
    }
  }, [typeof window !== "undefined"]);

  return (
    <Script
      id="lemon-squeezy-js"
      defer
      src="https://lmsqueezy.com/affiliate.js"
    />
  );
};
