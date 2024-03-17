import { Component } from '@angular/core';
import { arContent } from '../../../../lang/ar';
import { enContent } from '../../../../lang/en';
import {
  Lang,
  LocalizationService,
} from './../../../shared/services/localization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwaggerService } from '../../../shared/services/swagger.service';
import { CaptchaKey } from '../../../../constants/keys';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrl: './request-data.component.scss'
})
export class RequestDataComponent {
  lang$ = this.local.getCurrentLanguage();
  stations;
  content;
  recaptcha_token;
  isCaptchaError: any;
  allValuesChecked = false
  CaptchaKey = CaptchaKey

  variables = [
    { name: 'PM10', checked: false },
    { name: 'PM25', checked: false },
    { name: 'SO3', checked: false },
    { name: 'CO', checked: false },
    { name: 'SO2', checked: false },
  ]


  informationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    phone_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    station: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    variables: new FormControl(''),
  });


  constructor(
    private local: LocalizationService,
    private swagger: SwaggerService,
    private router: Router,
    private message: NzMessageService
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

  save() {

    const subject = {
      from: this.informationForm.value.startDate,
      to: this.informationForm.value.endDate,
      stations: [{ station_code: this.informationForm.value.station }],

      variables: this.variables.filter(res => res.checked).map(res => ({ variable_code: res.name }))
    }


    const body = {
      title: this.informationForm.value.name,
      email: this.informationForm.value.email,
      fullname: this.informationForm.value.name,
      phone_number: this.informationForm.value.phone_number,
      recaptcha_token: this.recaptcha_token,
      subject
    }

    this.swagger.requestData(body).subscribe(res => {
      this.router.navigate(['/success-request'])
    }, err => {
      if (err?.status === 200) {
        this.router.navigate(['/success-request'])
      } else {
        this.message.create('error', err?.error?.error || "Can't send your request");
      }

    })
  }

  resolve(e) {

    this.recaptcha_token = e;
  }

  captchaError(error) {
    this.recaptcha_token = null;
    this.isCaptchaError = error
  }
}
