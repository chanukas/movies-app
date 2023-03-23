import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SearchPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
