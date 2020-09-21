import {Selector} from "./selector";

export class DeleteSelector extends Selector {

    constructor(group) {
        super(group);
    }

    select() {
        let element = this.getElement();
        if(!element || element.tmpPath) {
            return;
        }
        if(element && element.style.display != 'none') {
            if(!element.hasAttribute("old_display")) {
                element.setAttribute("old_display", element.style.display);
            }
            element.style.display = 'none';
        }
    }

    remove() {
        let element: any = this.getElement();
        if(!element || element.tmpPath) {
            return;
        }
        let old_display = element.getAttribute("old_display");
        if(old_display) {
            element.style.display = old_display;
        } else {
            element.style.display = "";
        }
    }
}


