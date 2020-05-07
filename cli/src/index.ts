import cli from 'commander';
import {
  extractVideoInfo, extractAudioUrl, extractVideoUrl, hasAudioTrack,
} from 'reddit-downloader-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

cli.command('extract <url>').description('Extract the media urls from a Reddit video')
  .action(async (url) => {
    console.log(`Extracting ${url}`);
    const videoInfo = await extractVideoInfo(url);

    console.log(`Video track: ${extractVideoUrl(videoInfo)}`);

    if (await hasAudioTrack(videoInfo)) {
      console.log(`Audio track: ${extractAudioUrl(videoInfo)}`);
    } else {
      console.log('No audio found');
    }
  });

cli.command('download <url>').description('Download a Reddit video with Audio')
  .action(async (url) => {
    const videoInfo = await extractVideoInfo(url);
    const id = videoInfo.url.split('/')[3];

    if (!fs.existsSync('downloads')) fs.mkdirSync('downloads');

    const outputFile = `downloads/${id}.mp4`;
    const command = ffmpeg();

    command.output(outputFile).addInput(extractVideoUrl(videoInfo));

    if (await hasAudioTrack(videoInfo)) {
      console.log('Found audio track...');
      command.addInput(extractAudioUrl(videoInfo));
    }

    command.on('error', (err) => {
      console.error('Cannot download video: ');
      console.error(err);
    });

    command.on('end', () => {
      console.log(`Saved to ${outputFile}`);
    });

    command.on('progress', (data) => {
      console.log(`Status ${data.percent.toFixed(1)}%`);
    });

    console.log('Downloading the video...');
    command.run();
  });

cli.on('--help', () => {
  const pathToIndex = process.argv[1].substring(process.cwd().length + 1);

  console.log();
  console.log('Examples:');
  console.log(`  $ node ${pathToIndex} download https://www.reddit.com/r/arduino/comments/gf4b6l/forgive_me_lord_for_i_have_sinned/`);
  console.log(`  $ node ${pathToIndex} extract https://www.reddit.com/r/arduino/comments/gf4b6l/forgive_me_lord_for_i_have_sinned/`);
});


cli.parse(process.argv);
