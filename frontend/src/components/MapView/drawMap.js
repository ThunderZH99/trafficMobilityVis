/* global d3 $ AMap */

// import dataService from '../../service/dataService.js'
// import pipeService from "../../service/pipeService.js"

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

DrawMap.prototype.layout = function () {


    // this.stationInfo = data['stationInfo']
    //
    // this.stationLocation = data['stationLocation']
    //
    // this.stationMapData = []
    //
    // for(let i=0; i<this.stationInfo.length; i++) {
    //     let item = this.stationInfo[i]
    //     this.stationMapData.push({
    //         lnglat: [item['gdLng'], item['gdLat']],
    //         name: item['did'],
    //         id: i,
    //         style: 0
    //     })
    // }
    //
    // console.log('stationInfo: ', this.stationInfo)
    // console.log('AMap: ', AMap)




    // set the dimensions and margins of the graph
    // var margin = {top: 20, right: 20, bottom: 30, left: 40},
    // width = this.width - margin.left - margin.right,
    // height = this.height - margin.top - margin.bottom;
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



    // this.drawStation()

    // // 同时引入工具条插件，比例尺插件和鹰眼插件
    // AMap.plugin([
    //     'AMap.ToolBar',
    //     'AMap.Scale',
    //     'AMap.HawkEye',
    //     'AMap.MapType',
    //     'AMap.Geolocation',
    // ], function(){
    //     // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    //     _this.map.addControl(new AMap.ToolBar());

    //     // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    //     _this.map.addControl(new AMap.Scale());

    //     // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    //     _this.map.addControl(new AMap.HawkEye({isOpen:true}));
    
    //     // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    //     _this.map.addControl(new AMap.MapType());
    
    //     // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    //     _this.map.addControl(new AMap.Geolocation());
    // });

    // //实时路况图层
    // let trafficLayer = new AMap.TileLayer.Traffic({
    //     zIndex: 10
    // });
    // this.map.add(trafficLayer);//添加图层到地图

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



// temporal view 选择后, 更新地图上的数据
// DrawMap.prototype.drawTripStation = function (tripInfo, tripStationData) {
//     this.map.clearMap()
//     // console.log('tripStation: ', tripInfo, tripStationData)
//     this.customLayer.render = onRender;
//     // this.map.setLayers(this.customLayer);
//     this.customLayer.setMap(this.map)
//     let svgContainer = d3.select(this.svgCanvas)
//     const _this = this
//     function onRender() {
//         _this.renderUpdate(svgContainer)
//     }
//     _this.drawSvg(svgContainer, tripInfo, tripStationData)
//
//     // trip view 里面选择时间，map view更新highlight
//     pipeService.onTripPoint((timestampIdx) => {
//         // console.log('timestampIdx: ', timestampIdx)
//         d3.selectAll(`.stationPoint`).classed('timestampStationHighlight', false)
//         d3.selectAll(`.gpsPoint`).classed('timestampGpsHighlight', false)
//         _this.lineContainer.selectAll('*').remove()
//
//         if (timestampIdx == -1) {
//             return
//         }
//
//         let stationId = tripInfo[timestampIdx]['did']
//         d3.select(`.station-${stationId}`).classed('timestampStationHighlight', true).moveToFront()
//         d3.select(`.trip-${timestampIdx}`).classed('timestampGpsHighlight', true).moveToFront()
//
//
//
//         let startPoint = [tripInfo[timestampIdx]['gdLng'], tripInfo[timestampIdx]['gdLat']]
//         let endPoint = [_this.stationLocation[stationId]['gdLng'], _this.stationLocation[stationId]['gdLat']]
//
//         let startLngLat = _this.map.lngLatToContainer(startPoint)
//         let endLngLat = _this.map.lngLatToContainer(endPoint)
//
//         _this.lineContainer.append('line')
//             .attr('x1', startLngLat.x)
//             .attr('y1', startLngLat.y)
//             .attr('x2', endLngLat.x)
//             .attr('y2', endLngLat.y)
//             .style('stroke', 'red')
//
//     })
//
// }

// DrawMap.prototype.drawSvg = function(container, tripInfo, tripStationData) {
//     const _this = this
//     container.selectAll('*').remove()
//     // console.log('svgContainer: ', container)
//     // console.log('tripInfo: ', tripInfo)
//     console.log('tripStationData: ', tripStationData)
//
//     this.lineContainer = container.append('g').attr('class', 'connectLine')
//     this.stationConnectedPointContainer = container.append('g').attr('class', 'stationConnectedPoint')
//
//     let stationIdDict = this.stationIdDict
//     // console.log('stationIdDict: ', stationIdDict)
//     let stationNotInRange = []
//     for (let i=0; i<tripInfo.length; i++) {
//         if(stationIdDict.hasOwnProperty(tripInfo[i]['did'])) continue
//
//         let item = _this.stationLocation[tripInfo[i]['did']]
//         stationNotInRange.push({
//             'name': tripInfo[i]['did'],
//             'lnglat': [item['gdLng'], item['gdLat']],
//             'id': i,
//             'type': 'stationNotInRange'
//         })
//     }
//     // console.log('stationNotInRange: ', stationNotInRange)
//
//     container.append('g').attr('class', 'tripStation')
//         .selectAll('circle')
//         .data(tripStationData, function(d) {
//             return d;
//         })
//         .join('circle')
//         .attr('class', (d) => `station-${d['name']} stationPoint`)
//         .attr('cx', (d) => {
//             let lngLat = this.map.lngLatToContainer(d['lnglat'])
//             return lngLat.x
//         })
//         .attr('cy', (d) => {
//             let lngLat = this.map.lngLatToContainer(d['lnglat'])
//             return lngLat.y
//         })
//         .attr('r', 3)
//
//     container.append('g').attr('class', 'stationNotInRange')
//         .selectAll('circle')
//         .data(stationNotInRange, function(d) {
//             return d;
//         })
//         .join('circle')
//         .attr('class', (d) => `station-${d['name']} stationPoint`)
//         .attr('cx', (d) => {
//             let lngLat = this.map.lngLatToContainer(d['lnglat'])
//             return lngLat.x
//         })
//         .attr('cy', (d) => {
//             let lngLat = this.map.lngLatToContainer(d['lnglat'])
//             return lngLat.y
//         })
//         .attr('r', 6)
//
//
//     container.append('g').attr('class', 'tripInfo')
//         .selectAll('circle')
//         .data(tripInfo, function(d) {
//             return d;
//         })
//         .join('circle')
//         .attr('class', (_, i) => {
//             if (i==0) {
//                 return `trip-${i} gpsPoint tripStartPoint`
//             } else if (i == tripInfo.length-1) {
//                 return `trip-${i} gpsPoint tripEndPoint`
//             } else {
//                 return `trip-${i} gpsPoint`
//             }
//
//         })
//         .attr('cx', (d) => {
//             let lngLat = this.map.lngLatToContainer([d['gdLng'], d['gdLat']])
//             return lngLat.x
//         })
//         .attr('cy', (d) => {
//             let lngLat = this.map.lngLatToContainer([d['gdLng'], d['gdLat']])
//             return lngLat.y
//         })
//         .attr('r', (_, i) => {
//             if (i ==0 || i == tripInfo.length-1) {
//                 return 8
//             }
//             else {
//                 return 3
//             }
//         })
//         .on('mouseover', function(d, i) {
//             // console.log('over: ', d)
//             d3.select(`.station-${d['did']}`).classed('stationHighlight', true).moveToFront()
//
//             d3.select(`.trip-${i}`).classed('gpsHighlight', true).moveToFront()
//
//
//             let connectStationData = d3.select(`.station-${d['did']}`).data()
//
//             let startPoint = [d['gdLng'], d['gdLat']]
//             let endPoint = connectStationData[0]['lnglat']
//
//             let startLngLat = _this.map.lngLatToContainer(startPoint)
//             let endLngLat = _this.map.lngLatToContainer(endPoint)
//
//             _this.lineContainer.append('line')
//                 .attr('x1', startLngLat.x)
//                 .attr('y1', startLngLat.y)
//                 .attr('x2', endLngLat.x)
//                 .attr('y2', endLngLat.y)
//                 .style('stroke', 'red')
//
//         })
//         .on('mouseout', function(d, i) {
//             // console.log('over: ', d['did'])
//             d3.select(`.station-${d['did']}`).classed('stationHighlight', false)
//             d3.select(`.trip-${i}`).classed('gpsHighlight', false)
//             _this.lineContainer.selectAll('*').remove()
//         })
//
//
// }


// DrawMap.prototype.renderUpdate = function(container) {
//     container.selectAll('circle.stationPoint')
//         .attr('cx', (d) => {
//             let lngLat = this.map.lngLatToContainer(d['lnglat'])
//             return lngLat.x
//         })
//         .attr('cy', (d) => {
//             let lngLat = this.map.lngLatToContainer(d['lnglat'])
//             return lngLat.y
//         })
//
//
//     container.selectAll('circle.gpsPoint')
//         .attr('cx', (d) => {
//             let lngLat = this.map.lngLatToContainer([d['gdLng'], d['gdLat']])
//             return lngLat.x
//         })
//         .attr('cy', (d) => {
//             let lngLat = this.map.lngLatToContainer([d['gdLng'], d['gdLat']])
//             return lngLat.y
//         })
//
//
//     if (d3.select('g.station2GPSLine').selectAll('line').data().length == 0) return
//
//     let connectStationLngLat = [this.stationLocation[this.stationId]['gdLng'], this.stationLocation[this.stationId]['gdLat']]
//     let stationPoint = connectStationLngLat
//     let stationPointLngLat = this.map.lngLatToContainer(stationPoint)
//
//     d3.select('g.station2GPSLine').selectAll('line')
//         .attr('x1', stationPointLngLat.x)
//         .attr('y1', stationPointLngLat.y)
//         .attr('x2', (d) => this.map.lngLatToContainer([this.tripInfo[d].gdLng, this.tripInfo[d].gdLat]).x)
//         .attr('y2', (d) => this.map.lngLatToContainer([this.tripInfo[d].gdLng, this.tripInfo[d].gdLat]).y)
// }


// DrawMap.prototype.drawTripStationCanvas = function (tripStation) {
//     this.map.clearMap()
//     // let stationData = []
//
//     var style = [{
//         url: 'https://webapi.amap.com/images/mass/mass0.png',
//         anchor: new AMap.Pixel(4, 4),
//         size: new AMap.Size(7, 7),
//         zIndex: 3,
//     }, {
//         url: 'https://webapi.amap.com/images/mass/mass1.png',
//         anchor: new AMap.Pixel(4, 4),
//         size: new AMap.Size(7, 7),
//         zIndex: 2,
//     }, {
//         url: 'https://webapi.amap.com/images/mass/mass2.png',
//         anchor: new AMap.Pixel(3, 3),
//         size: new AMap.Size(5, 5),
//         zIndex: 1,
//     }
//     ];
//
//
//     let stationMarks = new AMap.MassMarks(tripStation, {
//         zIndex: 5,  // 海量点图层叠加的顺序
//         zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
//         style: style  // 设置样式对象
//     });
//     // 将海量点添加至地图实例
//     stationMarks.setMap(this.map);
// }


// DrawMap.prototype.drawTrip = function (data) {
//     // this.map.clearMap()
//     // this.drawStation()
//     let markData = []
//
//     for(let i=0; i<data.length; i++) {
//         let item = data[i]
//         markData.push({
//             lnglat: [item['gdLng'], item['gdLat']],
//             name: item['time'],
//             id: i,
//             style: 1
//         })
//     }
//
//     var style = [{
//         url: 'https://webapi.amap.com/images/mass/mass0.png',
//         anchor: new AMap.Pixel(6, 6),
//         size: new AMap.Size(11, 11),
//         zIndex: 3,
//     }, {
//         url: 'https://webapi.amap.com/images/mass/mass1.png',
//         anchor: new AMap.Pixel(4, 4),
//         size: new AMap.Size(7, 7),
//         zIndex: 2,
//     }, {
//         url: 'https://webapi.amap.com/images/mass/mass2.png',
//         anchor: new AMap.Pixel(3, 3),
//         size: new AMap.Size(5, 5),
//         zIndex: 1,
//     }
//     ];
//
//
//     let massMarks = new AMap.MassMarks(markData, {
//         zIndex: 5,  // 海量点图层叠加的顺序
//         zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
//         style: style  // 设置样式对象
//     });
//     // massMarks.setData(markData);
//     // 将海量点添加至地图实例
//     massMarks.setMap(this.map);
//
// }

export default DrawMap