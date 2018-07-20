import { Events, Styler, UICorePlugin, template } from 'clappr';
import pluginHtml from './public/info-button.html';
import pluginStyle from './public/style.scss';

const DEFAULT_INFO_ITEMS = [
	{ id: 'about', label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin' },
];

const DEFAULT_INFO_TITLE = 'Info';

export default class InfoButton extends UICorePlugin {

	static get version() {
		return VERSION;
	}

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
		this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.reload);
		this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.render);
		this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_HIDE, this.hideInfoButtonMenu);
	}

	unBindEvents() {
		this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED);
		this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_RENDERED);
		this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_HIDE);
	}

	reload() {
		this.unBindEvents();
		this.bindEvents();
	}

	shouldRender() {
		if (!this.core.getCurrentContainer()) {
			return false;
		}

		return true;
	}

	render() {
		//console.log('InfoButtonPlugin#render()');
		const cfg = this.core.options.infoButtonConfig || {};

		if (!this.infoTitle) {
			this.infoTitle = cfg.title || DEFAULT_INFO_TITLE;
		}

		if (!this.infoItems) {
			this.infoItems = cfg.options || DEFAULT_INFO_ITEMS;
		}

		if (this.shouldRender()) {
			let style = Styler.getStyleFor(pluginStyle, { baseUrl: this.core.options.baseUrl });

			this.$el.html(this.template({ 'items': this.infoItems, 'title': this.getTitle() }));
			this.$el.append(style);
			this.core.mediaControl.$('.media-control-right-panel').append(this.el);
		}

		return this;
	}

	onInfoButton(event) {
		//console.log('InfoButtonPlugin#onInfoButton()', event);

		let id = event.target.dataset.infoButtonSelect;

		for (let i in this.infoItems) {
			if (this.infoItems[i].id != id) {
				continue;
			}

			window.open(this.infoItems[i].link);
			break;
		}

		this.toggleContextMenu();
		event.stopPropagation();

		return false;
	}

	onShowInfoButtonMenu() {
		this.toggleContextMenu();
	}

	hideSelectLevelMenu() {
		this.$('.info_button ul').hide();
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
}