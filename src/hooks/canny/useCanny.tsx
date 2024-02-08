import { useEffect, useState } from "react";

export const useCanny = () => {
  let typeOfWindow = undefined;

  if (typeof window !== "undefined") {
    typeOfWindow = typeof window;
  }

  // @ts-ignore
  const typeOfCanny = typeOfWindow && typeof window?.Canny;
  const [rerender, setRerender] = useState("");

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && typeof window?.Canny === "undefined") {
      setTimeout(() => setRerender("rerender"), 1000);
    }

    // @ts-ignore
    if (typeof window !== "undefined" && typeof window?.Canny !== "undefined") {
      // @ts-ignore
      Canny("initChangelog", {
        appID: "637f73b207bb14527c013742",
        position: "top",
        align: "left",
      });
    }

    return () => {
      if (
        typeof window !== "undefined" &&
        // @ts-ignore
        typeof window?.Canny !== "undefined"
      ) {
        // @ts-ignore
        Canny("closeChangelog");
      }
    };
  }, [typeOfWindow, typeOfCanny, rerender]);
};
