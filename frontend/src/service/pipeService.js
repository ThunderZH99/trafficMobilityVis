import Vue from 'vue'

var pipeService = new Vue({
    data: {
        FRAMETIME: 'frame_time',
        TRIPINFO: 'trip_info',  // temporal view 点击rect, 发送轨迹数据
        TRIPSTATION: 'trip_station', // map view 根据轨迹数据，后台查询基站数据后，发送轨迹和相关基站数据
        TRIPPOINT: 'trip_point', // trip view 鼠标在时间轴移动，获取trip对应的gps点timestampIdx并发送，在map view 接收数据，highlight相关点
        STATIONTRIP: 'station_trip' // trip view 鼠标在基站上移动，获取对应基站和连接的gps数据并发送，在map vieww 接收数据，highlight相关点
    },
    methods: {
        emitFrameTime: function (msg) {
            this.$emit(this.FRAMETIME, msg)
        },
        onFrameTime: function (callback) {
            this.$on(this.FRAMETIME, function (msg) {
                callback(msg)
            })
        },
        emitTripInfo: function (msg) {
            this.$emit(this.TRIPINFO, msg)
        },
        onTripInfo: function (callback) {
            this.$on(this.TRIPINFO, function (msg) {
                callback(msg)
            })
        },
        emitTripStation: function (msg) {
            this.$emit(this.TRIPSTATION, msg)
        },
        onTripStation: function (callback) {
            this.$on(this.TRIPSTATION, function (msg) {
                callback(msg)
            })
        },
        emitTripPoint: function (msg) {
            this.$emit(this.TRIPPOINT, msg)
        },
        onTripPoint: function (callback) {
            this.$on(this.TRIPPOINT, function (msg) {
                callback(msg)
            })
        },
        emitStationTrip: function (msg) {
            this.$emit(this.STATIONTRIP, msg)
        },
        onStationTrip: function (callback) {
            this.$on(this.STATIONTRIP, function (msg) {
                callback(msg)
            })
        }
    }
})

export default pipeService
