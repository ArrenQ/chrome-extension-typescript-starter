import {Selector} from "../model/selector";
import {HoveredSelector} from "../model/hovered.selector";
import {DeleteSelector} from "../model/delete.selector";
import {Utils} from "../utils";
import {ColorSelector} from "../model/color.selector";

export class Template {
    indexPage: string = "";     // 首页
    listPage: string = "";      // list 页面
    articlePage: string = "";   // 文章页
    website: string = "";

    navGroup: Selector[] = [];
    titleGroup: Selector[] = [];
    contentGroup: Selector[] = [];
    atagGroup: Selector[] = [];
    interlinkGroup: Selector[] = [];
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
    }

    private paint(group: Selector[]) {
        group.forEach(selector => selector.select());
    }

    public reload(loadOver) {
        Utils.loadDataToTemp(this, loadOver);
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
}
