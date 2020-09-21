"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateTabs = exports.tabsUI = exports.tabsCSS = void 0;
var template_data_1 = require("./template.data");
var utils_1 = require("../utils");
exports.tabsCSS = "\n    .tabs {\n            width: 400px;\n            margin: 30px auto;\n            background-color: #FFF;\n            border: 1px solid #C0DCC0;\n            box-sizing: border-box;\n        }\n\n        .tabs nav {\n            height: 40px;\n            text-align: center;\n            line-height: 40px;\n            overflow: hidden;\n            background-color: #C0DCC0;\n            /* \u4F38\u7F29\u76D2\u6A21\u578B */\n            display: flex;\n        }\n\n        nav a {\n            display: block;\n            width: 100px;\n            border-right: 1px solid #FFF;\n            color: #000;\n            text-decoration: none;\n        }\n\n        nav a:last-child {\n            border-right: none;\n        }\n\n        nav a.active {\n            background-color: #9BAF9B;\n        }\n\n        .cont {\n            overflow: hidden;\n            display: none;\n        }\n\n        .cont ol {\n            line-height: 30px;\n        }\n";
exports.tabsUI = "\n    <nav>\n        <a href=\"javascript:;\" data-cont=\"navGroup\"  class=\"active\">\u83DC\u5355</a>\n        <a href=\"javascript:;\" data-cont=\"atagGroup\" >a\u6807\u7B7E</a>\n        <a href=\"javascript:;\" data-cont=\"titleGroup\" >\u6587\u7AE0\u6807\u9898</a>\n        <a href=\"javascript:;\" data-cont=\"contentGroup\">\u6587\u7AE0\u5185\u5BB9</a>\n        <a href=\"javascript:;\" data-cont=\"removeGroup\">\u5220\u9664\u8282\u70B9</a>\n    </nav>\n    <section class=\"cont\" id=\"tmp-groups\" style=\"display:block\">\n        <ol>\n            \n        </ol>\n    </section>\n";
var TemplateTabs = /** @class */ (function () {
    function TemplateTabs(parent) {
        this.parent = parent;
        var div = document.createElement("div");
        div.innerHTML = exports.tabsUI;
        div.classList.add("tabs");
        this.parent.append(div);
        this.initEvent();
    }
    TemplateTabs.prototype.refresh = function (template) {
        var _this = this;
        var group = this.getSelectedGroup();
        var section = document.querySelector(".tabs section#tmp-groups");
        var ol = section.querySelector("ol");
        var selectPaths = template_data_1.TemplateData.toData(template)[group];
        var lines = [];
        selectPaths.forEach(function (path, index) {
            lines.push("\n                 <li><span class=\"ct_delete\" tmp-data=\"" + group + "-" + index + "\">\u2716</span>" + utils_1.Utils.escapeHTML(path) + "</li>\n            ");
        });
        ol.innerHTML = lines.join("\n");
        document.querySelectorAll(".tabs section.cont ol li span.ct_delete").forEach(function (ele) {
            ele.addEventListener("click", function (evt) {
                var target = evt.target;
                var data = target.getAttribute("tmp-data").split("-");
                _this.fireDelete(data[0], Number(data[1]));
            });
        });
    };
    TemplateTabs.prototype.addItemDeleteListener = function (callback) {
        this.deleteCallback = callback;
    };
    TemplateTabs.prototype.addTabChangeListener = function (callback) {
        this.tabChangeCallback = callback;
    };
    TemplateTabs.prototype.getSelectedGroup = function () {
        var selectedTab = document.querySelector(".tabs nav a.active");
        return selectedTab.getAttribute("data-cont");
    };
    TemplateTabs.prototype.initEvent = function () {
        var _this = this;
        var aArr = document.querySelectorAll('.tabs nav a');
        // 循环遍历
        for (var i = 0; i < aArr.length; i++) {
            // <!--给每个获取到的元素添加点击事件-->
            aArr[i].addEventListener("click", function (e) {
                var ele = e.target;
                // <!--获取当前激活的tab选项卡-->
                var active = document.querySelector(".active");
                if (ele === active) { //如果被点击的tab本来就是激活的
                    return;
                }
                var oldName = active.getAttribute("data-cont");
                // <!--移除之前的选项卡激活属性-->
                active.classList.remove("active");
                // <!--给当前点击的选项卡添加激活属性-->
                ele.classList.add("active");
                // <!--获取当前的section标签id名字-->
                var name = ele.getAttribute("data-cont");
                // <!--根据获取到的名字获取当前的内容卡-->
                var section = document.getElementById(name);
                // <!--获取所有class为cont的元素，并循环遍历，取消所有内容卡的样式-->
                var cont = document.getElementsByClassName("cont");
                for (var i_1 = 0; i_1 < cont.length; i_1++) {
                    // @ts-ignore
                    cont[i_1].style.display = "none";
                }
                // <!--激活当前内容卡的样式-->
                section.style.display = "block";
                _this.fireTabChange(oldName, name);
            });
        }
    };
    TemplateTabs.prototype.fireDelete = function (group, index) {
        this.deleteCallback(group, index);
    };
    TemplateTabs.prototype.fireTabChange = function (oldName, name) {
        this.tabChangeCallback(oldName, name);
    };
    return TemplateTabs;
}());
exports.TemplateTabs = TemplateTabs;
//# sourceMappingURL=template.tabs.js.map