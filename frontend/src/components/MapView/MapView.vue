<template src='./MapView.html'></template>

<script src='./MapView.js'></script>

<style>
    .card {
        margin-bottom: 10px;
        /* height: 400px; */
        border-radius: 5px;
    }

    .card-header {
        font-size: 12px;
        padding: 6px 12px;
        height: 36px;
    }

    .card-block {
        padding: 0px;
        position: relative;
    }

    text {
        display: block;
        white-space: nowrap;
    }

    #mapContainer {
        /* height: 243px; */
        height: 350px;
    }


    .gpsPoint {
        fill: #fec44f;
    }

    .stationPoint {
        fill: #2171b5;
    }

    .stationHighlight {
        fill: #ef3b2c;
    }

    .gpsHighlight {
        stroke: #ef3b2c;
    }

    .tripStartPoint {
        fill: #41ae76;
    }

    .tripEndPoint {
        fill: #9e9ac8;
    }

    .timestampGpsHighlight {
        stroke: #ef3b2c;
    }

    .timestampStationHighlight {
        stroke: #ef3b2c;
    }

</style>
