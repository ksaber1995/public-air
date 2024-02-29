import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LocalizationService
} from './../../../shared/services/localization.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  lang = this.local.getCurrentLanguage();
  content;
  informationForm = new FormGroup({
    name: new FormControl('' , [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email : new FormControl('',[Validators.required]),
    notes: new FormControl('',[Validators.required])
  });

  constructor(private local: LocalizationService) {}

  ngOnInit(): void {
    this.local.getCurrentContent().subscribe((res) => {
      this.content = res;
    });
  }


}
