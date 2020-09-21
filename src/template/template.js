"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var selector_1 = require("../model/selector");
var delete_selectors_1 = require("../model/delete.selectors");
var utils_1 = require("../utils");
var Template = /** @class */ (function () {
    function Template() {
        this.indexPage = ""; // 首页
        this.listPage = ""; // list 页面
        this.articlePage = ""; // 文章页
        this.navGroup = [];
        this.titleGroup = [];
        this.contentGroup = [];
        this.atagGroup = [];
        this.removeGroup = [];
    }
    /**
     * 绘制整个选择器
     */
    Template.prototype.repaint = function () {
        this.paint(this.navGroup);
        this.paint(this.titleGroup);
        this.paint(this.contentGroup);
        this.paint(this.atagGroup);
        this.paint(this.removeGroup);
    };
    Template.prototype.paint = function (group) {
        group.forEach(function (selector) { return selector.select(); });
    };
    Template.prototype.reload = function () {
        utils_1.Utils.loadDataToTemp(this);
    };
    Template.prototype.addSelector = function (hoveredSelector) {
        var newSelector;
        if (hoveredSelector.group == "removeGroup") {
            newSelector = new delete_selectors_1.DeleteSelector(hoveredSelector.group);
        }
        else {
            newSelector = new selector_1.Selector(hoveredSelector.group);
        }
        hoveredSelector.pack();
        newSelector.setElement(hoveredSelector.getElement());
        this[hoveredSelector.group].push(newSelector);
    };
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template.js.map