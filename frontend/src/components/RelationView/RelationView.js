// /* global d3 $ */
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'
import DrawRelation from './drawRelation.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'RelationView',
    components: {
    },
    props: {
    },
    data() {
        return {
            containerId: 'relationContainer'
        }
    },
    watch: {
    },
    mounted: function () {
        this.drawRelation = new DrawRelation(this.containerId)


    }
}
