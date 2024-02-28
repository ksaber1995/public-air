import { Component } from '@angular/core';
import { arContent } from '../../../../lang/ar';
import { enContent } from '../../../../lang/en';
import {
  Lang,
  LocalizationService,
} from './../../../shared/services/localization.service';
@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.scss'
})
export class SuccessMessageComponent {
  lang = this.local.getCurrentLanguage();
  content;

  constructor(private local: LocalizationService) {}

  ngOnInit(): void {
    this.local.getCurrentContent().subscribe((res) => {
      this.content = res;
    });
  }
}
