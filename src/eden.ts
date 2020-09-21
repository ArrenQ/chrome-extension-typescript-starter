import {UI} from "./ui";
import {Template} from "./template/template";


export class Eden {

    private enabled: boolean = false;
    private readonly template: Template;
    private readonly ui: UI;

    constructor() {
        this.template = new Template();
        this.ui = new UI(this.template);
    }

    public init() {
        console.log("init run");
        // @ts-ignore
        chrome.extension.onMessage.addListener((msg, sender, responseFun) => {
            if (msg.action === "toggle") {
                this.toggle();
                responseFun(2.0);
            } else if (msg.action === "getStatus") {
                responseFun(this.enabled);
            }
        });
    }

    /**
     * 激活或禁用
     */
    toggle() {

        if(this.enabled) {
            this.deactivate();
        } else {
            this.activate();
        }
    }

    /**
     * 禁用UI
     */
    deactivate() {
        this.enabled = false;
        this.ui.destroy();
        this.sendStatus();
    }

    /**
     * 激活UI
     */
    activate() {
        this.ui.activate();

        this.enabled = true;

        this.sendStatus();

        this.ui.addListener("closed", () => this.deactivate());
    }

    sendStatus() {
        // @ts-ignore
        chrome.extension.sendMessage({action: 'status', active: this.enabled});//发送状态为启用的通知
    }
}
