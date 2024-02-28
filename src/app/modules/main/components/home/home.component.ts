import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest, map } from 'rxjs';
import { ExtendedStation } from '../../../shared/models/Station';
import { BreakPoint } from '../../../shared/models/breakPoint';
import { ColorsSequence } from '../../../shared/models/colors';
import { VariablesCodes } from '../../../shared/models/variables';
import { BreakPointsResponse, SwaggerService } from '../../../shared/services/swagger.service';
import { convertToUTC4 } from '../../../shared/services/utilities/date';
import { StationDetailsComponent } from '../station-details/station-details.component';
import { ControllerItem, ControllerItems, MapClasses } from './model';
import { LocalizationService } from '../../../shared/services/localization.service';

var omanBounds = {
  north: 26.387812,
  south: 16.645589,
  west: 52.0,
  east: 59.8363
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('googleMap') googleMap: GoogleMap

  lang$ = this.localization.getCurrentLanguage();
  // lang = this.localization.getCurrentLanguageValue()

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
  mapType: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP

  anchor = new google.maps.Point(15, 15);
  scaledSize = new google.maps.Size(30, 30)
  zeroSize = new google.maps.Size(1, 1)
  zoom = 6.5



  constructor(
    private swagger: SwaggerService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private localization: LocalizationService

    ) {

    this.options = {
      // center: {
      //   lat: 21.4735,
      //   lng: 55.9754
      // },

      center:  { lat: 21.4735, lng: 58.545284 },

      fullscreenControl: false,

      zoomControl: false,
      // mapTypeControl: true,
      // mapTypeControlOptions:{
      //   position: google.maps.ControlPosition.RIGHT_BOTTOM,

      // },




      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,  // Use 'terrain' map type to emphasize borders

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

        this.lastUpdate = convertToUTC4(new Date(lastUpdateStation.aqi[0].aggregated_at))

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
      this.unit = ''

    }

  }

  onControllerClick(item: ControllerItem): void {
    this.activeItemId = item.id

    if (this.activeItemId === VariablesCodes.AQI || this.activeItemId === VariablesCodes.PM25 || this.activeItemId === VariablesCodes.PM10) {

      this.anchor = new google.maps.Point(15, 15);
      this.scaledSize = new google.maps.Size(30, 30)
    } else {
      this.anchor = new google.maps.Point(20, 20);
      this.scaledSize = new google.maps.Size(40, 40)

    }

    this.getActiveBreakpointsRange()
  }

  toggleSatelliteView(map: GoogleMap): void {
    this.mapType = this.mapType === google.maps.MapTypeId.ROADMAP ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP;

  }

  zoomIn(map: GoogleMap) {
    if (this.zoom < 22)
      this.zoom++
  }

  zoomOut(map: GoogleMap) {

    if (this.zoom >= 1)
      this.zoom--

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
        activeItemId  : [VariablesCodes.PM25, VariablesCodes.PM10].includes(this.activeItemId) ? this.activeItemId : null
      },
      nzCloseIcon: null,
      nzFooter: null,
      nzClassName: 'station-details-modal',
      nzWidth: '60%',

    });

    const instance = modal.getContentComponent();
  }


}
