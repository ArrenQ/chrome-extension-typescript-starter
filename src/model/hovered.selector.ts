import {ColorSelector} from "./color.selector";

export class HoveredSelector extends ColorSelector {
    constructor(group: string, public transpose: number) {
        super(group);
    }

    public select() {
        this.clearCss();
        let transposeEle = this.transposeElement();
        super.select0(transposeEle);
    }

    public remove() {
        this.clearCss();
        super.setElement(null);
        this.transpose = 0;
    }

    private clearCss() {
        if(!this.getElement()) {
            return null;
        }
        let ele = this.getElement();
        while(null != ele){
            this.remove0(ele);
            ele = ele.parentElement;
        }
    }

    public previous() {
        if(!this.getElement()) {
            return;
        }
        if(this.transposeElement().parentElement) {
            this.transpose++;
            this.select();
        }
    }

    public next() {
        if(!this.getElement()){
            return;
        }
        if(this.transpose > 0) {
            this.transpose--;
            this.select();
        }
    }

    private transposeElement(): HTMLElement {
        if(!this.getElement()) {
            return null;
        }
        let ele = this.getElement();
        for (let i = 0; i < this.transpose; i++) {
            if(ele.parentElement) {
                ele = ele.parentElement;
            }
        }
        return ele;
    }

    pack() {
        if(this.getElement()) {
            this.setElement(this.transposeElement());
        }
    }

    public setElement(element: any) {
        this.remove();
        super.setElement(element);
    }
}