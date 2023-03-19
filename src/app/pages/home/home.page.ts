import {Component, OnInit} from '@angular/core';
import {EpisodeService} from "../../services/episode.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public latestEpisodes: Array<any> = [];

  constructor(private epiService: EpisodeService, private toastController: ToastController) {
  }

  ngOnInit(): void {
    this.getLatestEpisodes();
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
    })
  }

  async presentErrorToast() {
    let toast = await this.toastController.create({
      message: 'Something went wrong, please try again!',
      duration: 2000
    });
    await toast.present();
  }

}
