export const removeHttpProtocol = (url: string) => {
  return url.replace("https://", "").replace("http://", "");
};
