"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateData = void 0;
var selector_1 = require("../model/selector");
var TemplateData = /** @class */ (function () {
    function TemplateData() {
        this.indexPage = ""; // 首页
        this.listPage = ""; // list 页面
        this.articlePage = ""; // 文章页
        this.navGroup = [];
        this.titleGroup = [];
        this.contentGroup = [];
        this.atagGroup = [];
        this.removeGroup = [];
    }
    TemplateData.prototype.writeTo = function (template) {
        var _this = this;
        template.indexPage = this.indexPage;
        template.listPage = this.listPage;
        template.articlePage = this.articlePage;
        template.navGroup = this.navGroup.map(function (value) { return _this.map("navGroup", value); });
        template.titleGroup = this.titleGroup.map(function (value) { return _this.map("titleGroup", value); });
        template.contentGroup = this.contentGroup.map(function (value) { return _this.map("contentGroup", value); });
        template.atagGroup = this.atagGroup.map(function (value) { return _this.map("aTagGroup", value); });
        template.removeGroup = this.removeGroup.map(function (value) { return _this.map("removeGroup", value); });
    };
    TemplateData.prototype.map = function (groupName, path) {
        var s = new selector_1.Selector(groupName);
        s.setElement(document.querySelector(path));
        return s;
    };
    TemplateData.toData = function (template) {
        var data = new TemplateData();
        data.indexPage = template.indexPage;
        data.listPage = template.listPage;
        data.articlePage = template.articlePage;
        data.navGroup = template.navGroup.map(function (value) { return value.getPath(); });
        data.titleGroup = template.titleGroup.map(function (value) { return value.getPath(); });
        data.contentGroup = template.contentGroup.map(function (value) { return value.getPath(); });
        data.atagGroup = template.atagGroup.map(function (value) { return value.getPath(); });
        data.removeGroup = template.removeGroup.map(function (value) { return value.getPath(); });
        return data;
    };
    TemplateData.parse = function (str) {
        return JSON.parse(str);
    };
    return TemplateData;
}());
exports.TemplateData = TemplateData;
//# sourceMappingURL=template.data.js.map