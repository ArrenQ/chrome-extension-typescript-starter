"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
var ui_const_1 = require("../ui.const");
var utils_1 = require("../utils");
var Selector = /** @class */ (function () {
    function Selector(group) {
        this.group = group;
    }
    Selector.prototype.select = function () { };
    Selector.prototype.remove = function () { };
    Selector.prototype.getSelectColor = function () {
        return ui_const_1.group_color[this.group];
    };
    Selector.prototype.getPath = function () {
        return utils_1.Utils.getElementSelectorPath(this.element);
    };
    Selector.prototype.setElement = function (element) {
        this.element = element;
    };
    Selector.prototype.getElement = function () {
        return this.element;
    };
    return Selector;
}());
exports.Selector = Selector;
//# sourceMappingURL=selector.js.map