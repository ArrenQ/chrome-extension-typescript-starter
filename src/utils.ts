import {TemplateData} from "./template/template.data";
import * as $ from 'jquery';

export class Utils {

    public static sendData(data: TemplateData, page:string, website: string, url: string, html: string, callback, done) {
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

            data['username'] = setting.username;
            data['password'] = setting.password;
            data['website'] = website;
            data['html'] = html;
            data['pageUrl'] = url;
            $.ajax({
                type: "post",
                dataType: "json",
                contentType: "application/json",
                url: setting.server + "/setting/" + page,
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

    public static getQueryAuto(element: any) {
        if (!element) return null;

        if (element.tagName === 'BODY') return 'body';
        if (element.tagName === 'HTML') return 'html';


        let query = this.makeName(element);
        let random;
        while(this.queryLength(query) != 1) {
            if(random) {
                (element as HTMLElement).classList.remove(random);
            }
            random = Math.random().toString(36).substring(7);
            (element as HTMLElement).classList.add(random);
            query = this.makeName(element);
        }

        return query;
    }

    public static getElementSelectorPath(element: any) {
        if (!element) return null;
        if (element.tmpPath) {
            return element.tmpPath;
        }
        if (element.tagName === 'BODY') return 'body';
        if (element.tagName === 'HTML') return 'html';

        // return cssFinder(element, {
        //     seedMinLength: 20,
        //     optimizedMinLength: 1,
        // });
        let query = this.makeSelector(element);

        let num = this.queryLength(query);
        if(num > 1) {
            query = this.makeSelector2(element);
        }

        return query;
    }

    private static makeSelector(el) {
        let tag, num, stack = [];
        for (; el.parentNode; el = el.parentNode) {
            if (el.tagName === "HTML") {
                continue;
            }
            tag = this.makeName(el);
            stack.unshift(tag);
            num = this.queryLength(stack.join('  '));
            if(num == 0) {
                throw new Error("居然找不到？？？");
            } else if(num == 1) {
                break;
            }
        }
        return stack.join(' > ');
    }

    private static makeSelector2(el) {
        let tag, index, stack = [];

        for (; el.parentNode; el = el.parentNode) {
            tag = el.tagName;
            if (tag !== "HTML") {
                index = this.indexOfParent(el) + 1;
                if (tag === "BODY"){
                    stack.unshift(tag);
                }else{
                    stack.unshift(tag + ':nth-child(' + index + ')');
                }
            }
        }
        return stack.join(' > ');
    }

    private static makeName(el: HTMLElement) {
        let name = el.tagName;
        if(el.id) {
            name += "#" +el.id;
        }
        if(el.hasAttribute("class")) {
            let css = el.getAttribute("class").trim();
            if(css === '') {
                return name;
            }
            let str = css.split(" ").map(value => value.trim()).join(".");
            name += "." + str;
        }
        return name;
    }

    private static queryLength(query): number {
        let q = document.querySelectorAll(query);
        if(q) {
            return q.length;
        } else {
            return 0;
        }
    }

    private static indexOfParent(el) {
        let children = el.parentElement.children;
        for(let i = 0; i < children.length; i++) {
            if(children[i] === el) {
                return i;
            }
        }
        return -1;
    }

    public static htmlTxt(element: HTMLElement) {
        let inner = element.innerHTML;
        element.tagName;

        let attr = element.getAttributeNames().map(value => {
            return `${value}=${element.getAttribute(value)}`;
        }).join(" ");

        return `<${element.tagName} ${attr}>${inner}</${element.tagName}>`
    }
}
