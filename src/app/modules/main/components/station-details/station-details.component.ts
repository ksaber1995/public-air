import { Component, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ExtendedStation } from '../../../shared/models/Station';
import { StationContent } from './model';

interface IModalData {
  station: ExtendedStation
}

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrl: './station-details.component.scss'
})
export class StationDetailsComponent {
  isVisibleMiddle = true;
  title
  subtitle
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);
  station: ExtendedStation
  content: any;
  handleCancelMiddle(){

  }

  constructor(){
    this.station = this.nzModalData.station

    this.content =  StationContent[this.station.aqi[0].status[0].sequence]
    console.log(this.station,'modal data')
  }

  handleOkMiddle(){

  }

  destroyModal(): void {
    this.#modal.destroy({ data: 'this the result data' });
  }
}
