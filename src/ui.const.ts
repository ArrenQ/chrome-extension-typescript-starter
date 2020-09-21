import {settings} from "./settings";

export const group_color = {
    navGroup: "rgba(255,109,28,0.5)",
    titleGroup: "rgba(33,67,255,0.5)",
    contentGroup: "rgba(13,255,35,0.5)",
    atagGroup: "rgba(141,18,255,0.5)",
    interlinkGroup: "rgba(254,255,0,0.5)",
    removeGroup: "rgba(0,0,0,0.5)"
};

export const wndUI = `
    <span class="ct_logo">Eden 模板疯狂抓
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="-300 -300 600 600">
            <circle r="50"/>
            <path d="M75,0 A 75,75 0 0,0 37.5,-64.952 L 125,-216.506 A 250,250 0 0,1 250,0 z" id="bld"/>
            <use xlink:href="#bld" transform="rotate(120)"/>
            <use xlink:href="#bld" transform="rotate(240)"/>
        </svg>
    </span>
    <span class="version">v1.0.0</span>
    <span class="ct_logo small">Eden</span>
    <div class="ct_minimize"><i>➜</i></div>
    <div class="ct_close">✖</div>
    <div id="ctre_current_elm">鼠标选择的节点</div>
    <div class="keys">
        <div class="activationKeys">
            <span class="key">Alt</span><span class="key">Q</span>: 上级节点
        </div>
        <div class="transposeKeys">
            <span class="key">Alt</span>/<span class="key">W</span>: 下一个同级节点
        </div>
    </div>
    <div class="ct_separator"></div>

    <div id="ctre_elm_list" class="hasContent">

    </div>
    <div class="eden_page_list">
        <div><label for="eden_website_text">website:</label><input type="text" id="eden_website_text"></div>
        <div><a id="eden_select_btn" class="eden-btn">禁止浏览器动作</a></div>
    </div>
    <div>
        <button class="eden-btn eden_submit_btn" page-data="index">提交index</button>
        <button class="eden-btn eden_submit_btn" page-data="list">提交list</button>
        <button class="eden-btn eden_submit_btn" page-data="article">提交article</button>
    </div>
    <div class="ct_more">Made by <a href="#" target="_blank" rel="nofollow">Eden.SEO</a>. 如有疑问请联系: <a href="#" target="_blank" rel="nofollow">0927 658 9528</a></div>
    
`;

export const wndCSS = `
            #eden_seo_wnd {
				position: fixed; bottom: 0; right: 10px; width: 360px; padding: 10px 20px;
				box-sizing: content-box;
				text-align: left; font-family: Helvetica, Arial, sans-serif;
				background: #fff; box-shadow: 0px 0px 40px rgba(0,0,0,0.15);
				z-index: ${settings.edenSeoWndMaxZIndex};
				font-size: 12px; color: #666;
			}
			#eden_seo_wnd * {
				line-height: 1.3; font-size: inherit; color: inherit;
				font-weight: normal; font-style: normal; font-family: inherit;
				cursor: default;
			}
			#eden_seo_wnd a, #eden_seo_wnd input[type=checkbox] { cursor: pointer; }

			#eden_seo_wnd .ct_minimize, #eden_seo_wnd .ct_close {
				display: block; cursor: pointer;
				position: absolute; top: 0; right: 0; width: 32px; line-height: 32px;
				font-size: 14px; text-align: center;
				transition: color 0.3s, background 0.3s;
			}
			#eden_seo_wnd .ct_minimize { right: 32px; background: #fff; color: #0fb4d4; }
			#eden_seo_wnd .ct_minimize:hover { background: #0fb4d4; color: #fff; }
			#eden_seo_wnd .ct_minimize i {
				display: inline-block; cursor: pointer;
				transform: rotate(45deg); transition: transform 0.5s;
			}
			#eden_seo_wnd .ct_close { color: #f00; background: #fff0f0; }
			#eden_seo_wnd .ct_close:hover { color: #fff; background: #f00; }
			#eden_seo_wnd .key {
				display: inline-block;
				font-family: monospace;
				background: #f7f7f7; color: #999;
				padding: 0 2px; margin: 0 2px;
				border: solid 1px #d5d5d5; border-radius: 3px;
			}
			#eden_seo_wnd .ct_logo { font-size: 15px; font-weight: bold; }
			#eden_seo_wnd .ct_logo.small { display: none; }
			#eden_seo_wnd .ct_logo svg {
				fill: #666; vertical-align: -15%;
				transform: rotate(-240deg); transition: transform 1s;
			}
			#eden_seo_wnd .ct_logo.anim svg { transform: rotate(0deg); }

			#eden_seo_wnd .version { color: #bbb; }
			#eden_seo_wnd .keys { font-size: 11px; overflow: hidden; margin-top: 4px; color: #bbb; }
			#eden_seo_wnd .ct_settings { font-size: 11px; overflow: hidden; margin: 8px 0; color: #bbb; }
			#eden_seo_wnd .ct_settings a { color: #999; }
			#eden_seo_wnd .ct_settings a:hover { color: #666; }
			#eden_seo_wnd .activationKeys { float: left; margin-left: -2px; }
			#eden_seo_wnd .transposeKeys { float: right; }
			#ctre_current_elm {
				font-family: monospace; background: #f7f7f7; color: #d5d5d5; padding: 2px; margin: 10px 0;
				max-height: 84px; overflow: hidden;
			}
			#ctre_current_elm .pathNode { color: #999; border-bottom: solid 2px rgba(0,0,0,0); }
			#ctre_current_elm .pathNode.active { border-bottom: solid 2px #555; }

			#ctre_elm_list { display: none; margin: 0 -20px; background: #f7f7f7; border: solid 12px #f7f7f7; border-width: 12px 0 12px 0; max-height: 490px; overflow: auto; }
			#ctre_elm_list.hasContent { display: block; }
			#ctre_elm_list table { border: 0; width: 100%; border-spacing: 0; }
			#ctre_elm_list tr { border: 0; }
			#ctre_elm_list tr.ct_heading td { color: #bbb; }
			#ctre_elm_list td { padding: 0; border: 0; background: #f7f7f7; }
			#ctre_elm_list tr:nth-child(even) td { background: #fcfcfc; }
			#ctre_elm_list td:nth-child(1) { padding-left: 20px; }
			#ctre_elm_list td:nth-child(2) { text-align: center; }
			#ctre_elm_list td:nth-child(3) { padding-right: 20px; }
			#ctre_elm_list tr:not(.ct_heading) td:nth-child(1) { font-family: monospace; font-size: 11px; }
			#ctre_elm_list td input { display: inline; -webkit-appearance: checkbox; }
			#ctre_elm_list td input:before, #ctre_elm_list td input:after { content: none; }
			#ctre_elm_list .ct_edit_selector { font-family: sans-serif; float: right; opacity: 0; color: #0fb4d4; text-decoration: none; }
			#ctre_elm_list .ct_edit_selector:hover { color: #000; }
			#ctre_elm_list tr:hover .ct_edit_selector { opacity: 1; }
			#ctre_elm_list span.ct_delete { color: #f00; padding: 4px; text-decoration: none; font-size: 14px; }
			#ctre_elm_list span.ct_delete:hover { color: #fff; background: #f00; }

			#eden_seo_wnd .ct_more { border-top: solid 1px #f7f7f7; margin: 0 -20px; padding-top: 12px; color: #bbb; font-size: 10px; text-align: center; }
			#eden_seo_wnd .ct_more a { color: #0fb4d4; font-size: inherit; text-decoration: none; transition: color 0.5s; }
			#eden_seo_wnd .ct_more a:hover { color: #000; }

			#eden_seo_wnd.minimized { width: 80px; height: 12px; }
			#eden_seo_wnd.minimized > * { display: none; }
			#eden_seo_wnd.minimized .ct_minimize,
			#eden_seo_wnd.minimized .ct_close { display: block; }
			#eden_seo_wnd.minimized .ct_minimize i { display: inline-block; transform: rotate(-135deg); }
			#eden_seo_wnd.minimized .ct_logo.small { display: block; margin: -4px 0 0 -10px; }
			.eden-btn {
			    margin-right: 4px;
                border: none;
                display: inline-block;
                padding: 3px 8px;
                vertical-align: middle;
                overflow: hidden;
                text-decoration: none;
                color: #FFFFFF;
                background-color: #4CAF50;
                text-align: center;
                cursor: pointer;
                white-space: nowrap;
			}
			.eden_page_list div {    padding: 5px;}
        `;
