import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WatchPage } from './watch.page';

import { WatchPageRoutingModule } from './watch-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WatchPageRoutingModule
  ],
  declarations: [WatchPage]
})
export class WatchPageModule {}
