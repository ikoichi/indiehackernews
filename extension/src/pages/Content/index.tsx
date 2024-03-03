// import { printLine } from "./modules/print";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import createCache from "@emotion/cache";
import root from "react-shadow";
import { CacheProvider } from "@emotion/react";
import { extensionPrefix, portName } from "../../config";

const zIndex = 1000001;

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

/*
  This React Component is added to all the web pages.
  Implement your Chrome Extension logic inside it.
*/
const Main = () => {
  const [isLoadingUserStatus, setLoadingUserStatus] = useState(true);
  const [isFreePlan, setFreePlan] = useState(true);

  const [isLogged, setLogged] = useState(false);

  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    /*
      Message from background script or popup
    */
    chrome.runtime.onMessage.addListener(async function (msg) {
      console.log(">>> Message received!", msg);

      if (msg.type === "user-status") {
        if (msg?.data?.error === "unauthorized") {
          setLogged(false);
        } else {
          setLogged(true);
        }
        setLoadingUserStatus(false);
        setFreePlan(!!msg?.data?.isFreePlan);
      }
    });
  }, []);

  const [channelPort, setChannelPort] = useState<chrome.runtime.Port | null>(
    null
  );
  useEffect(() => {
    const port = chrome.runtime.connect({ name: portName });
    setChannelPort(port);
    port.onMessage.addListener(function (msg) {
      console.log("message", msg);

      if (msg.type === "user-status") {
        setFreePlan(!!msg?.data?.isFreePlan);
        setLoadingUserStatus(false);
        if (msg?.data?.error === "unauthorized") {
          setLogged(false);
          return;
        }
        setLogged(true);
      }
    });
  }, []);

  const containerRef = useRef();

  const myCache = createCache({
    key: "my-prefix-key",
    container: containerRef.current,
  });

  if (!isInitialized) {
    return null;
  }

  return (
    <root.div className={`${extensionPrefix}-container`}>
      {/* @ts-ignore */}
      <div ref={containerRef} style={{ zIndex }}>
        <CacheProvider value={myCache}>
          {/* Add the JSX/HTML nodes you want to show in the page here */}
        </CacheProvider>
      </div>
    </root.div>
  );
};

const app = document.createElement("div");
app.id = `${extensionPrefix}-root`;
document.body.appendChild(app);
const appRoot = createRoot(app);
appRoot.render(<Main />);
