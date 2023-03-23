import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs, TabsCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

  @ViewChild('mTabs') mTabs: IonTabs;

  // Custom Tab Icons
  public homeIcon = 'assets/icon/tabs/home.svg';
  public selectedHomeIcon = 'assets/icon/tabs/sl-home.svg';
  public searchIcon = 'assets/icon/tabs/search.svg';
  public selectedSearchIcon = 'assets/icon/tabs/sl-search.svg';
  public watchIcon = 'assets/icon/tabs/watch-l.svg';
  public selectedWatchIcon = 'assets/icon/tabs/sl-watch-l.svg';

  isHomeSelected = false;
  isSearchSelected = false;
  isWatchSelected = false;

  constructor() {
  }

  ionViewDidEnter() {
    let selectedTab = this.mTabs.getSelected();
    this.changeIconAccordingToActivatedTab(selectedTab === undefined ? "" : selectedTab);
  }

  // changing home icon
  changeHomeIcon(): void {
    this.resetAll();
    this.isHomeSelected = true;
  }

  //changing search icon
  changeSearchIcon(): void {
    this.resetAll();
    this.isSearchSelected = true;
  }

  //changing watch later icon
  changeWatchIcon(): void {
    this.resetAll();
    this.isWatchSelected = true;
  }

  //reset all icon states
  resetAll() {
    this.isHomeSelected = false;
    this.isSearchSelected = false;
    this.isWatchSelected = false;
  }

  //changing all the icons according to activated tab
  changeIconAccordingToActivatedTab(tabName: string) {
    switch (tabName) {
      case 'home' :
        this.isHomeSelected = true;
        break;
      case  'search' :
        this.isSearchSelected = true;
        break;
      case 'watch' :
        this.isWatchSelected = true;
    }
  }

  ionTabsDidChange(){

  }


}
