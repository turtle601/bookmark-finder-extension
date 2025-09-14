export const getSafeHostname = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;

  // 크롬 내부 URL 체크
  if (url.startsWith('chrome://') || url.startsWith('about:')) {
    return null;
  }

  // 정규표현식으로 hostname 추출
  const match = url.match(/^(?:https?:\/\/)?([^\/\?:]+)/);
  return match ? match[1].split(':')[0] : null;
};

export const getFaviconUrl = (url: string): string => {
  const hostname = getSafeHostname(url);
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
};
