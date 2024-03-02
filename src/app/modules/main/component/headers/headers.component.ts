import { Component } from '@angular/core';
import {
  LocalizationService
} from './../../../shared/services/localization.service';

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
