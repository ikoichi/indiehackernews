import { extensionPrefix } from "../config";

export const storageDisabledReplyOverlayDomainsKey = `${extensionPrefix}:disabled-reply-overlay`;
export const storageDisabledOverlayDomainsKey = `${extensionPrefix}:disabled-overlay`;
export const storageDisabledShortcutDomainsKey = `${extensionPrefix}:disabled-shortcut`;

const getIsEnabled = (storageKey: string) => {
  const disabledDomainsSession = sessionStorage.getItem(storageKey);

  const sessionDomains = disabledDomainsSession
    ? JSON.parse(disabledDomainsSession)
    : [];

  const disabledDomainsLocal = localStorage.getItem(storageKey);
  const localDomains = disabledDomainsLocal
    ? JSON.parse(disabledDomainsLocal)
    : [];

  return (
    !sessionDomains.includes(window.location.host) &&
    !localDomains.includes(window.location.host)
  );
};

export const updateDomainsOnSessionStorage = (storageKey: string) => {
  const values = sessionStorage.getItem(storageKey);
  const disabledHosts = values ? JSON.parse(values) : [];
  sessionStorage.setItem(
    storageKey,
    JSON.stringify([...disabledHosts, window.location.host])
  );
};

export const updateDomainsOnLocalStorage = (storageKey: string) => {
  const values = localStorage.getItem(storageKey);
  const disabledHosts = values ? JSON.parse(values) : [];
  localStorage.setItem(
    storageKey,
    JSON.stringify([...disabledHosts, window.location.host])
  );
};

export const getIsMenuEnabled = () =>
  getIsEnabled(storageDisabledOverlayDomainsKey);

export const getIsShortcutEnabled = () =>
  getIsEnabled(storageDisabledShortcutDomainsKey);

export const getIsReplyOverlayEnabled = () =>
  getIsEnabled(storageDisabledReplyOverlayDomainsKey);
