import { Component, OnInit, ViewChild } from '@angular/core';
import { SwaggerService } from '../../../shared/services/swagger.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ControllerItem, ControllerItems, MapClasses } from './model';
import { ColorsSequence } from '../../../shared/models/colors';
import { VariableIds } from '../../../shared/models/variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ColorsSequence = ColorsSequence
  MapClasses = MapClasses
  navigatorPosition
  public options: google.maps.MapOptions
  stations$ = this.swagger.getStations()
  breakPoints$ = this.swagger.getBreakPoints()
  controllerItems = ControllerItems
  lastUpdate = new Date()
  showIcon = true;

  VariableIds = VariableIds;

  IconPath = 'aqi[0]?.status[0]?.sequence'

  markerOptions: google.maps.MarkerOptions = {
    clickable: true,
    // animation: google.maps.Animation.BOUNCE
    zIndex: 5000,

      // label: {
      //   text:'',
      //   fontSize: '20px',
      //  fontWeight: 'bold',
      //  color: 'blue' 
      // }
  };

  labelConfig =   {
    text:'',
    fontSize: '20px',
   fontWeight: 'bold',
   color: 'blue' 
  }

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  isloaded: boolean;
  activeItemId: VariableIds = 1;

  constructor(private swagger: SwaggerService) {
    // navigator.geolocation.getCurrentPosition((position) => {
    // this.navigatorPosition = position;
    // console.log('here', this.navigatorPosition.coords.latitude)

    this.options = {
      center: {
        lat: 23.49366666666641,
        lng: 58.24966666666646
        // lng: this.navigatorPosition.coords.longitude,
      },
      // zoomControl: true,
      mapTypeControl: false,
      zoom: 9,
      mapTypeId: 'terrain', // Use 'terrain' map type to emphasize borders

      streetViewControl: false,
      styles: [
        // {
        //   "featureType": "water",
        //   "elementType": "geometry",
        //   "stylers": [
        //     { color: '#96cccb99' }


        //   ]
        // },
        // {
        //   "featureType": "landscape",
        //   "elementType": "geometry",
        //   "stylers": [

        //     { color: '#86b4b380' }

        //   ]
        // }
      ]
    };
    // })
  }


  infoWindowOptions: google.maps.InfoWindowOptions = {
    pixelOffset: {
      width: 0, height: -30, equals(other) {
        return this.width === other.width && this.height === other.height;
      },
    }, // Adjust the position of the info window relative to the marker
  };




  ngOnInit(): void {
    setTimeout(res => {
      this.isloaded = true;
    }, 10000)

    this.stations$.subscribe(res => {
      console.log(res, 'stations')


    })


    this.breakPoints$.subscribe(res => {
      console.log(res, 'break points')


    })
  }








  onControllerClick(item: ControllerItem): void {
    this.activeItemId = item.id
    this.showIcon = this.activeItemId <= 3

    // console.log(karim)
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker, false);
  }

  public closeInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.close();
  }


}
