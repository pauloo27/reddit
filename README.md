<img alt="Reddit Logo" src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/58/Reddit_logo_new.svg/1200px-Reddit_logo_new.svg.png" height="300px" />

# Reddit Downloader
Download Reddit videos with sound using a NodeJS CLI with ffmpeg.

## How to use
First, make sure you have ffmpeg installed.

### Build the core
In the `core` folder, run `yarn install` to install the dependencies, then `yarn build` to build the module.

### Build the CLI
In the `cli` folder, run `yarn install` to install the dependencies, then `yarn build` to build the module.

### Run it
After bulding both the core and the CLI, in the `cli` folder, run: `node build/index.js download <url>`.

## LICENSE
<img src="https://i.imgur.com/AuQQfiB.png" alt="GPL Logo" height="100px" />

[GPL-2.0](./LICENSE)

This program is free software; you can redistribute it and/or modify 
it under the terms of the GNU General Public License as published by 
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

