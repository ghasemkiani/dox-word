//	@ghasemkiani/dox-word/section

import {cutil} from "@ghasemkiani/base";
import {quantity} from "@ghasemkiani/base-utils";
import {css} from "@ghasemkiani/wdom";
const {Stylesheet} = css;
import {Component} from "@ghasemkiani/dox";

class Section extends Component {
	static count = 0;
	render(wnode) {
		let component = this;
		
		let size = component.wnode.attr("size") || "A4";
		if(/A4/i.test(size)) {
			size = "210mm 297mm";
		} else if(/A5/i.test(size)) {
			size = "148mm 210mm";
		}
		
		let width = component.wnode.attr("width");
		let height = component.wnode.attr("height");
		if(!cutil.isNil(width) && !cutil.isNil(height)) {
			width = quantity.length({space: false}).u("px").s(width).s();
			height = quantity.length({space: false}).u("px").s(height).s();
			size = `${width} ${height}`;
		}
		
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
		wnode.ch(`div.${cls}`, wnode => {
			component.renderBody(wnode);
		});
	}
}

export {Section};
