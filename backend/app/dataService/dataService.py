# -*- coding: utf-8 -*-
import time
import json
import os


try:
    import GlobalVariable as GV
    import GPSTransform as GT
except ImportError:
    import app.dataService.GlobalVariable as GV
    import app.dataService.GPSTransform as GT

class DataService(object):
    def __init__(self):
        self.GV = GV

        with open(os.path.join(GV.DATA_FOLDER, 'station_location.json'), 'r') as rf:
            self.station_location = json.load(rf)
    
        print('=================================================')
        return

    def initialization(self, video_id):
        self.video_id = video_id
        result = {'test': 'test'}
        return result

    def test(self):
        print(self.GV.test)



    def get_station_info(self):
        file_path = os.path.join(GV.DATA_FOLDER, 'station_info.json')
        with open(file_path, 'r') as rf:
            station_info = json.load(rf)

        for item in station_info:
            wgs84_lng = float(item['lng'])
            wgs84_lat = float(item['lat'])
            gd_lng_lat = GT.wgs84_to_gcj02(wgs84_lng, wgs84_lat)  # wgs84转高德
            gd_lng, gd_lat = gd_lng_lat[0], gd_lng_lat[1]
            item['gdLng'] = gd_lng
            item['gdLat'] = gd_lat
        

        with open(os.path.join(GV.DATA_FOLDER, 'station_location.json'), 'r') as rf:
            station_location = json.load(rf)

        result = {
            'stationInfo': station_info,
            'stationLocation': station_location
        }

        return result



if __name__ == '__main__':
    print('start')
    dataService = DataService()







