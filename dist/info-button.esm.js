import { template, Events, $, Utils, UIContainerPlugin } from '@clappr/core';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var pluginHtml = "<% if (visible) { %>\n<button data-info-button-button>\n\t<% if (button) { %>\n\t\t<% if (button.image) { %>\n\t\t\t<img src=\"<%= button.image %>\" title=\"<%= button.title %>\">\n\t\t<% } else if (button.title) { %>\n\t\t\t<%= button.title %>\n\t\t<% }; %>\n\t<% } else if (title) { %>\n\t\t<%= title %>\n\t<% }; %>\n</button>\n<% } %>\n<ul class=\"<% if (!visible) { %>container<% } %>\">\n\t<% if (title) { %>\n\t<li data-title><%= title %></li>\n\t<% }; %>\n\t<% for (var i = 0; i < items.length; i++) { %>\n\t\t<li><a href=\"#\" data-info-button-select=\"<%= items[i].id %>\"><%= items[i].label %></a></li>\n\t<% }; %>\n</ul>\n";

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".info-button[data-info-button] {\n  float: right;\n  position: relative;\n  height: 100%;\n}\n.info-button[data-info-button] button {\n  background-color: transparent;\n  color: #fff;\n  font-family: Roboto, \"Open Sans\", Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  border: none;\n  font-size: 10px;\n  height: 100%;\n  cursor: pointer;\n}\n.info-button[data-info-button] button img {\n  height: 22px;\n}\n.info-button[data-info-button] button:hover {\n  color: #c9c9c9;\n}\n.info-button[data-info-button] button.changing {\n  -webkit-animation: pulse 0.5s infinite alternate;\n}\n.info-button[data-info-button] > ul {\n  list-style-type: none;\n  position: absolute;\n  bottom: 100%;\n  border: 1px solid black;\n  display: none;\n  background-color: #e6e6e6;\n  white-space: nowrap;\n}\n.info-button[data-info-button] > ul.container {\n  bottom: 50%;\n  right: 5px;\n  z-index: 1000;\n}\n.info-button[data-info-button] li {\n  font-size: 10px;\n}\n.info-button[data-info-button] li[data-title] {\n  background-color: #c3c2c2;\n  padding: 5px;\n}\n.info-button[data-info-button] li a {\n  color: #444;\n  padding: 2px 10px;\n  display: block;\n  text-decoration: none;\n}\n.info-button[data-info-button] li a:hover {\n  background-color: #555;\n  color: white;\n}\n.info-button[data-info-button] li a:hover a {\n  color: white;\n  text-decoration: none;\n}\n.info-button[data-info-button] li.current a {\n  color: #f00;\n}\n\n@-webkit-keyframes pulse {\n  0% {\n    color: #fff;\n  }\n  50% {\n    color: #ff0101;\n  }\n  100% {\n    color: #B80000;\n  }\n}";
styleInject(css_248z);

var _icon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDE1aC0ydi02aDJ2NnptMC04aC0yVjdoMnYyeiIvPjwvc3ZnPg==';

var icon_disabled = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBmaWxsPSIjRkYwMDAwIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTVoLTJ2LTZoMnY2em0wLThoLTJWN2gydjJ6Ii8+PC9zdmc+';

var DEFAULT_INFO_ITEMS = [{
  label: 'About',
  link: 'https://github.com/datarhei/clappr-info-button-plugin'
}];
var DEFAULT_INFO_TITLE = 'Info';
var DEFAULT_INFO_BUTTON = {
  title: DEFAULT_INFO_TITLE
};

var InfoButton = /*#__PURE__*/function (_UIContainerPlugin) {
  _inherits(InfoButton, _UIContainerPlugin);

  var _super = _createSuper(InfoButton);

  function InfoButton(container) {
    var _this;

    _classCallCheck(this, InfoButton);

    _this = _super.call(this, container);

    _this.configure();

    return _this;
  }

  _createClass(InfoButton, [{
    key: "supportedVersion",
    get: function get() {
      return {
        min: "0.4.18"
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'info-button';
    }
  }, {
    key: "template",
    get: function get() {
      return template(pluginHtml);
    }
  }, {
    key: "attributes",
    get: function get() {
      return {
        'class': this.name,
        'data-info-button': ''
      };
    }
  }, {
    key: "events",
    get: function get() {
      return {
        'click [data-info-button-select]': 'onInfoButton',
        'click [data-info-button-button]': 'onShowInfoButtonMenu'
      };
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.listenTo(this.container, Events.CONTAINER_OPTIONS_CHANGE, this.reload);
      this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_SHOW, this.render);
      this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_HIDE, this.hideInfoButtonMenu);
    }
  }, {
    key: "reload",
    value: function reload() {
      this.$el.remove();
      this.configure();
    }
  }, {
    key: "configure",
    value: function configure() {
      var cfg = this.options.infoButtonConfig || {};
      this.visible = true;

      if ('visible' in cfg) {
        this.visible = !!cfg.visible;
      }

      this.lang = this.language();

      if ('language' in cfg) {
        this.lang = cfg.language;
      }

      this.strings = {};

      if ('strings' in cfg) {
        this.strings = cfg.strings;
      }

      this.infoButton = DEFAULT_INFO_BUTTON;

      if ('button' in cfg) {
        this.infoButton = cfg.button;
      }

      this.infoTitle = DEFAULT_INFO_TITLE;

      if ('title' in cfg) {
        this.infoTitle = cfg.title;
      }

      this.infoItems = DEFAULT_INFO_ITEMS;

      if ('options' in cfg) {
        this.infoItems = cfg.options;
      }

      this.selectTranslation();

      for (var i = 0; i < this.infoItems.length; i++) {
        this.infoItems[i].id = 'info' + i;
      }

      this.$el.html(this.template({
        'visible': this.visible,
        'button': this.infoButton,
        'items': this.infoItems,
        'title': this.getTitle()
      }));
      this.rendered = false;
      return;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.rendered === true) {
        return;
      }

      this.rendered = true;

      if (this.visible === true) {
        $('.media-control-right-panel').append(this.$el);
      } else {
        this.container.$el.append(this.$el);
      }
    }
  }, {
    key: "language",
    value: function language() {
      return this.options.language || Utils.getBrowserLanguage();
    }
  }, {
    key: "selectTranslation",
    value: function selectTranslation() {
      var t = null;

      if (this.lang in this.strings) {
        t = this.strings[this.lang];
      }

      if (t == null) {
        var matches = this.lang.match(/^([a-z]+)-[A-Z]+$/);

        if (matches !== null) {
          var lang = matches[1];

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
  }, {
    key: "onInfoButton",
    value: function onInfoButton(event) {
      var id = event.target.dataset.infoButtonSelect;

      for (var i in this.infoItems) {
        if (this.infoItems[i].id != id) {
          continue;
        }

        if (typeof this.infoItems[i].link === 'function') {
          this.infoItems[i].link();
        } else {
          window.open(this.infoItems[i].link);
        }

        break;
      }

      this.toggleContextMenu();
      event.stopPropagation();
      return false;
    }
  }, {
    key: "onShowInfoButtonMenu",
    value: function onShowInfoButtonMenu() {
      this.toggleContextMenu();
    }
  }, {
    key: "hideInfoButtonMenu",
    value: function hideInfoButtonMenu() {
      this.$('.info-button ul').hide();
    }
  }, {
    key: "showInfoButtonMenu",
    value: function showInfoButtonMenu() {
      this.$('.info-button ul').show();
    }
  }, {
    key: "toggleContextMenu",
    value: function toggleContextMenu() {
      this.$('.info-button ul').toggle();
    }
  }, {
    key: "buttonElement",
    value: function buttonElement() {
      return this.$('.info-button button');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.infoTitle;
    } // PluginControl interface

  }, {
    key: "pluginControl",
    value: function pluginControl() {
      var self = this;
      return {
        icon: function icon() {
          if (this.toggled()) {
            return _icon;
          }

          return icon_disabled;
        },
        name: function name() {
          return self.infoTitle;
        },
        toggle: function toggle() {
          self.toggleContextMenu();
          return this.toggled();
        },
        toggled: function toggled() {
          if (self.$('.info-button ul').css('display') === 'none') {
            return false;
          }

          return true;
        }
      };
    }
  }], [{
    key: "version",
    get: function get() {
      return "0.2.10";
    }
  }]);

  return InfoButton;
}(UIContainerPlugin);

export default InfoButton;
