# DS Compare Screenshots

## Init
We will use the default Chrome browser for testing, so we skip downloading Chromium (Danske Spil will not execute Chromium anyways).

In your terminal, insert this:

```
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm install
```

## Usage
See the various scripts in `./package.json`. For example, to generate screenshots for TivoliCasino, run:

```
npm run tivolicasino
```

## Result
The resulting HTML pages and images can be found in the `./export` folder. 
