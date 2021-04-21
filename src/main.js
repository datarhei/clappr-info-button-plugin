import { Events, Styler, UIContainerPlugin, Utils, template, $ } from '@clappr/core';
import pluginHtml from './public/info-button.html';
import pluginStyle from './public/style.scss';
import icon from './public/icon.svg';
import icon_disabled from './public/icon_disabled.svg';

const DEFAULT_INFO_ITEMS = [
	{ label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin' },
];

const DEFAULT_INFO_TITLE = 'Info';

const DEFAULT_INFO_BUTTON = {
	title: DEFAULT_INFO_TITLE
};

export default class InfoButton extends UIContainerPlugin {
	constructor(container) {
		super(container);
		this.configure();
	}

	static get version() {
		return VERSION;
	}

	get supportedVersion() { return { min: CLAPPR_CORE_VERSION }; }

	get name() {
		return 'info_button';
	}

	get template() {
		return template(pluginHtml);
	}

	get attributes() {
		return {
			'class': this.name,
			'data-info-button': ''
		};
	}

	get events() {
		return {
			'click [data-info-button-select]': 'onInfoButton',
			'click [data-info-button-button]': 'onShowInfoButtonMenu'
		};
	}

	bindEvents() {
		this.listenTo(this.container, Events.CONTAINER_OPTIONS_CHANGE, this.reload);
		this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_SHOW, this.render);
		this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_HIDE, this.hideInfoButtonMenu);
	}

	reload() {
		this.$el.remove();
		this.configure();
	}

	configure() {
		const cfg = this.options.infoButtonConfig || {};

		this.visible = true;
		if ( 'visible' in cfg) {
			this.visible = !!(cfg.visible);
		}

		this.lang = this.language();
		if ( 'language' in cfg) {
			this.lang = cfg.language;
		}

		this.strings = {};
		if ( 'strings' in cfg) {
			this.strings = cfg.strings;
		}

		this.infoButton = DEFAULT_INFO_BUTTON;
		if ( 'button' in cfg) {
			this.infoButton = cfg.button;
		}

		this.infoTitle = DEFAULT_INFO_TITLE;
		if ( 'title' in cfg) {
			this.infoTitle = cfg.title;
		}

		this.infoItems = DEFAULT_INFO_ITEMS;
		if ( 'options' in cfg) {
			this.infoItems = cfg.options;
		}

		this.selectTranslation();

		for (let i = 0; i < this.infoItems.length; i++) {
			this.infoItems[i].id = 'info' + i;
		}

		let style = Styler.getStyleFor(pluginStyle, { baseUrl: this.options.baseUrl });

		this.$el.html(this.template({ 'visible': this.visible, 'button': this.infoButton, 'items': this.infoItems, 'title': this.getTitle() }));
		this.$el.append(style);

		this.rendered = false;

		return;
	}

	render() {
		if (this.rendered === true) {
			return;
		}

		this.rendered = true;

		if (this.visible === true) {
			$('.media-control-right-panel').append(this.$el);
		}
		else {
			this.container.$el.append(this.$el);
		}
	}

	language() {
		return this.options.language || Utils.getBrowserLanguage();
	}

	selectTranslation() {
		let t = null;

		if (this.lang in this.strings) {
			t = this.strings[this.lang];
		}

		if (t == null) {
			let matches = this.lang.match(/^([a-z]+)-[A-Z]+$/);
			if (matches !== null) {
				let lang = matches[1];

				if (lang in this.strings) {
					t = this.strings[lang];
				}
			}
		}

		if (t == null) {
			return;
		}

		if ('options' in t) {
			this.infoItems = t.options;
		}

		if ('title' in t) {
			this.infoTitle = t.title;
			this.infoButton.title = t.title;
		}

		return;
	}

	onInfoButton(event) {
		let id = event.target.dataset.infoButtonSelect;

		for (let i in this.infoItems) {
			if (this.infoItems[i].id != id) {
				continue;
			}

			if (typeof this.infoItems[i].link === 'function') {
				this.infoItems[i].link();
			}
			else {
				window.open(this.infoItems[i].link);
			}

			break;
		}

		this.toggleContextMenu();
		event.stopPropagation();

		return false;
	}

	onShowInfoButtonMenu() {
		this.toggleContextMenu();
	}

	hideInfoButtonMenu() {
		this.$('.info_button ul').hide();
	}

	showInfoButtonMenu() {
		this.$('.info_button ul').show();
	}

	toggleContextMenu() {
		this.$('.info_button ul').toggle();
	}

	buttonElement() {
		return this.$('.info_button button');
	}

	getTitle() {
		return this.infoTitle;
	}

	// PluginControl interface
	pluginControl() {
		let self = this;

		return {
			icon: function() {
				if (this.toggled()) {
					return icon;
				}

				return icon_disabled;
			},
			name: function() {
				return self.infoTitle;
			},
			toggle: function() {
				self.toggleContextMenu();
				return this.toggled();
			},
			toggled: function() {
				if (self.$('.info_button ul').css('display') === 'none') {
					return false;
				}

				return true;
			}
		};
	}
}
