import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RequestDataComponent } from './components/request-data/request-data.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'requestData',
        component: RequestDataComponent,
      },
      {
        path: 'success-request',
        component: SuccessMessageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
//dfsa
