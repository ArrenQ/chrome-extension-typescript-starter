import {Template} from "./template/template";
import {TemplateData} from "./template/template.data";
import * as $ from 'jquery';

export class Utils {

    public static saveData(template: Template) {
        // @ts-ignore
        chrome.extension.sendMessage({
            action: 'set_saved_elms',
            website: location.hostname.split('.').slice(-2).join('.'),
            data: JSON.stringify(TemplateData.toData(template)),
        });
    }

    public static loadDataToTemp(template: Template, loadOver) {
        // @ts-ignore
        chrome.extension.sendMessage({
            action: 'get_saved_elms',
            website: location.hostname.split(".").slice(-2).join("."),
        }, (data) => {
            TemplateData.parse(data).writeTo(template);
            loadOver();
        });

    }

    public static sendData(template: Template, callback, done) {
        this.saveData(template);
        // @ts-ignore
        chrome.extension.sendMessage({
            action: 'get_settings'
        }, (settingstr) => {
            if(!settingstr) {
                alert('请先去配置页面设置服务器地址');
                return ;
            }
            let setting = JSON.parse(settingstr);
            if(!setting || !setting.server) {
                alert('请先去配置页面设置服务器地址');
                return ;
            }
            let data = TemplateData.toData(template)
            data['username'] = setting.username;
            data['password'] = setting.password;
            data['website']
            $.ajax({
                type: "post",
                dataType: "json",
                contentType: "application/json",
                url: setting.server + "/setting",
                data: JSON.stringify(data),
                success: callback,
                complete: done
            })
        });

    }

    public static createPathHTML(elm, transpose) {
        let path = [];
        let currentElm = elm;

        while(currentElm) {
            path.push(currentElm);
            currentElm = currentElm.parentElement;
        }
        path = path.reverse();

        let html = [];
        for(let i = 0; i < path.length; i++) {
            html.push(`<span class="pathNode${path.length - 1 - i === transpose ? " active" : ""}">${Utils.getElmName(path[i])}</span>`);
        }
        return html.join(" > ");
    }

    /**
     * 获取标签名字
     */
    public static getElmName(elm) {
        if (elm.id) {
            return "#" + elm.id;
        } else if (typeof elm.className == "string" && elm.className.trim().length) {
            return elm.tagName.toLowerCase() + "." + elm.className.trim().split(" ").join(".");
        } else {
            return elm.tagName.toLowerCase();
        }
    }

    public static escapeHTML(str) {
        Math.round(Math.random());
        if(typeof(str)=='string') {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else {
            return '';
        }
    }
}