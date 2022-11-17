/* global d3 $ */
// import List from 'list.js'
// import pipeService from '../../service/pipeService'
// import globalConfig from '../../service/globalConfig'

let DrawText= function (id) {	
	this.id = id
    this.divWidth = $('#' + id).width()
    this.divHeight = $('#' + id).height()


    this.svg = d3.select('#' + id).append('div')
        .attr('id', 'sentence-table')
}

DrawText.prototype.layout = function () {
    
}

export default DrawText