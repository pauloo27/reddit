import cli from 'commander';
import { extractVideoInfo, extractAudioUrl, extractVideoUrl } from 'reddit-downloader-core';

cli.command("extract <url>").description("Extract the media urls from a Reddit video")
  .action(async (url) => {
    console.log("Extracting " + url);
    const videoInfo = await extractVideoInfo(url);
    console.log("Audio track: " + extractAudioUrl(videoInfo));
    console.log("Video track: " + extractVideoUrl(videoInfo));
  });

cli.on("--help", () => {
  const pathToIndex = process.argv[1].substring(process.cwd().length + 1);

  console.log();
  console.log("Examples:");
  console.log(`  $ node ${pathToIndex} download https://www.reddit.com/r/arduino/comments/gf4b6l/forgive_me_lord_for_i_have_sinned/`);
});


cli.parse(process.argv);
