import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
const Icons = [

]

const importsExports = [
  NzButtonModule,
  NzModalModule,
  NzDividerModule,
  NzGridModule,
  NzDropDownModule,
  ReactiveFormsModule,
  NzRadioModule

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...importsExports,
    NzIconModule.forRoot(Icons),
    ReactiveFormsModule

  ],
  exports: [
    ...importsExports,
    NzIconModule
  ]
})
export class SharedModule { }
