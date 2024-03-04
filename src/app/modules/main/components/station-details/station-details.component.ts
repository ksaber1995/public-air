import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { ExtendedStation } from '../../../shared/models/Station';
import { ColorsSequence } from '../../../shared/models/colors';
import { VariablesCodes } from '../../../shared/models/variables';
import { LocalizationService } from '../../../shared/services/localization.service';
import { SwaggerService } from './../../../shared/services/swagger.service';
import { EnStationContent, StationContent, lightColors } from './model';

interface IModalData {
  station: ExtendedStation,
  activeItemId: VariablesCodes
}

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrl: './station-details.component.scss'
})

export class StationDetailsComponent implements OnInit {
  activeCode;
  lang$ = this.localization.getCurrentLanguage()
  title
  subtitle
  lightColors = lightColors
  ColorsSequence = ColorsSequence
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);
  station: ExtendedStation
  history: any;
  content;
  activeHistoryData$ = new BehaviorSubject(null)


  constructor(private swagger: SwaggerService, private http: HttpClient, private localization: LocalizationService) {
    this.station = this.nzModalData.station
    this.activeCode = this.nzModalData.activeItemId
    const pm10 = this.station.variables.find(res=> res.variable.code === VariablesCodes.PM10)
    const pm25 = this.station.variables.find(res=> res.variable.code === VariablesCodes.PM25)

    this.station.variables = [ ...this.station.variables.filter(res=> res.variable.code !== VariablesCodes.PM10 && res.variable.code !== VariablesCodes.PM25)]
    
    if(pm25){
      this.station.variables.unshift(pm25)
    }
    if(pm10){
      this.station.variables.unshift(pm10)
    }
    this.lang$.subscribe(res => {
      if (res === 'ar') {

        this.content = StationContent[this.station.aqi[0].sequence || 0]
      } else {
        this.content = EnStationContent[this.station.aqi[0].sequence || 0]

      }
    })

  }

  ngOnInit(): void {

    this.swagger.getHistory(this.nzModalData.station.code).subscribe(res => {
      
      this.history = res;
      
      this.changeActiveItem(this.activeCode)
    })
  }



  destroyModal(): void {
    this.#modal.destroy({ data: 'this the result data' });
  }

  downloadPdf() {
    // Path to the PDF file within the assets folder
    const pdfUrl = 'assets/pdf/aqi.pdf';

    // Make a GET request to fetch the PDF file as a blob
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for the downloaded file
      link.setAttribute('download', 'aqi.pdf');

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }

  changeActiveItem(code) {
    this.activeCode = code;

    if (!this.activeCode) {
      this.activeHistoryData$.next(this.history);


    } else {

      const activeHistoryData = this.history.variables.find(item => item.variable.code === code)
      this.activeHistoryData$.next(activeHistoryData);


    }

  }

  onDragStarted(event: any) {
    console.log(event, 'Drag started');
  }

  // Drag move event handler
  onDragMoved(event: any) {
    console.log(event, 'Dragging');
  }

  // Drag end event handler
  onDragEnded( event:any) {
    console.log( event, 'Drag ended');
  }
}
