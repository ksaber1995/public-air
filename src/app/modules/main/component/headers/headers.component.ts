import { arContent } from '../../../../lang/ar';
import { enContent } from '../../../../lang/en';
import {
  Lang,
  LocalizationService,
} from './../../../shared/services/localization.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss',
})
export class HeadersComponent {
  lang$ = this.localization.getCurrentLanguage();
  content;

  constructor(private localization: LocalizationService) {}

  ngOnInit(): void {
    this.localization.getCurrentContent().subscribe((res) => {
      this.content = res;
    });
  }

  setLang(lang){
    this.localization.setLang(lang)
  }

}
