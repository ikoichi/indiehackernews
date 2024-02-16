"use client";

import { useEffect } from "react";

export const UserdeskChat = () => {
  useEffect(() => {
    if (window && process.env.NEXT_PUBLIC_USERDESK_CHATBOT_ID) {
      (function () {
        // @ts-ignore
        var d = document;
        // @ts-ignore
        const script = d.createElement("script");
        script.src = "https://cdn.userdesk.io/widget/userdesk.js";
        script.async = true;
        script.setAttribute(
          "data-userdesk",
          process.env.NEXT_PUBLIC_USERDESK_CHATBOT_ID
        );
        d.getElementsByTagName("head")[0].appendChild(script);
      })();
    }
  }, []);

  return null;
};
