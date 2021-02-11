
<p align="center">
  <img alt="word-pack" src="https://i.imgur.com/X4plCaU.png">

<p align="center">
Wordpress Theme Boilerplate using Webpack throught Laravel Mix
</p>


###  Tasks
``` bash
# Watch assets
npm run watch

# Build assets for production
npm run prod
```
<details>
  <summary>More tasks</summary>
  
``` bash
# Watch images
npm run watch:images

# Watch webpack js and css
npm run watch:mix

# Optimize images
npm run prod:images

# Run webpack js and css
npm run prod:mix


```
</details>

### Features
📦 Only serve the JS needed per page using webpack split chunks and conditional enqueuing<br>
🧦 Put JS scripts in footer and defer<br>
📂 Optimize images<br>
🔩 Convert theme images to .webp<br>
💄 Compile and autoprefix SASS<br>
📑 Clean wordpress scripts and emoji tags<br>
🥞 THEMEPATH and AJAX_URL variables<br>
🍬 Clean and editable structure<br>
🧩 Example of secure Ajax with nonce<br>
🎃 Cache bust of scripts and styles enqueued<br>

### Guide
<details>
  <summary>How to enqueue scripts?</summary>
  To enqueue scripts, create an entry on webpack.config.js and then enqueue it on functions.php using the wordpack_load_chunk function with the same name as the entry, be sure to use a conditional when enqueuing it.
</details>
<details>
  <summary>How does the image optimization works?</summary>
  While in watching mode, every image you put into "src/img" folder gets an optimized version in "assets/img" also a WEBP version is created
</details>