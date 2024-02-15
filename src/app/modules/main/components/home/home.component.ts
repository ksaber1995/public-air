import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BreakPointsResponse, SwaggerService } from '../../../shared/services/swagger.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ControllerItem, ControllerItems, MapClasses } from './model';
import { ColorsSequence } from '../../../shared/models/colors';
import { VariablesCodes } from '../../../shared/models/variables';
import { combineLatest } from 'rxjs';
import { ExtendedStation } from '../../../shared/models/Station';
import { BreakPoint, VariableBreakPoint } from '../../../shared/models/breakPoint';
import { StationDetailsComponent } from '../station-details/station-details.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('googleMap') googleMap: GoogleMap

  ColorsSequence = ColorsSequence
  MapClasses = MapClasses
  navigatorPosition
  public options: google.maps.MapOptions
  stations$ = this.swagger.getStations()
  breakPoints$ = this.swagger.getBreakPoints()
  controllerItems = ControllerItems
  lastUpdate: Date;

  VariablesCodes = VariablesCodes;

  markerOptions: google.maps.MarkerOptions = {
    clickable: true,
    // animation: google.maps.Animation.BOUNCE
    zIndex: 5000,

    // label: {
    //   text:'',
    //   fontSize: '20px',
    //  fontWeight: 'bold',
      
    // }
  };

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  isLoaded: boolean;
  activeItemId: VariablesCodes = VariablesCodes.AQI;

  stations: ExtendedStation[];

  breakPoints: BreakPointsResponse;
  activeBreakPoints: BreakPoint[] = [];
  unit: string = 'ug/m3';
  satelliteViewEnabled: boolean;
  mapType : google.maps.MapTypeId = google.maps.MapTypeId.TERRAIN

  anchor = new  google.maps.Point(30, 30);
  scaledSize = new google.maps.Size(60, 60)
  zeroSize = new google.maps.Size(1, 1)


  constructor(private swagger: SwaggerService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {

    this.options = {
      center: {
        lat: 21.4735, 
        lng: 55.9754         
      },

      fullscreenControl: false,
      
      // zoomControl: true,
      // mapTypeControl: true,
      // mapTypeControlOptions:{
      //   position: google.maps.ControlPosition.RIGHT_BOTTOM,
        
      // },
      zoom: 7,
      mapTypeId: 'terrain', // Use 'terrain' map type to emphasize borders

      mapTypeControl: false,

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
      .subscribe(([stations, breakpoints]) => {
        this.stations = stations;
        const lastUpdateStation = this.stations.reduce((a, b) => {
          let date = a.aqi[0].aggregated_at > b.aqi[0].aggregated_at

          if (date) return a; else return b
        })

        this.lastUpdate = new Date(lastUpdateStation.aqi[0].aggregated_at)

        this.breakPoints = breakpoints
        this.getActiveBreakpointsRange()
        this.isLoaded = true
      })
  }

  getActiveBreakpointsRange() {
    if (this.activeItemId === VariablesCodes.AQI) {
      this.activeBreakPoints = this.breakPoints.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)
      this.unit = ''

    } else if ([VariablesCodes.PM25, VariablesCodes.PM10].includes(this.activeItemId)) {
      // const variableId = 
      this.unit = 'ug/m3'


      this.activeBreakPoints =
        this.breakPoints.variables.find(breakpoint => breakpoint.code === VariablesCodes[this.activeItemId])?.variable_breakpoints
        ?.sort((a, b) => a.sequence - b.sequence)
    } else {
      this.activeBreakPoints = []
    }

  }

  onControllerClick(item: ControllerItem): void {
    this.activeItemId = item.id

    
    this.getActiveBreakpointsRange()
  }

  toggleSatelliteView(map: GoogleMap): void {
    this.mapType = this.mapType === google.maps.MapTypeId.TERRAIN? google.maps.MapTypeId.SATELLITE: google.maps.MapTypeId.TERRAIN;

  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker, false);
  }

  public closeInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.close();
  }

  onStationClick(station: ExtendedStation) {
    this.createComponentModal(station)
  }


  createComponentModal(station: ExtendedStation): void {
    const modal = this.modal.create<StationDetailsComponent, any>({
      nzContent: StationDetailsComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        station,
      },
      nzCloseIcon: null,
      nzFooter: null,
      nzClassName: 'station-details-modal',
      nzWidth: '60%',

    });

    const instance = modal.getContentComponent();
  }

 
}
