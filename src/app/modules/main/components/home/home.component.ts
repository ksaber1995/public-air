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

  constructor(private swagger: SwaggerService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
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
      .subscribe(([stations, breakpoints]) => {
        this.stations = stations;
        console.log(this.stations)
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

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker, false);
  }

  public closeInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.close();
  }

  onStationClick(station: ExtendedStation) {
    console.log(station)

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
      nzWidth: '50%',

    });

    const instance = modal.getContentComponent();
  }
}
