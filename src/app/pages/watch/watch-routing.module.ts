import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchPage } from './watch.page';

const routes: Routes = [
  {
    path: '',
    component: WatchPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchPageRoutingModule {}
