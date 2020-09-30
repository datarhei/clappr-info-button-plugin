# Clappr Info Button Plugin

![Snapshot](../master/snapshot.png)

## Usage

Add both Clappr and Info Button plugin scripts to your HTML:

```html
<head>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
    <script type="text/javascript" src="dist/info-button.min.js"></script>
</head>
```

Then just add `InfoButton` into the list of plugins of your player instance:

```javascript
var player = new Clappr.Player({
    source: "http://your.video/here.m3u8",
    plugins: [InfoButton]
});
```

You can also customize the button, options, and title:

```javascript
var player = new Clappr.Player({
    source: "http://your.video/here.m3u8",
    plugins: [InfoButton],
    infoButtonConfig: {
        button: {
            image: 'info-button.png'
        },
        title: 'Info',
        options: [
            {label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin'},
            {label: 'Hello', link: function() { alert('Hello!'); }}
        ]
    },
});
```

The provided links in the options will be openend in a new window/tab. If the link is a function, the function will be executed and no
new window/tab will be opened.

In order to support different languages, you have the possibility to provide translations for the info button. In `infoButtonConfig` you
add a `strings` object which has the locale of the language as key and an object with `title` and `options` as value, e.g. to provide
a German translation:

```javascript
var player = new Clappr.Player({
    source: "http://your.video/here.m3u8",
    plugins: [InfoButton],
    infoButtonConfig: {
        button: {
            image: 'info-button.png'
        },
        title: 'Info',
        options: [
            {label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin'},
        ],
        strings: {
            'de': {
                title: 'Informationen',
                options: [
                    {label: 'Über', link: 'https://github.com/datarhei/clappr-info-button-plugin'}
                ]
            }
        }
    },
});
```

Instead of simply `de` you could use `de-DE`, but then this translation will only be used if the current locale matches exactly. With only `de`
all `de-*` variants will cause this translation to be used.

If a translation for the current locale is not found, the defaults (as given in `title` and `options`) will be used instead.

In case you want to override the language of the player, add the key `language` to `infoButtonConfig` with a matching locale from your provided
translations:

```javascript
var player = new Clappr.Player({
    source: "http://your.video/here.m3u8",
    plugins: [InfoButton],
    infoButtonConfig: {
        button: {
            image: 'info-button.png'
        },
        title: 'Info',
        options: [
            {label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin'},
        ],
        language: 'de',
        strings: {
            'de': {
                title: 'Informationen',
                options: [
                    {label: 'Über', link: 'https://github.com/datarhei/clappr-info-button-plugin'}
                ]
            }
        }
    },
});
```

## How to hack

Clone this repository

```bash
git clone https://github.com/datarhei/clappr-info-button-plugin.git
cd clappr-info-button-plugin
```

Install all dependencies

```bash
npm install
```

If something doesn't work, try to delete `node_modules` and `package-lock.json`.

Modify and build the code

```bash
# hack, hack, hack

# check the JS-syntax and fix it (optionally)
npm run lint
npm run lint:fix

# build the unminified version
npm run build

# build the minified version
npm run release

# find the builds in dist/
```

