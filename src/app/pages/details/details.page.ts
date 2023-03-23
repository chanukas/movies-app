import {Component, OnInit} from '@angular/core';
import {CharacterService} from "../../services/character.service";
import {
  ActionSheetController,
  ModalController,
  NavController,
  NavParams,
  RangeCustomEvent,
  ToastController
} from "@ionic/angular";
import {LoadingService} from "../../services/util/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  providers: [NavParams]
})
export class DetailsPage implements OnInit {


  ids: Array<any> = ['1', '2', '35', '38', '62', '92', '127', '144', '158', '175', '179', '181', '239', '249', '271', '338', '394', '395', '435']
  segmentStatus: string = "about";

  characters: Array<any> = [];

  data: any;

  ratingValue: any = 0;

  constructor(private characterService: CharacterService, private toastController: ToastController,
              public loadingService: LoadingService, private navController: NavController, public router: Router,
              private actionSheetCtrl: ActionSheetController, private modelCtrl: ModalController) {
    let currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.data = currentNavigation?.extras.state;
      console.log(this.data)
    }

  }

  ngOnInit() {
    this.getCharactersByIds();
  }

  onBack() {
    this.navController.back();
  }

  segmentChanged(ev: any) {
    this.segmentStatus = ev.detail.value;
  }

  getCharactersByIds() {
    //presenting a loading overlay
    this.loadingService.present();

    this.characterService.getCharactersByIds(this.data.ids.join(',')).subscribe({
        next: (res: any) => {
          this.characters = res;
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

  async presentErrorToast() {
    let toast = await this.toastController.create({
      message: 'Something went wrong, please try again!',
      duration: 2000
    });
    await toast.present();
  }

  onIonKnobMoveEnd(ev: Event) {
    this.ratingValue = (ev as RangeCustomEvent).detail.value;
  }

  dismissModel() {
    this.modelCtrl.dismiss();
  }
}
