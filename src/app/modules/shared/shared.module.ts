import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';


const importsExports = [
  NzButtonModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...importsExports
  ],
  exports:[
    ...importsExports
  ]
})
export class SharedModule { }
