//	@ghasemkiani/dox-word/document

const {cutil} = require("@ghasemkiani/base/cutil");
const {quantity} = require("@ghasemkiani/base-utils/quantity");
const {Stylesheet} = require("@ghasemkiani/wdom/css/stylesheet");
const {Component} = require("@ghasemkiani/dox/component");

class Document extends Component {
	static count = 0;
	render(wnode) {
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
		wnode.ch(`div.${cls}`, wnode => {
			component.renderBody(wnode);
		});
	}
}

module.exports = {Document};
