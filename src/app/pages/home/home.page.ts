import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EpisodeService} from "../../services/episode.service";
import {ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {filter, map, Observable, of, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public latestEpisodes: Array<any> = [];
  public filteredEpisodes: Array<any> = [];

  searchControl = new FormControl();

  constructor(private epiService: EpisodeService, private toastController: ToastController, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLatestEpisodes();

    //implementing a search
    this.searchControl.valueChanges
      .pipe(
        startWith('')).subscribe(value => {
      this.filteredEpisodes = this.onSearch(value)
    });
  }

  //getting 10 episodes from the API
  private getLatestEpisodes() {
    this.epiService.getLatestEpisodes().subscribe({
        next: (res) => {
          this.latestEpisodes = res;
          this.setRandomBanner(this.latestEpisodes);
        },
        error: () => {
          this.presentErrorToast();
        }
      }
    )
  }

  // setting random image URL to the epi array
  public setRandomBanner(epiArray: Array<any>) {
    epiArray.forEach(data => {
      let randomNum = Math.floor(Math.random() * 5) + 1
      data.image = "assets/images/epi-banners/e" + randomNum + ".png";
    });

    this.filteredEpisodes = epiArray;
  }

  // searching name in the latest episode array
  onSearch(value: any) {
    return this.latestEpisodes.filter(item => item.name.toLowerCase().includes(value?.toLowerCase()));
  }

  async presentErrorToast() {
    let toast = await this.toastController.create({
      message: 'Something went wrong, please try again!',
      duration: 2000
    });
    await toast.present();
  }

}
