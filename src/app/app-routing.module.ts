import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent as OptionsHomeComponent } from './views/options/home/home.component';
import { HomeComponent as PopupHomeComponent } from './views/popup/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: PopupHomeComponent
  },
  {
    path: 'options',
    component: OptionsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
