import { Events, Styler, UICorePlugin, UIContainerPlugin, Utils, template } from 'clappr';
import pluginHtml from './public/info-button.html';
import pluginStyle from './public/style.scss';

const DEFAULT_INFO_ITEMS = [
    { label: 'About', link: 'https://github.com/datarhei/clappr-info-button-plugin' },
];

const DEFAULT_INFO_TITLE = 'Info';

const DEFAULT_INFO_BUTTON = {
    title: DEFAULT_INFO_TITLE
};

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
        this.listenTo(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED, this.reload);
        this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.render);
        this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_HIDE, this.hideInfoButtonMenu);
    }

    unBindEvents() {
        this.stopListening(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED);
        this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_RENDERED);
        this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_HIDE);
    }

    reload() {
        this.unBindEvents();
        this.bindEvents();
    }

    shouldRender() {
        if (!this.core.activeContainer) {
            return false;
        }

        return true;
    }

    render() {
        const cfg = this.core.options.infoButtonConfig || {};

        if (!this.lang) {
            this.lang = cfg.language || this.language();
        }

        if (!this.strings) {
            this.strings = cfg.strings || {};
        }

        if (!this.infoButton) {
            this.infoButton = cfg.button || DEFAULT_INFO_BUTTON;
        }

        if (!this.infoTitle) {
            this.infoTitle = cfg.title || DEFAULT_INFO_TITLE;
        }

        if (!this.infoItems) {
            this.infoItems = cfg.options || DEFAULT_INFO_ITEMS;
        }

        this.selectTranslation();

        for(let i = 0; i < this.infoItems.length; i++) {
            this.infoItems[i].id = 'info' + i;
        }

        if (this.shouldRender()) {
            let style = Styler.getStyleFor(pluginStyle, { baseUrl: this.core.options.baseUrl });

            this.$el.html(this.template({ 'button': this.infoButton, 'items': this.infoItems, 'title': this.getTitle() }));
            this.$el.append(style);

            this.core.mediaControl.$('.media-control-right-panel').append(this.el);
        }

        return this;
    }

    language() { return this.core.options.language || Utils.getBrowserLanguage() }

    selectTranslation() {
        let t = null;

        if(this.lang in this.strings) {
            t = this.strings[this.lang];
        }

        if(t == null) {
            let matches = this.lang.match(/^([a-z]+)-[A-Z]+$/);
            if(matches !== null) {
                let lang = matches[1];

                if(lang in this.strings) {
                    t = this.strings[lang];
                }
            }
        }

        if(t == null) {
            return;
        }

        if('options' in t) {
            this.infoItems = t.options;
        }

        if('title' in t) {
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

    hideInfoButtonMenu() {
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
