import { baseUrl, domain, portName } from "../../config";

console.log("This is the background page.");
console.log("Put the background scripts here.");

const onInstall = (object: chrome.runtime.InstalledDetails) => {
  // Add context menu if needed
  chrome.contextMenus.create({
    id: "my-app-context-menu",
    title: "Action name",
    contexts: ["selection"],
  });

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    /*
      It might be a good idea to open a specific web page on install,
      to show the user how to use the extension.
    */
    chrome.tabs.create({ url: `${baseUrl}/extension/welcome` }, function (tab) {
      console.log(`New tab launched with ${baseUrl}/welcome`);
    });
  }
};

chrome.runtime.onInstalled.addListener(onInstall);

chrome.commands.onCommand.addListener((command, tab) => {
  console.log(`Command: ${command}`, { tab });

  if (command === "open-popup" && tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "open-popup",
    });

    /*
      Send the ever "user-status" to the content script
    */
    const onUserStatus = ({ data }: { data: unknown }) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "user-status",
          data,
        });
      }
    };
    getUserStatus({ callback: onUserStatus });
  }
});

type GetUserStatusArg = {
  callback: ({ data }: { data: unknown }) => void;
};

const getUserStatus = ({ callback }: GetUserStatusArg) => {
  /*
    Send a request to the server to get the user status
    including the cookies for your domain.
    This way we can check if the user is logged in or not.
  */
  chrome.cookies.getAll({ domain: domain }).then((cookies) => {
    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const params = {
      headers: {
        cookies: cookieString,
      },
      method: "GET",
    };

    fetch(`${baseUrl}/api/user`, params)
      .then((response) => response.json())
      .then((data) => {
        callback({
          data,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
};

type TrackExtensionEvent = {
  event: string;
  icon: string;
  notify: boolean;
  tags?: Record<string, string>;
};

const track = ({ event, icon, notify, tags = {} }: TrackExtensionEvent) => {
  chrome.cookies.getAll({ domain: domain }).then((cookies) => {
    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const params = {
      headers: {
        cookies: cookieString,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ event, icon, notify, tags }),
    };

    fetch(`${baseUrl}/api/track`, params);
  });
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu item clicked");
  console.log("Info: ", info);
  console.log("Tab: ", tab);

  // On context menu item click, do something...
});

/*
  Listener of the messages sent to the background script
  by the content script or the popup.
*/
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(
    "New Message",
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension",
    request
  );

  if (request.type === "get_os") {
    chrome.runtime.getPlatformInfo(function (info) {
      if (sender?.tab?.id) {
        chrome.tabs.sendMessage(sender.tab.id, { os: info.os });
      }

      if (!sender.tab) {
        sendResponse({ os: info.os });
      }
    });
  }

  if (request.type === "get_user_status") {
    const onUserStatus = ({ data }: { data: unknown }) => {
      const responseObject = {
        type: "user-status",
        data,
      };
      if (sender?.tab?.id) {
        chrome.tabs.sendMessage(sender.tab.id, responseObject);
      }

      if (!sender.tab) {
        sendResponse(responseObject);
      }
    };
    getUserStatus({ callback: onUserStatus });
  }
});

// Listener for the popup and the overlay
chrome.runtime.onConnect.addListener(function (port) {
  // assert on the origin of the port, if the port.name is different,
  // the event is not from the expected source
  console.assert(port.name === portName);

  port.onMessage.addListener(function (msg) {
    console.log("new message", msg);

    if (msg.type === "get_os") {
      chrome.runtime.getPlatformInfo(function (info) {
        port.postMessage({
          os: info.os,
        });
      });
    }

    if (msg.type === "get_user_status") {
      const onUserStatus = ({ data }: { data: unknown }) => {
        const responseObject = {
          type: "user-status",
          data,
        };
        port.postMessage(responseObject);
      };
      getUserStatus({ callback: onUserStatus });
    }

    if (msg.type === "track") {
      track({
        event: msg.data.event,
        icon: msg.data.icon,
        notify: msg.data.notify,
        tags: msg.data.tags,
      });
    }

    if (msg.type === "open-url") {
      chrome.tabs.create({ url: msg.url });
    }
  });
});
