import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactWithToken } from '../../../shared/models/Contact';
import { SwaggerService } from '../../../shared/services/swagger.service';
import { LocalizationService } from './../../../shared/services/localization.service';
import { Codes } from './model';
import { CaptchaKey } from '../../../../constants/keys';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  lang = this.local.getCurrentLanguage();
  content;
  CaptchaKey = CaptchaKey
  recaptcha_token;

  informationForm = new FormGroup({
    name: new FormControl(null, [Validators.required, ,Validators.minLength(5), Validators.maxLength(100)]),
    phone_number: new FormControl(null, [Validators.required]),
    email: new FormControl(null , [Validators.required]),
    title: new FormControl(null , [Validators.required,Validators.minLength(5), Validators.maxLength(100)]),
    notes: new FormControl(null , [Validators.required,Validators.minLength(5), Validators.maxLength(5000)]),
  });

  myError = (controlName: string, errorName: string) => {
    return this.informationForm.controls[controlName].hasError(errorName);
  };

  isCaptchaError: any;
  codes = [];

  constructor(
    private local: LocalizationService,
    private swagger: SwaggerService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.local.getCurrentContent().subscribe((res) => {
      this.content = res;

    });

    this.lang.subscribe(lang=>{
      this.codes = Codes.map(res=> ({...res, label: lang === 'ar' ? res.arab_name + res.country_code : res.country_name + res.country_code}))

    })

    this.informationForm.valueChanges.subscribe(res=>{
      console.log(res)
      // console.log(this.informationForm.get('title').errors)
    })
  }

  save() {
    const body: ContactWithToken = {
      email: this.informationForm.value.email,
      phone_number: this.informationForm.value.phone_number,
      fullname: this.informationForm.value.name,
      title: this.informationForm.value.title,
      subject: this.informationForm.value.notes,
      recaptcha_token: this.recaptcha_token,
    };

    this.swagger.contactUs(body).subscribe((res) => {
      console.log(res, 'result');
      debugger
      this.router.navigate(['/success-request'])
    },err=>{
      if(err?.status === 200){
        this.router.navigate(['/success-request'])
      }else{
        this.message.create('error', err?.error?.error || "Can't send your request");
      }

    });
  }

  resolve(e) {

    this.recaptcha_token = e;
  }

  captchaError(error){
    this.recaptcha_token = null;
    this.isCaptchaError = error
  }
}
