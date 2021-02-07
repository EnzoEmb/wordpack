
<p align="center">
  <img alt="word-pack" src="https://i.imgur.com/X4plCaU.png">

<p align="center">
Wordpress Theme Boilerplate using webpack
</p>


###  Tasks
``` bash
# Watch js and assets
npm run watch

# Build assets for production
npm run prod
```

### Features
📦 Only serve the JS needed per page using webpack split chunks<br>
🧦 Put JS scripts in footer and defer<br>
📂 Optimize image sizes<br>
🔩 Convert theme images to .webp<br>
💄 Compile and autoprefix SASS<br>
📑 Clean wordpress scripts and emoji tags<br>
🥞 THEMEPATH and AJAX_URL variables<br>
🍬 Clean and editable structure<br>
🧩 Example of secure Ajax with nonce<br>
🎃 Cache bust script and styles enqueued<br>

#### To do
Extract critical CSS


### Guide
<details>
  <summary>How to enqueue scripts</summary>
  To enqueue scripts, create an entry on webpack.config.js and then enqueue it on functions.php using the wordpack_load_chunk function with the same name as the entry, be sure to use a conditional when enqueuing it.
</details>