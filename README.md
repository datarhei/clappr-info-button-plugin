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
					{id: 'about', label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin'},
		]
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

