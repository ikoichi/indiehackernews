"use client";

import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    if (window && process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
      // @ts-ignore
      window.$crisp = [];
      // @ts-ignore
      window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
      (function () {
        // @ts-ignore
        var d = document;
        // @ts-ignore
        var s = d.createElement("script");
        // @ts-ignore
        s.src = "https://client.crisp.chat/l.js";
        // @ts-ignore
        s.async = 1;
        // @ts-ignore
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    }
  }, []);

  return null;
};
