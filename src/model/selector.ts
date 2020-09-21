import {group_color} from "../ui.const";

export abstract class Selector {
    private element: any;

    protected constructor(public group: string) {}

    abstract select();
    abstract remove() ;

    getSelectColor(): string {
        return group_color[this.group];
    }

    getPath(): string {
        return this.getElementSelectorPath(this.element);
    }

    private getElementSelectorPath(element: any) {
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

    private makeSelector(el) {
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

    private makeSelector2(el) {
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

    private makeName(el: HTMLElement) {
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

    private queryLength(query): number {
        let q = document.querySelectorAll(query);
        if(q) {
            return q.length;
        } else {
            return 0;
        }
    }

    private indexOfParent(el) {
        let children = el.parentElement.children;
        for(let i = 0; i < children.length; i++) {
            if(children[i] === el) {
                return i;
            }
        }
        return -1;
    }

    public setElement(element: any) {
        this.element = element;
    }

    public getElement(): any {
        return this.element;
    }
}
