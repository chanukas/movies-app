import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, CHARACTER_URL, EPISODE_URL} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) {
  }


  getCharactersByIds(ids: string) {
    return this.http.get(BASE_URL + CHARACTER_URL + "/" + ids);
  }
}
