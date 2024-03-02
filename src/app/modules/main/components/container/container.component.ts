import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../../../shared/services/localization.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private localization: LocalizationService

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = true
    }, 1000);
    this.setLangs()
  }

  setLangs() {
    this.localization.getCurrentLanguage().subscribe(lang => {
      const title = document.getElementById('app-title');
      const body = document.getElementById('app-body');


      const html = document.getElementById('main-html');

      if (lang === 'ar') {
        title.innerText = 'نقي'
        body.className = 'rtl-body'
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'ar')

      } else {
        title.innerText = 'NAQI'
        body.className = 'ltr-body'
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')

      }
    })
  }
}
