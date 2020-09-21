import {Template} from "./template";
import {TemplateData} from "./template.data";
import {Utils} from "../utils";

export const tabsCSS = `
        .eden-tabs {
            width: 400px;
            margin: 30px auto;
            background-color: #FFF;
            border: 1px solid #C0DCC0;
            box-sizing: border-box;
        }

        .eden-tabs nav {
            height: 40px;
            text-align: center;
            line-height: 40px;
            overflow: hidden;
            background-color: #C0DCC0;
            /* 伸缩盒模型 */
            display: flex;
        }

        .eden-tabs nav a {
            display: block;
            width: 100px;
            border-right: 1px solid #FFF;
            color: #000;
            text-decoration: none;
            line-height: 3.4 !important;
        }

        .eden-tabs nav a:last-child {
            border-right: none;
        }

        .eden-tabs nav a.active {
            background-color: #9BAF9B;
        }

        .eden-tabs .cont {
            overflow: hidden;
            display: none;
        }

        .eden-tabs .cont ol {
            line-height: 30px;
        }
`;
export const tabsUI = `
    <nav>
        <a data-cont="navGroup"  class="active">菜单</a>
        <a data-cont="atagGroup" >a标签</a>
        <a data-cont="titleGroup" >文章标题</a>
        <a data-cont="contentGroup">文章内容</a>
        <a data-cont="removeGroup">删除节点</a>
        <a data-cont="interlinkGroup">互链</a>
    </nav>
    <section class="cont" id="tmp-groups" style="display:block">
        <ol>
            
        </ol>
    </section>
`;

export class TemplateTabs {

    private deleteCallback: (group:string, index:number) => void;
    private tabChangeCallback: (oldTab: string, newTab: string) => void;

    constructor(private parent: HTMLElement) {
        let div = document.createElement("div");
        div.innerHTML = tabsUI;
        div.classList.add("eden-tabs");
        this.parent.append(div);

        this.initEvent();
    }

    public refresh(template: Template) {
        let group = this.getSelectedGroup();
        let section = document.querySelector(".eden-tabs section#tmp-groups");
        let ol = section.querySelector("ol");

        let selectPaths: string[] = template.toData()[group] as string[];

        let lines = [];
        selectPaths.forEach((path, index) => {
            lines.push(`
                 <li><span class="ct_delete" tmp-data="${group}-${index}">✖</span>${Utils.escapeHTML(path)}</li>
            `);
        });
        ol.innerHTML = lines.join("\n");

        document.querySelectorAll(".eden-tabs section.cont ol li span.ct_delete").forEach(ele => {
            ele.addEventListener("click", evt => {
                let target: HTMLElement = evt.target as HTMLElement;
                let data = target.getAttribute("tmp-data").split("-");
                this.fireDelete(data[0], Number(data[1]));
            });
        });
    }

    public addItemDeleteListener(callback: (group:string, index:number) => void) {
        this.deleteCallback = callback;
    }

    public addTabChangeListener(callback: (oldTab:string, newTab:string) => void) {
        this.tabChangeCallback = callback;
    }

    public getSelectedGroup() : string {
        let selectedTab = document.querySelector(".eden-tabs nav a.active");
        return selectedTab.getAttribute("data-cont");
    }



    private initEvent() {
        let aArr=document.querySelectorAll('.eden-tabs nav a');
        // 循环遍历
        for(let i=0;i<aArr.length;i++){
            // <!--给每个获取到的元素添加点击事件-->
            aArr[i].addEventListener("click", (e) => {

                let ele = e.target as HTMLElement;
                // <!--获取当前激活的tab选项卡-->
                let active=document.querySelector(".eden-tabs .active");

                if(ele === active) {//如果被点击的tab本来就是激活的
                    return;
                }
                let oldName = active.getAttribute("data-cont");
                // <!--移除之前的选项卡激活属性-->
                active.classList.remove("active");
                // <!--给当前点击的选项卡添加激活属性-->
                ele.classList.add("active");
                // <!--获取当前的section标签id名字-->
                let name=ele.getAttribute("data-cont");

                this.fireTabChange(oldName, name);
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }

    private fireDelete(group: string, index: number) {
        this.deleteCallback(group, index);
    }

    private fireTabChange(oldName: string, name: string) {
        this.tabChangeCallback(oldName, name);
    }
}
