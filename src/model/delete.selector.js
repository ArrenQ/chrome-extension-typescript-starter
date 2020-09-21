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
exports.DeleteSelector = void 0;
var selector_1 = require("./selector");
var DeleteSelector = /** @class */ (function (_super) {
    __extends(DeleteSelector, _super);
    function DeleteSelector(group) {
        return _super.call(this, group) || this;
    }
    DeleteSelector.prototype.select = function () {
        if (!this.getElement()) {
            return;
        }
        var element = this.getElement();
        if (element && element.style.display != 'none') {
            this.tempValue = element.style.display;
            element.style.display = 'none';
        }
    };
    DeleteSelector.prototype.remove = function () {
        if (!this.getElement()) {
            return;
        }
        this.getElement().style.display = this.tempValue;
    };
    return DeleteSelector;
}(selector_1.Selector));
exports.DeleteSelector = DeleteSelector;
//# sourceMappingURL=delete.selectors.js.map