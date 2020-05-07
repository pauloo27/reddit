import fetch from 'node-fetch';

export interface VideoInfo {
  fallbackUrl: string;
  isVideo: boolean;
  url: string;
  duration: number;
}

export async function extractVideoInfo(url: string) : Promise<VideoInfo> {
  let fetchUrl = url.split('?')[0];
  if (!fetchUrl.endsWith('.json')) fetchUrl += '.json';

  const json = await (await fetch(fetchUrl)).json();

  const postData = json[0].data.children[0].data;
  const mediaData = postData.media.reddit_video;

  const info: VideoInfo = {
    fallbackUrl: mediaData.fallback_url,
    url: postData.url,
    isVideo: postData.is_video,
    duration: mediaData.duration,
  };

  return info;
}

export function extractAudioUrl(videoInfo : VideoInfo) : string {
  return `${videoInfo.url}/audio`;
}

export function extractVideoUrl(videoInfo: VideoInfo) : string {
  return videoInfo.fallbackUrl;
}

