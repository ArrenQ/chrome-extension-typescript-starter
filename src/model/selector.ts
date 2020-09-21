import {group_color} from "../ui.const";
import {Utils} from "../utils";

export abstract class Selector {
    private element: any;

    protected constructor(public group: string) {}

    abstract select();
    abstract remove() ;

    getSelectColor(): string {
        return group_color[this.group];
    }

    getPath(): string {
        return Utils.getQueryAuto(this.element);
    }



    public setElement(element: any) {
        this.element = element;
    }

    public getElement(): any {
        return this.element;
    }
}
