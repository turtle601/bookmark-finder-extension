export const getFaviconkitIcon = (url: string, size: number) => {
  return `https://api.faviconkit.com/${new URL(url).hostname}/${size}`;
};
