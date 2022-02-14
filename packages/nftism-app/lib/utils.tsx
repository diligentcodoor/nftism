export function numberWithCommas(x: number | string) {
  const _x = typeof x === "string" ? x : x.toString();
  return _x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function humanReadableDate(date: string): string {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" } as {
    year: "numeric";
    month: "long";
    day: "numeric";
  };
  return new Date(date).toLocaleDateString(undefined, dateOptions);
}

export function buildVideoLink(link: string): string {
  const url = new URL(link);
  if (url.hostname.includes("youtube")) {
    return buildYoutubeLink(link);
  } else if (url.hostname.includes("vimeo")) {
    return buildVimeoLink(link);
  } else {
    return "";
  }
}

function buildYoutubeLink(link: string): string {
  const url = new URL(link);
  const videoId = url.searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}?feature=oembed`;
}

function buildVimeoLink(link: string): string {
  const url = new URL(link);
  const videoId = url.pathname.slice(1);
  return `https://player.vimeo.com/video/${videoId}?h=6f47aa8732&dnt=1&app_id=122963`;
}

export function extractURL(text: string): string | undefined {
  const urlMatches = text.match(/\bhttps?:\/\/\S+/gi);
  if (!urlMatches) return;
  return urlMatches[0].replace('"', "").replace("”", "").replace("″", "");
}
