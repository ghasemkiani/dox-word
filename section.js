//	@ghasemkiani/doxword/section

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {quantity} = require("@ghasemkiani/commonbase/util/quantity");
const {Stylesheet} = require("@ghasemkiani/wdom/css/stylesheet");
const {Component} = require("@ghasemkiani/dox/component");

class Section extends Component {
	static count = 0;
	render(wnode, ctx, renderBody, renderAgain) {
		let size = this.wnode.attr("size") || "A4";
		if(/A4/i.test(size)) {
			size = "210mm 297mm";
		} else if(/A5/i.test(size)) {
			size = "148mm 210mm";
		}
		
		let width = this.wnode.attr("width");
		let height = this.wnode.attr("height");
		if(!cutil.isNil(width) && !cutil.isNil(height)) {
			width = quantity.length({space: false}).u("px").s(width).s();
			height = quantity.length({space: false}).u("px").s(height).s();
			size = `${width} ${height}`;
		}
		
		let margin = this.wnode.attr("margin") || "25mm 20mm 20mm 20mm";
		let marginHeader = this.wnode.attr("marginHeader") || "10mm";
		let marginFooter = this.wnode.attr("marginFooter") || "10mm";
		let dir = this.wnode.attr("dir") || "ltr";
		let facingPages = this.wnode.attr("facingPages") || "yes";
		let titlePage = this.wnode.attr("titlePage") || "yes";
		
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
			renderBody(wnode);
		});
	}
}

module.exports = {Section};
