import {Selector} from "./selector";
import {group_color} from "../ui.const";

export class ColorSelector extends Selector {

    constructor(group: string) {
        super(group);
    }

    select() {
        this.select0(this.getElement());
    }

    remove() {
        this.remove0(this.getElement());
    }

    protected select0(element: any) {
        if(!element || element.tmpPath) {
            return;
        }
        if(!element.hasAttribute("old-outline")) {
            element.setAttribute("old-outline", element.style.outline);
        }
        if(!element.hasAttribute("old-outlineOffset")) {
            element.setAttribute("old-outlineOffset", element.style.outlineOffset);
        }

        element.style.outline = `solid 8px ${group_color[this.group]}`;
        element.style.outlineOffset = '-5px';
    }

    protected remove0(element: any) {
        if(!element || element.tmpPath) {
            return;
        }
        let old_outline = element.getAttribute("old-outline");
        let old_outlineOffset = element.getAttribute("old-outlineOffset");

        if(old_outline) {
            element.style.outline = old_outline;
        } else {
            element.style.outline = "";
        }
        if(old_outlineOffset) {
            element.style.outlineOffset = old_outlineOffset;
        } else {
            element.style.outlineOffset = "";
        }
    }
}
