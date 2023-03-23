import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EpisodeService} from "../../services/episode.service";
import {InfiniteScrollCustomEvent, LoadingController, NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {filter, map, Observable, of, startWith, switchMap} from "rxjs";
import {LoadingService} from "../../services/util/loading.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public latestEpisodes: Array<any> = [];
  public filteredEpisodes: Array<any> = [];
  searchControl = new FormControl();
  public pagedEpisodes: Array<any> = [];
  private pagedInfo: any = {};
  private currentIndex: number = 1;
  public isSelectedNowPlay : boolean = true;
  public isUpcoming : boolean = false;
  public isTopRated : boolean = false;
  public isPopular : boolean = false;

  constructor(private epiService: EpisodeService, private toastController: ToastController, public loadingService: LoadingService,public navCtrl: NavController) {
  }

  ngOnInit(): void {
    // getting 10 latest epis
    this.getLatestEpisodes();

    //implementing a search
    this.searchControl.valueChanges
      .pipe(
        startWith('')).subscribe(value => {
      this.filteredEpisodes = this.onSearch(value)
    });

    // getting epis with pagination
    this.getEpisodesWithPagination(this.currentIndex, null);
  }

  //getting 10 episodes from the API
  private getLatestEpisodes() {

    //presenting a loading overlay
    this.loadingService.present();

    this.epiService.getLatestEpisodes().subscribe({
        next: (res: any) => {
          this.latestEpisodes = res;

          this.filteredEpisodes = this.setRandomBanner(this.latestEpisodes);
        },
        error: () => {
          //presenting error toast
          this.presentErrorToast();
        },
        complete: () => {
          //dismissing a loading overlay
          this.loadingService.dismiss();
        }
      }
    )
  }


  // setting random image URL to the epi array
  public setRandomBanner(epiArray: Array<any>): Array<any> {
    epiArray.forEach(data => {
      let randomNum = Math.floor(Math.random() * 5) + 1
      data.image = "assets/images/epi-banners/e" + randomNum + ".png";
    });
    return epiArray;
  }

  //getting epis with pagination
  public getEpisodesWithPagination(page: number, event: any) {

    this.epiService.getEpisodesWithPagination(page,"").subscribe({
      next: (res: any) => {
        this.pagedInfo = res.info;

        res.results = this.setRandomBanner(res.results);
        res.results.forEach((value: any) => {
          this.pagedEpisodes.push(value);
        });

        if (event != null) {
          (event as InfiniteScrollCustomEvent).target.complete();
        }
      },
      error: (err) => {
        //presenting error toast
        this.presentErrorToast();
      }
    })
  }

  // searching name in the latest episode array
  onSearch(value: any) {
    return this.latestEpisodes.filter(item => item.name.toLowerCase().includes(value?.toLowerCase()));
  }

  public getNowPlayingEpisodes(){
    this.resetAllButtonStatus();
    this.isSelectedNowPlay = true;
    this.currentIndex = 1
    this.pagedEpisodes = [];
    this.getEpisodesWithPagination(this.currentIndex, null);
  }

  public getUpComingEpisodes(){
    this.resetAllButtonStatus();
    this.isUpcoming = true;
    this.currentIndex = 1
    this.pagedEpisodes = [];
    this.getEpisodesWithPagination(this.currentIndex, null);
  }

  public getTopRatedEpisodes(){
    this.resetAllButtonStatus();
    this.isTopRated = true;
    this.currentIndex = 1
    this.pagedEpisodes = [];
    this.getEpisodesWithPagination(this.currentIndex, null);
  }

  public getPopularEpisodes(){
    this.resetAllButtonStatus();
    this.isPopular = true;
    this.currentIndex = 1
    this.pagedEpisodes = [];
    this.getEpisodesWithPagination(this.currentIndex, null);
  }

  private resetAllButtonStatus(){
    this.isSelectedNowPlay = false;
    this.isUpcoming = false;
    this.isTopRated = false;
    this.isPopular = false;
  }

  async presentErrorToast() {
    let toast = await this.toastController.create({
      message: 'Something went wrong, please try again!',
      duration: 2000
    });
    await toast.present();
  }

  onNextPage(ev: any) {
    if (this.pagedInfo.next != null) {
      this.currentIndex++;
      this.getEpisodesWithPagination(this.currentIndex, ev);
    } else {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }

  onDetailPage(data:any){
    data.ids = data.characters.map((info:any)=>{ let ids = info.split("/"); return ids[ids.length - 1]});
    this.navCtrl.navigateForward('/details', {
      state:data
    });
  }
}
