import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiRoutingModule } from './ui-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    FormsModule,
    QRCodeModule
  ]
})
export class UiModule { }
