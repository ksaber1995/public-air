import { Component, OnInit, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ExtendedStation } from '../../../shared/models/Station';
import { ColorsSequence } from '../../../shared/models/colors';
import { SwaggerService } from './../../../shared/services/swagger.service';
import { StationContent, lightColors } from './model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
interface IModalData {
  station: ExtendedStation
}

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrl: './station-details.component.scss'
})

export class StationDetailsComponent implements OnInit{
  activeCode;

  title
  subtitle
  lightColors = lightColors
  ColorsSequence = ColorsSequence
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);
  station: ExtendedStation
  history: any;
  content ;
  activeHistoryData$ = new BehaviorSubject(null)


  constructor(private swagger: SwaggerService, private http: HttpClient){
    this.station = this.nzModalData.station

    this.content = StationContent[this.station.aqi[0].sequence || 0]

  }

  ngOnInit(): void {

    this. swagger.getHistory(this.nzModalData.station.code).subscribe(res=>{      
      this.history = res;
      this.activeHistoryData$.next(this.history);
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

  changeActiveItem(code){
    this.activeCode = code;

    if(!this.activeCode){
      this.activeHistoryData$.next(this.history);


    }else{
      
      const activeHistoryData = this.history.variables.find(item => item.variable.code === code)
      this.activeHistoryData$.next(activeHistoryData);
    

    }

  }
}
