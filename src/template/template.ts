import {Selector} from "../model/selector";
import {HoveredSelector} from "../model/hovered.selector";
import {DeleteSelector} from "../model/delete.selector";
import {ColorSelector} from "../model/color.selector";
import {TemplateData} from "./template.data";

export class Template {

    navGroup: Selector[] = [];
    atagGroup: Selector[] = [];
    interlinkGroup: Selector[] = [];
    logoGroup: Selector[] = [];

    titleGroup: Selector[] = [];
    contentGroup: Selector[] = [];

    removeGroup: Selector[] = [];


    /**
     * 绘制整个选择器
     */
    public repaint() {
        this.paint(this.navGroup);
        this.paint(this.titleGroup);
        this.paint(this.contentGroup);
        this.paint(this.atagGroup);
        this.paint(this.interlinkGroup);
        this.paint(this.removeGroup);
        this.paint(this.logoGroup);
    }

    public erase() {
        this.eraseGroup(this.navGroup);
        this.eraseGroup(this.titleGroup);
        this.eraseGroup(this.contentGroup);
        this.eraseGroup(this.atagGroup);
        this.eraseGroup(this.interlinkGroup);
        this.eraseGroup(this.removeGroup);
        this.eraseGroup(this.logoGroup);
    }

    private eraseGroup(group: Selector[]) {
        group.forEach(selector => selector.remove());
    }

    private paint(group: Selector[]) {
        group.forEach(selector => selector.select());
    }

    addSelector(hoveredSelector: HoveredSelector) {
        let newSelector:Selector;
        if(hoveredSelector.group == "removeGroup") {
            newSelector = new DeleteSelector(hoveredSelector.group);
        } else {
            newSelector = new ColorSelector(hoveredSelector.group);
        }
        hoveredSelector.pack();
        newSelector.setElement(hoveredSelector.getElement());
        this[hoveredSelector.group].push(newSelector);

    }

    public toData(): TemplateData {
        let data = new TemplateData();
        data.navGroup = this.navGroup.map(value => value.getPath());
        data.titleGroup = this.titleGroup.map(value => value.getPath());
        data.contentGroup = this.contentGroup.map(value => value.getPath());
        data.atagGroup = this.atagGroup.map(value => value.getPath());
        data.interlinkGroup = this.interlinkGroup.map(value => value.getPath());
        data.removeGroup = this.removeGroup.map(value => value.getPath());
        data.logoGroup = this.logoGroup.map(value => value.getPath());
        return data;
    }
}
