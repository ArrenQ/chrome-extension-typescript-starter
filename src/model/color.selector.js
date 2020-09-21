"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSelector = void 0;
var selector_1 = require("./selector");
var ui_const_1 = require("../ui.const");
var ColorSelector = /** @class */ (function (_super) {
    __extends(ColorSelector, _super);
    function ColorSelector(group) {
        return _super.call(this, group) || this;
    }
    ColorSelector.prototype.select = function () {
        this.select0(this.getElement());
    };
    ColorSelector.prototype.remove = function () {
        this.remove0(this.getElement());
    };
    ColorSelector.prototype.select0 = function (element) {
        if (!element) {
            return;
        }
        this.tempValue = {
            outline: element.style.outline,
            outlineOffset: element.style.outlineOffset
        };
        element.style.outline = "solid 5px " + ui_const_1.group_color[this.group];
        element.style.outlineOffset = '-5px';
    };
    ColorSelector.prototype.remove0 = function (element) {
        if (!element) {
            return;
        }
        element.style.outline = this.tempValue.outline;
        element.style.outlineOffset = this.tempValue.outlineOffset;
    };
    return ColorSelector;
}(selector_1.Selector));
exports.ColorSelector = ColorSelector;
//# sourceMappingURL=color.selector.js.map