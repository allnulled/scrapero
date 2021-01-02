# scrapero

Starts express server to put JSON data into filesystem.

Resilient way to run web scraps with minimal supervision.

## Installation

`$ npm i -s scrapero`

Or globally:

`$ npm i -g scrapero`

## Usage

### API usage (server)

```js
const server = require("scrapero").start(8080);
```

### CLI usage (server)

```
$ scrapero --port 9898 --storage ./data
```

### Browser usage (client)

1. Download [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ca).
2. Copy and paste script at [`/browser.js`](https://github.com/allnulled/scrapero/blob/main/browser.js) in a new xMonkey script.
3. Add the scraps you want to carry on.
4. Browse to your target URLs.
5. Click the top button which says "Scrap it".

*Happy scrapping!*

## License

WTFPL or 'do What The Fuck you want to Public License'.