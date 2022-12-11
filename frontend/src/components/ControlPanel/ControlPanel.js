// /* global d3 $ */
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService.js'
import ToolBox from './ToolBox.js'
// import pipeService from '../../service/pipeService'

export default {
    name: 'ControlPanel',
    components: {
    },
    props: {
    },
    data() {
        return {
            containerId: 'controlPanelContainer'
        }
    },
    watch: {
    },
    mounted: function () {
        this.toolBox = new ToolBox(this.containerId)


    }
}
