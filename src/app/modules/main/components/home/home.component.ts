import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakPointsResponse, SwaggerService } from '../../../shared/services/swagger.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ControllerItem, ControllerItems, MapClasses } from './model';
import { ColorsSequence } from '../../../shared/models/colors';
import { VariableIds, VariablesCodes } from '../../../shared/models/variables';
import { combineLatest } from 'rxjs';
import { ExtendedStation } from '../../../shared/models/Station';
import { BreakPoint, VariableBreakPoint } from '../../../shared/models/breakPoint';

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
  isLoaded: boolean;
  activeItemId: VariableIds = 1;
  stations: ExtendedStation[];

  breakPoints: BreakPointsResponse;
  activeBreakPoints: BreakPoint[] | VariableBreakPoint[] = [];
  unit: string = 'ug/m3';

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
      width: 0, 
      height: 10, 
      equals(other) {
        return this.width === other.width && this.height === other.height;
      },
    }, // Adjust the position of the info window relative to the marker
  };

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    combineLatest([this.stations$, this.breakPoints$])
      .subscribe(([stations, breakpoints])=>{
        this.stations = stations;
        this.breakPoints = breakpoints
        this.getActiveBreakpointsRange()
        this.isLoaded = true 
      })
  }

  getActiveBreakpointsRange() {
    if(this.activeItemId === VariableIds.AQI){
      this.activeBreakPoints = this.breakPoints.aqi_breakpoints?.sort((a,b)=> a.sequence - b.sequence)
      this.unit = ''
      
    }else if([VariableIds.PM25, VariableIds.PM10].includes(this.activeItemId)){
      // const variableId = 
      this.unit = 'ug/m3'
      
      this.activeBreakPoints = this.breakPoints.variables_breakpoints.filter(breakpoint=> breakpoint.variable_id === VariablesCodes [this.activeItemId] )?.sort((a,b)=> a.sequence - b.sequence)
    }else{
      this.activeBreakPoints = []
    }
   
  }

  onControllerClick(item: ControllerItem): void {
    this.activeItemId = item.id
    this.showIcon = this.activeItemId <= 3
    this.getActiveBreakpointsRange()
    // console.log(karim)
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker, false);
  }

  public closeInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.close();
  }


}
