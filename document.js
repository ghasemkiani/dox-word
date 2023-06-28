//	@ghasemkiani/dox-word/document

import {cutil} from "@ghasemkiani/base";
import {quantity} from "@ghasemkiani/base-utils";
import {css} from "@ghasemkiani/wdom";
const {Stylesheet} = css;
import {Component} from "@ghasemkiani/dox";

class Document extends Component {
	static count = 0;
	async toRender(wnode) {
		let component = this;
		let {context} = component;
		let {renderer} = context;
		
		let tab = component.wnode.attr("tab") || "0.5in";
		
		let margin = component.wnode.attr("margin") || "25mm 20mm 20mm 20mm";
		let marginHeader = component.wnode.attr("marginHeader") || "10mm";
		let marginFooter = component.wnode.attr("marginFooter") || "10mm";
		let dir = component.wnode.attr("dir") || "ltr";
		let facingPages = component.wnode.attr("facingPages") || "yes";
		let titlePage = component.wnode.attr("titlePage") || "yes";
		
		Section.count++;
		let page = `page${(Section.count).toFixed(0).padStart(3, "0")}`;
		let cls = `section${(Section.count).toFixed(0).padStart(3, "0")}`;
		wnode.ch("style", wnode => {
			wnode.t(new Stylesheet().chain(ss => {
				ss.rule(`@page ${page}`, {
					"size": size,
					"margin": margin,
					"mso-header-margin": marginHeader,
					"mso-footer-margin": marginFooter,
					"mso-gutter-direction": dir,
					"mso-facing-pages": facingPages,
					"mso-title-page": titlePage,
				});
				ss.rule(`div.${cls}`, {
					"page": page,
				});
			}).string);
		});
		let wn;
		wnode.ch(`div.${cls}`, wnode => {
			wn = wnode;
		});
		await component.toRenderBody(wn);
	}
}

export {Document};
