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
exports.HoveredSelector = void 0;
var color_selector_1 = require("./color.selector");
var HoveredSelector = /** @class */ (function (_super) {
    __extends(HoveredSelector, _super);
    function HoveredSelector(group, transpose) {
        var _this = _super.call(this, group) || this;
        _this.transpose = transpose;
        return _this;
    }
    HoveredSelector.prototype.select = function () {
        var transposeEle = this.transposeElement();
        _super.prototype.select0.call(this, transposeEle);
    };
    HoveredSelector.prototype.remove = function () {
        var transposeEle = this.transposeElement();
        _super.prototype.remove0.call(this, transposeEle);
        this.transpose = 1;
    };
    HoveredSelector.prototype.previous = function () {
        if (!this.getElement()) {
            return;
        }
        if (this.transposeElement().parentElement) {
            this.remove0(this.transposeElement());
            this.transpose++;
            this.select();
        }
    };
    HoveredSelector.prototype.next = function () {
        if (!this.getElement()) {
            return;
        }
        if (this.transpose > 1) {
            this.remove0(this.transposeElement());
            this.transpose--;
            this.select();
        }
    };
    HoveredSelector.prototype.transposeElement = function () {
        if (!this.getElement()) {
            return null;
        }
        var ele = this.getElement();
        for (var i = 1; i < this.transpose; i++) {
            if (ele.parentElement) {
                ele = ele.parentElement;
            }
        }
        return ele;
    };
    HoveredSelector.prototype.pack = function () {
        if (this.getElement()) {
            this.setElement(this.transposeElement());
        }
    };
    HoveredSelector.prototype.setElement = function (element) {
        this.remove();
        _super.prototype.setElement.call(this, element);
    };
    return HoveredSelector;
}(color_selector_1.ColorSelector));
exports.HoveredSelector = HoveredSelector;
//# sourceMappingURL=hovered.selector.js.map