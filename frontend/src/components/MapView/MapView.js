// /* global d3 $ */
import dataService from '../../service/dataService.js'
import DrawMap from './drawMap.js'
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'

export default {
    name: 'MapView',
    components: {
    },
    props: {
        // videoId: String,
        // videoData: Object
    },
    data() {
        return {
            containerId: 'mapContainer',
            stationData: {}
        }
    },
    watch: {
        // visionData: function () {
        //     this.drawMap.layout()
        // }
    },
    mounted: function () {
        this.drawMap = new DrawMap(this.containerId)

        dataService.stationInfo((data) => {
            this.stationData = data['data']
            this.drawMap.layout(this.stationData)
        })

    }
}
