// /* global d3 $ */
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'
import DrawMobility from './drawMobility.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'MobilityView',
    components: {
    },
    props: {
    },
    data() {
        return {
            containerId: 'mobilityContainer'
        }
    },
    watch: {
    },
    mounted: function () {
        this.drawMobility = new DrawMobility(this.containerId)


    }
}
