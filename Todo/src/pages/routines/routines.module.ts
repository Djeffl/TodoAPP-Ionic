import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutinesPage } from './routines';

@NgModule({
  declarations: [
    RoutinesPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutinesPage),
  ],
})
export class RoutinesPageModule {}
