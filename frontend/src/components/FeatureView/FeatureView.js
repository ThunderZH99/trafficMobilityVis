// /* global d3 $ */
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'
import DrawFeature from './drawFeature.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'FeatureView',
    components: {
    },
    props: {
    },
    data() {
        return {
            containerId: 'featureContainer'
        }
    },
    watch: {
    },
    mounted: function () {
        this.drawFeature = new DrawFeature(this.containerId)
    }
}
