// /* global d3 $ */
import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService'
import DrawText from './drawText.js'

export default {
    name: 'TextView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            containerId: 'textContainer',
            textData : {}
        }
    },
    watch: {
        textData: function (textData) {
            this.drawText.layout(textData)
        }
    },
    mounted: function () {
        this.drawText = new DrawText(this.containerId)


        // https://embed.plnkr.co/wJDcZmkEzXaLVhuLZmcQ/

        dataService.linechartData((data) => {
            console.log('linechartData testing: ', data['data']) 

            let linechartData = data['data']
            console.log(linechartData)
            // this.drawFace.layout(linechartData)
        })
        
    }

}
