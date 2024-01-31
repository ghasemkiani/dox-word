import {cutil} from "@ghasemkiani/base";
import {quantity} from "@ghasemkiani/base-utils";
import {Component} from "@ghasemkiani/dox";

class Section extends Component {
	static {
		cutil.extend(this, {
			count: 0,
		});
		cutil.extend(this.prototype, {
			//
		});
	}
	async toRender(node) {
		let component = this;
		
		let size = x.attr(component.node, "size") || "A4";
		if(/A4/i.test(size)) {
			size = "210mm 297mm";
		} else if(/A5/i.test(size)) {
			size = "148mm 210mm";
		}
		
		let width = x.attr(component.node, "width");
		let height = x.attr(component.node, "height");
		if(cutil.a(width) && cutil.a(height)) {
			width = quantity.length({space: false}).u("px").s(width).s();
			height = quantity.length({space: false}).u("px").s(height).s();
			size = `${width} ${height}`;
		}
		
		let margin = x.attr(component.node, "margin") || "25mm 20mm 20mm 20mm";
		let marginHeader = x.attr(component.node, "marginHeader") || "10mm";
		let marginFooter = x.attr(component.node, "marginFooter") || "10mm";
		let dir = x.attr(component.node, "dir") || "ltr";
		let facingPages = x.attr(component.node, "facingPages") || "yes";
		let titlePage = x.attr(component.node, "titlePage") || "yes";
		
		Section.count++;
		let page = `page${(Section.count).toFixed(0).padStart(3, "0")}`;
		let cls = `section${(Section.count).toFixed(0).padStart(3, "0")}`;
		x.ch(node, "style", node => {
			node.t(x.ss(ss => {
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
		let node1;
		x.ch(node, `div.${cls}`, node => {
			node1 = node;
		});
		await component.toRenderBody(node1);
	}
}

export {Section};
