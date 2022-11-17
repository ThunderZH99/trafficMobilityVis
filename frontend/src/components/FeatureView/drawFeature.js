/* global d3 $ */
// import pipeService from '../../service/pipeService.js'

let DrawFeature= function (id) {
	this.id = id
    this.svgWidth = $('#' + id).width()
    this.svgHeight = $('#' + id).height()
    this.margin = { top: 60, right: 50, bottom: 20, left: 50 }
    this.width = this.svgWidth - this.margin.left - this.margin.right
    this.height = this.svgHeight - this.margin.top - this.margin.bottom

    this.svg = d3.select('#' + id).append('svg')
        .attr('class', 'statisticSvg')
        .attr('width', this.svgWidth)
		.attr('height', this.svgHeight)
	
	this.graphContainer = this.svg.append('g')
		.attr('class', 'g_main')
        .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')')

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };
}

DrawFeature.prototype.layout = function () {
    
}

export default DrawFeature