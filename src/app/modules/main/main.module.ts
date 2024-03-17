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
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CookieService } from 'ngx-cookie-service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RecaptchaModule } from "ng-recaptcha";
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input-v16';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
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
    NgChartsModule,
    FormsModule,
    NgxMatIntlTelInputComponent,
    NzCheckboxModule,
    RecaptchaModule,
    NzInputModule,
    NzMessageModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers:[
    CookieService,
    provideNativeDateAdapter()
  ]
})
export class MainModule { }
