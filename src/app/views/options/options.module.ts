import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomeComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent
  ]
})
export class OptionsModule { }
