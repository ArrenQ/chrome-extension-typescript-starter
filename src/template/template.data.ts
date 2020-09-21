import {Template} from "./template";
import {Selector} from "../model/selector";
import {DeleteSelector} from "../model/delete.selector";
import {ColorSelector} from "../model/color.selector";

export class TemplateData {

    website: string = "";
    indexPage: string = "";     // 首页
    listPage: string = "";      // list 页面
    articlePage: string = "";   // 文章页

    navGroup: string[] = [];
    titleGroup: string[] = [];
    contentGroup: string[] = [];
    atagGroup: string[] = [];
    interlinkGroup: string[] = [];
    removeGroup: string[] = [];

    public writeTo(template: Template) {
        template.indexPage = this.indexPage;
        template.listPage = this.listPage;
        template.articlePage = this.articlePage;
        template.website = this.website;
        template.navGroup = this.navGroup.map(value => this.map("navGroup", value)).filter(value => !!value);
        template.titleGroup = this.titleGroup.map(value => this.map("titleGroup", value)).filter(value => !!value);
        template.contentGroup = this.contentGroup.map(value => this.map("contentGroup", value)).filter(value => !!value);
        template.atagGroup = this.atagGroup.map(value => this.map("atagGroup", value)).filter(value => !!value);
        template.interlinkGroup = this.interlinkGroup.map(value => this.map("interlinkGroup", value)).filter(value => !!value);
        template.removeGroup = this.removeGroup.map(value => this.map("removeGroup", value)).filter(value => !!value);

        if(!template.website || ''=== template.website) {
            template.website = location.hostname.replace(/^www\./, '');
        }
    }

    private map(groupName: string, path: string): Selector {
        if(!path) {
            return null;
        }
        let s : Selector = "removeGroup" === groupName ? new DeleteSelector(groupName): new ColorSelector(groupName);

        let element: any = document.querySelector(path);
        if(!element) {
            element = { tmpPath : path };
        }
        s.setElement(element);
        return s;
    }

    public static toData(template: Template): TemplateData {
        let data = new TemplateData();
        data.indexPage = template.indexPage;
        data.listPage = template.listPage;
        data.articlePage = template.articlePage;
        //@ts-ignore
        data.website = document.querySelector("#eden_website_text").value;
        data.navGroup = template.navGroup.map(value => value.getPath());
        data.titleGroup = template.titleGroup.map(value => value.getPath());
        data.contentGroup = template.contentGroup.map(value => value.getPath());
        data.atagGroup = template.atagGroup.map(value => value.getPath());
        data.interlinkGroup = template.interlinkGroup.map(value => value.getPath());
        data.removeGroup = template.removeGroup.map(value => value.getPath());
        return data;
    }

    public static parse(str: string): TemplateData {
        try {
            return Object.assign(new TemplateData(), JSON.parse(str));
        } catch (e) {
            return new TemplateData();
        }
    }


}