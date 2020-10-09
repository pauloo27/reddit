import fetch from 'node-fetch';

export const resolutions = [
  '1080',
  '720',
  '480',
  '360',
  '240',
  '96',
];

export interface VideoInfo {
  fallbackUrl: string;
  isVideo: boolean;
  url: string;
  isMP4: boolean;
  duration: number;
}

export async function extractVideoInfo(url: string) : Promise<VideoInfo> {
  let fetchUrl = url.split('?')[0];
  if (!fetchUrl.endsWith('.json')) fetchUrl += '.json';

  const json = await (await fetch(fetchUrl)).json();

  const postData = json[0].data.children[0].data;
  const mediaData = postData.media.reddit_video;
  const fallbackUrl = mediaData.fallback_url.split('?')[0];

  const info: VideoInfo = {
    fallbackUrl,
    isMP4: fallbackUrl.endsWith('.mp4'),
    url: postData.url,
    isVideo: postData.is_video,
    duration: mediaData.duration,
  };

  return info;
}

export function extractAudioUrl(videoInfo: VideoInfo) : string {
  return videoInfo.isMP4 ? `${videoInfo.url}/DASH_audio.mp4` : `${videoInfo.url}/audio`;
}

export async function hasAudioTrack(videoInfo: VideoInfo) : Promise<boolean> {
  const res = await fetch(extractAudioUrl(videoInfo));
  return res.status === 200;
}

export function getBestResolution(videoInfo: VideoInfo) : string {
  return videoInfo.fallbackUrl.split('_')[1].split('.')[0];
}

export function getAvailableResolutions(videoInfo: VideoInfo) : Array<string> {
  return resolutions.slice(resolutions.indexOf(getBestResolution(videoInfo)));
}

export function extractVideoUrl(videoInfo: VideoInfo, resolution?: string) : string {
  if (resolution === undefined) return videoInfo.fallbackUrl;
  if (videoInfo.isMP4) resolution += '.mp4';
  return `${videoInfo.fallbackUrl.split('_')[0]}_${resolution}`;
}
