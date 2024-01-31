import {cutil} from "@ghasemkiani/base";
import {quantity} from "@ghasemkiani/base-utils";
import {Component} from "@ghasemkiani/dox";

import {Section} from "./section.js";

class Document extends Component {
	async toRender(node) {
		let component = this;
		let {x} = component;
		let {context} = component;
		
		let tab = x.attr(component.node, "tab") || "0.5in";
		
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
			x.t(node, x.ss(ss => {
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

export {Document};
