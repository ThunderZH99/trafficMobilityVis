// /* global d3 $ */
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'
import DrawSummary from './drawSummary.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'SummaryView',
    components: {
    },
    props: {
    },
    data() {
        return {
            containerId: 'summaryContainer'
        }
    },
    watch: {
    },
    mounted: function () {
        this.drawSummary = new DrawSummary(this.containerId)


    }
}
