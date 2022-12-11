/* global d3 $ AMap */

// import dataService from '../../service/dataService.js'
// import pipeService from "../../service/pipeService.js"
import 'd3'

let DrawMap= function (id) {	
	this.id = id
    this.svgWidth = $('#' + id).width()
    this.svgHeight = $('#' + id).height()
    this.margin = { top: 50, right: 100, bottom: 10, left: 100 }
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

DrawMap.prototype.init = function () {
    // 高德 - 佛山
    let center = {lng: 113.121586, lat: 23.021351}
    // const _this = this

    this.map = new AMap.Map('mapContainer', {
        zoom:11,//级别
        center: [center.lng, center.lat],//中心点坐标
        resizeEnable: true, //是否监控地图容器尺寸变化
        mapStyle: "amap://styles/whitesmoke",
        layers: [//使用多个图层
            // new AMap.TileLayer.Satellite(),
            // new AMap.TileLayer.RoadNet()
        ],
        // viewMode:'3D'//使用3D视图
    });

    let size = this.map.getSize()
    this.svgCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgCanvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.svgCanvas.setAttribute('id', 'svgContainer')
    this.svgCanvas.setAttribute('width', size.width);
    this.svgCanvas.setAttribute('height', size.height);

    this.customLayer = new AMap.CustomLayer(this.svgCanvas, {
        // zooms: [3, 8],
        alwaysRender:true,
        zIndex: 300
    });

    this.customLayer.setMap(this.map);

}

DrawMap.prototype.drawTest = function() {
    let svgContainer = d3.select(this.svgCanvas);

    const g = svgContainer.append("g")
        .attr("class","test_chart");

    const data = [
        {"cx":50, "cy":50},
        {"cx":100, "cy":100},
        {"cx":150, "cy":150},
    ];

    g.selectAll("circle").data(data).join("circle")
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", 20)
        .attr("fill", "red");

}

DrawMap.prototype.drawStation = function () {
    this.map.clearMap()

    var style = [{
        url: 'https://webapi.amap.com/images/mass/mass0.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7),
        zIndex: 3,
    }, {
        url: 'https://webapi.amap.com/images/mass/mass1.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7),
        zIndex: 2,
    }, {
        url: 'https://webapi.amap.com/images/mass/mass2.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(5, 5),
        zIndex: 1,
    }
    ];


    let stationMarks = new AMap.MassMarks(this.stationMapData, {
        zIndex: 5,  // 海量点图层叠加的顺序
        zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
        style: style  // 设置样式对象
    });
    // 将海量点添加至地图实例
    stationMarks.setMap(this.map);
}


export default DrawMap