import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {InfiniteScrollCustomEvent, NavController, ToastController} from "@ionic/angular";
import {EpisodeService} from "../../services/episode.service";
import {debounceTime, distinctUntilChanged, filter, fromEvent, map} from "rxjs";
import {LoadingService} from "../../services/util/loading.service";

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit {

  searchControl = new FormControl();
  public pagedEpisodes: Array<any> = [];
  private pagedInfo: any = {};
  private currentIndex: number = 1;
  public isNotFound: boolean = false;

  constructor(private epiService: EpisodeService, private toastController: ToastController,
              public loadingService: LoadingService,private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.getEpisodesWithPagination(this.currentIndex, null, "");
    this.addTimeBetweenSearchKeys();

  }

  //getting epis with pagination
  public getEpisodesWithPagination(page: number, event: any, name: string) {

    this.loadingService.present();

    this.epiService.getEpisodesWithPagination(page, name).subscribe({
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
        if (err.status == 404) {
          this.isNotFound = true;
        } else {
          //presenting error toast
          this.presentErrorToast();
        }
        this.loadingService.dismiss();
      }, complete: () => {
        this.isNotFound = false;
        this.loadingService.dismiss();
      }
    })
  }

  async presentErrorToast() {
    let toast = await this.toastController.create({
      message: 'Something went wrong, please try again!',
      duration: 2000
    });
    await toast.present();
  }


  // setting random image URL to the epi array
  public setRandomBanner(epiArray: Array<any>): Array<any> {
    epiArray.forEach(data => {
      let randomNum = Math.floor(Math.random() * 5) + 1
      data.image = "assets/images/epi-banners/e" + randomNum + ".png";
    });
    return epiArray;
  }


  addTimeBetweenSearchKeys() {
    this.searchControl.valueChanges.pipe(
      // get value
      map((event: any) => {
        return event;
      })

      // Time in milliseconds between key events
      , debounceTime(1000)

      // subscription for response
    ).subscribe((text: string) => {

      this.currentIndex = 1;
      this.pagedEpisodes = [];
      this.getEpisodesWithPagination(this.currentIndex, null, text);
    });
  }

  onNextPage(ev: any) {

    if (this.pagedInfo.next != null) {
      this.currentIndex++;
      this.getEpisodesWithPagination(this.currentIndex, ev, "");
    } else {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }

  onBack() {
    this.navCtrl.back();
  }

  onDetailPage(data:any){
    data.ids = data.characters.map((info:any)=>{ let ids = info.split("/"); return ids[ids.length - 1]});
    this.navCtrl.navigateForward('/details', {
      state:data
    });
  }
}
