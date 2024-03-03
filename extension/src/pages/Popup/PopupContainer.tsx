import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Popup.css";
import { Popup } from "../../components/molecules/Popup/Popup";
import { baseUrl, domain, portName } from "../../config";

type User = {
  email: string;
  id: string;
  image: string;
  name: string;
};

const PopupContainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setLoadingUser] = useState(false);

  const [theCookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
  const [hasAllCookies, setHasAllCookies] = useState(false);
  useEffect(() => {
    async function getCookies() {
      const cookies = await chrome.cookies.getAll({ domain: domain });
      setCookies(cookies);

      const hasCsrfToken = !!cookies.find(
        (cookie) =>
          cookie.domain === domain &&
          cookie.name === "__Host-next-auth.csrf-token"
      );

      const hasSessionToken = !!cookies.find(
        (cookie) =>
          cookie.domain === domain &&
          cookie.name === "__Secure-next-auth.callback-url"
      );

      setHasAllCookies(hasCsrfToken && hasSessionToken);
    }

    getCookies();
  }, []);

  useEffect(() => {
    if (hasAllCookies) {
      const cookieString = theCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

      setLoadingUser(true);
      axios
        .get(`${baseUrl}/api/user`, {
          headers: {
            cookies: cookieString,
          },
        })
        .then((res) => {
          console.log(">>> res", res.data.user);
          setUser(res?.data?.user);
        })
        .catch((err) => {
          console.log(">>> err", err);
        })
        .finally(() => {
          setLoadingUser(false);
        });
    }
  }, [hasAllCookies]);

  const [channelPort, setChannelPort] = useState<chrome.runtime.Port | null>(
    null
  );
  useEffect(() => {
    const port = chrome.runtime.connect({ name: portName });
    setChannelPort(port);

    /* Message received */
    port.onMessage.addListener(function (msg) {
      console.log(">>> message", msg);
    });
  }, []);

  return <Popup userName={user?.name || user?.email} />;
};

export default PopupContainer;
