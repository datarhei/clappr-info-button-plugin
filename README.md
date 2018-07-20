# Clappr Info Button Plugin

![Snapshot](../master/snapshot.png)

## Usage

Add both Clappr and Info Button plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
  <script type="text/javascript" src="dist/info-button.js"></script>
</head>
```

Then just add `InfoButton` into the list of plugins of your player instance:

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.m3u8",
  plugins: [InfoButton]
});
```

You can also customize the options and title:

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.m3u8",
  plugins: [InfoButton],
  levelSelectorConfig: {
    title: 'Info',
    options: [
          {id: 'about', label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin'},
    ]
  },
});
```
