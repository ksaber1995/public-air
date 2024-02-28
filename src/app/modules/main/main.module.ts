import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SeverityBarComponent } from './components/severity-bar/severity-bar.component';
import { StationMarkerComponent } from './components/station-marker/station-marker.component';
import { SharedModule } from '../shared/shared.module';
import { TabComponent } from './components/tab/tab.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeadersComponent } from './component/headers/headers.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RequestDataComponent } from './components/request-data/request-data.component';
import { ContainerComponent } from './components/container/container.component';


@NgModule({
  declarations: [
    HomeComponent,
    SeverityBarComponent,
    StationMarkerComponent,
    TabComponent,
    StationDetailsComponent,
    HistoryChartComponent,
    HeadersComponent,
    SuccessMessageComponent,
    ContactUsComponent,
    RequestDataComponent,
    ContainerComponent,

  ],

  imports: [
    CommonModule,
    CarouselModule,
    MainRoutingModule,
    GoogleMapsModule,
    SharedModule,
    NgChartsModule

  ]
})
export class MainModule { }
