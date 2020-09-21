import {wndCSS, wndUI} from "./ui.const";
import {HoveredSelector} from "./model/hovered.selector";
import {tabsCSS, TemplateTabs} from "./template/template.tabs";
import {Template} from "./template/template";
import {settings} from "./settings";
import {Utils} from "./utils";
import {Selector} from "./model/selector";

export const cssLines = [wndCSS, tabsCSS];


export class UI {

    private mouseoverListener = ev => this.mouseover(ev);
    private mousedownListener = ev => this.mousedown(ev);
    private mouseupListener = ev => this.preventEvent(ev);
    private clickListener = ev => this.preventEvent(ev);
    private keydownListener = ev => this.keyDown(ev);
    private keyupListener = ev => this.keyUp(ev);

    private toolsWindow: HTMLDivElement;

    private listeners: EventListeners = new EventListeners();

    private userBehavior = true;

    private hoveredSelector: HoveredSelector;

    private tabs: TemplateTabs;

    constructor(private template: Template) {}

    activate() {

        // 首次创建toolsWindow时，加载Css
        if(!this.toolsWindow) {
            this.updateCSS();
        }
        // 根据 wndUI 来创建 DIV 并插入到body中。
        let div = document.createElement("div");
        div.setAttribute("id", settings.toolsWindowId);
        document.body.append(div);
        div.innerHTML = wndUI;
        this.toolsWindow = div;

        // 添加tabs
        this.tabs = new TemplateTabs(this.toolsWindow.querySelector("#ctre_elm_list"));
        // 创建临时selector
        this.hoveredSelector = new HoveredSelector(this.tabs.getSelectedGroup(), 1);

        // 添加各种事件
        this.initUIEvent();

        this.toolsWindow.style.display = "block";

        // 初始化所有UI的值
        this.initValueForTmp();

        // 动画效果,让logo转动
        setTimeout(() =>{
            let logoElm = document.querySelector('#eden_seo_wnd .ct_logo');
            logoElm && logoElm.classList.add('anim');
            this.fireTemplateUpdate(true);
        }, 10);

        this.listeners.fire("opened");
        let noscript = document.querySelector("noscript");
        if(noscript) {
           alert("注意：这个网站有noscript标签，服务器将拒绝抓取");
        }
    }

    public destroy() {
        this.setUserBehavior(false);
        document.removeEventListener('mouseover', this.mouseoverListener, true);
        document.removeEventListener('mousedown', this.mousedownListener, true);
        document.removeEventListener('mouseup', this.mouseupListener, true);
        document.removeEventListener('click', this.clickListener, true);
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);

        this.toolsWindow.parentNode.removeChild(this.toolsWindow);// 把工具UI删除
    }

    mousedown(e) {
        if(this.userBehavior || this.isChildOfEdenWindow(e.target)) {
            return;
        }

        this.template.addSelector(this.hoveredSelector);
        this.fireTemplateUpdate(true);

        this.repaint();

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    mouseover(e) {
        if(this.userBehavior || this.isChildOfEdenWindow(e.target)) {
            return;
        }
        if(this.hoveredSelector && this.hoveredSelector.getElement() === e.target) { //在同一个组件上移动不做任何处理
            return;
        }

        this.hoveredSelector.setElement(e.target);

        this.repaint();
    }

    keyDown(e) {

        if (this.userBehavior) return;

        let hoveredElement = this.hoveredSelector.getElement();
        if(!hoveredElement) {
            return;
        }
        if(e.altKey && e.keyCode == 81) { //Q
            this.hoveredSelector.previous();
            this.repaint()
            // this.mouseover({target: hoveredElement.parentElement})
        } else if (e.altKey && e.keyCode == 87) { // w
            this.hoveredSelector.next();
            this.repaint();
            // this.mouseover({target: hoveredElement.nextElementSibling})
        }
        e.stopPropagation(); e.preventDefault();
        return false;
    }

    keyUp(e) {
        if (this.userBehavior) return;
        e.stopPropagation(); e.preventDefault();
        return false;
    }

    /**
     * 判断组件是否为 EdenWindow 的节点，只会向上寻找10层（edenWindow会避免自己的组件嵌套10层以上，这样可以提高查找性能）
     */
    isChildOfEdenWindow(elm) {
        for (let i = 0; i < 10; i++) {
            if (elm === this.toolsWindow) {
                return true;
            }
            elm = elm.parentNode;
            if (!elm) break;
        }
        return false;
    }

    preventEvent(e) {
        if(this.userBehavior) {
            return;
        }
        if (this.isChildOfEdenWindow(e.target)) return;
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    public toggleUserBehavior() {
        this.setUserBehavior(!this.userBehavior);
    }

    private doSubmit() {
        this.disabledSubmitBtn();
        Utils.sendData(this.template, data => {
            if(data.success) {
                alert("提交成功");
            } else {
                alert(data.message);
            }
        }, () => this.enabledSubmitBtn());
    }


    /**
     * 更新css，安全更新，如果有就不更新了。
     */
    updateCSS() {
        // 如果没有把css导入，这创建一个style标签将css导入
        let styleElm = document.querySelector('#eden_seo_styles');
        if (!styleElm) {
            styleElm = document.createElement('style');
            styleElm.setAttribute("type","text/css");
            styleElm.id = "eden_seo_styles";
            document.head.appendChild(styleElm);
        }
        // 删除style标签内的所有节点（其他组件可能会自动加上一些东西，我们要把这部分清理掉）
        while (styleElm.firstChild) {
            styleElm.removeChild(styleElm.firstChild);
        }
        styleElm.appendChild(document.createTextNode(cssLines.join('\n')));
    }

    initUIEvent() {
        // 添加关闭按钮事件处理
        this.toolsWindow.querySelector('.ct_close').addEventListener('click', e => {
            this.listeners.fire("closed");
            e.preventDefault();
        });
        // 添加最小化按钮事件处理
        this.toolsWindow.querySelector('.ct_minimize').addEventListener('click', (e) => {
            this.toolsWindow.classList.toggle('minimized');
            e.preventDefault();
        });

        document.querySelector("#eden_select_btn").addEventListener("click", () => this.toggleUserBehavior(), true);
        document.querySelector("#eden_submit_btn").addEventListener("click", () => this.doSubmit(), true);

        document.querySelector("#eden_index_page_btn").addEventListener("click", () => {
            this.template.indexPage = location.href;
            // @ts-ignore
            document.querySelector("#eden_index_text").value = location.href;
            this.fireTemplateUpdate(false);
        }, true);
        document.querySelector("#eden_list_page_btn").addEventListener("click", () => {
            this.template.listPage = location.href;
            // @ts-ignore
            document.querySelector("#eden_list_text").value = location.href;
            this.fireTemplateUpdate(false);
        }, true);
        document.querySelector("#eden_detail_page_btn").addEventListener("click", () => {
            this.template.articlePage = location.href;
            // @ts-ignore
            document.querySelector("#eden_detail_text").value = location.href;
            this.fireTemplateUpdate(false);
        }, true);

        document.addEventListener('mouseover', this.mouseoverListener, true);
        document.addEventListener('mousedown', this.mousedownListener, true);
        document.addEventListener('mouseup', this.mouseupListener, true);
        document.addEventListener('click', this.clickListener, true);
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);

        this.tabs.addItemDeleteListener((group, index) => {
            let selectors = this.template[group];
            if(selectors) {
                let selector: Selector = selectors.splice(index, 1)[0];
                selector.remove();
                this.fireTemplateUpdate(true);
            }
        });
        this.tabs.addTabChangeListener((oldTab, newTab) => {
           this.hoveredSelector.group = newTab;
           this.fireTemplateUpdate(true);
           this.repaint();
        });

    }

    private initValueForTmp() {
        //@ts-ignore
        document.querySelector("#eden_index_text").value = this.template.indexPage;
        //@ts-ignore
        document.querySelector("#eden_list_text").value = this.template.listPage;
        //@ts-ignore
        document.querySelector("#eden_detail_text").value = this.template.articlePage;
        //@ts-ignore
        document.querySelector("#eden_website_text").value = this.template.website;

        this.tabs.refresh(this.template);
    }

    private setUserBehavior(userBehavior: boolean) {
        this.userBehavior = userBehavior;
        if(this.userBehavior) {
            document.querySelector("#eden_select_btn").textContent = "禁止浏览器动作";
        } else {
            document.querySelector("#eden_select_btn").textContent = "允许浏览器动作";
        }
    }

    addListener(name, callback) {
        this.listeners.addListener(name, callback);
    }

    removeListener(name, callback) {
        this.listeners.removeListener(name, callback);
    }

    disabledSubmitBtn() {
        document.querySelector("#eden_submit_btn").setAttribute("disabled", "");
        // @ts-ignore
        document.querySelector("#eden_submit_btn").style="background-color:#9c9c9c";
    }
    enabledSubmitBtn() {
        document.querySelector("#eden_submit_btn").removeAttribute("disabled");
        // @ts-ignore
        document.querySelector("#eden_submit_btn").style="";
    }

    private fireTemplateUpdate(refreshUI: boolean) {
        Utils.saveData(this.template);
        if(refreshUI) {
            this.tabs.refresh(this.template);
        }
    }

    private repaint() {
        this.hoveredSelector.select();
        this.template.repaint();
        if(this.hoveredSelector.getElement()) {
            document.querySelector('#ctre_current_elm').innerHTML =
                Utils.createPathHTML(this.hoveredSelector.getElement(), this.hoveredSelector.transpose);
            document.querySelector('#ctre_current_elm').scrollTop = 9999;
        }

    }


}

class EventListeners {
    map: any = {};

    public addListener(name: string, callback: ()=>void) {
        if(!this.map[name]) {
            this.map[name] = [];
        }
        this.map[name].push(callback);
    }

    public removeListener(name: string, callback: ()=>void) {
        if(this.map[name]) {
            let lists = this.map[name] as [];
            for (let i = 0; i < lists.length; i++) {
                if(callback === lists[i]) {
                    lists.splice(i,1);
                }
            }
        }
    }

    public fire(name: string) {
        if(this.map[name]) {
            let lists = this.map[name] as Array<()=>void>;
            lists.forEach(value => value())
        }
    }
}

