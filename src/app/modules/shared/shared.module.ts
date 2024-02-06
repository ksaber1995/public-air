import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzIconModule } from 'ng-zorro-antd/icon';

const Icons =[

]

const importsExports = [
  NzButtonModule,
  NzModalModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...importsExports,
  NzIconModule.forRoot(Icons)

  ],
  exports:[
    ...importsExports,
    NzIconModule
  ]
})
export class SharedModule { }
