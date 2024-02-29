import { Component } from '@angular/core';
import { arContent } from '../../../../lang/ar';
import { enContent } from '../../../../lang/en';
import {
  Lang,
  LocalizationService,
} from './../../../shared/services/localization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwaggerService } from '../../../shared/services/swagger.service';
@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrl: './request-data.component.scss'
})
export class RequestDataComponent {
  lang$ = this.local.getCurrentLanguage();
  stations;
  content;

  allValuesChecked = false

  variables = [
    { name: 'PM10', checked: false },
    { name: 'PM25', checked: false },
    { name: 'SO3', checked: false },
    { name: 'CO', checked: false },
    { name: 'SO2', checked: false },
  ]


  informationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    station: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    variables: new FormControl('')
  });


  constructor(
    private local: LocalizationService,
    private swagger: SwaggerService,

  ) { }

  ngOnInit(): void {
    this.local.getCurrentContent().subscribe((res) => {
      this.content = res;
    });
    this.swagger.getStations().subscribe(res => {
      this.stations = res
    })
  }




  onVariablesChange() {
    this.allValuesChecked = this.variables.every(variable => variable.checked)
  }

  toggleSelectAll() {
    const allValuesChecked = this.variables.every(variable => variable.checked)

    if (allValuesChecked) {
      this.variables.forEach(variable => variable.checked = false)
    } else {
      this.variables.forEach(variable => variable.checked = true)
    }
  }
}
