import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL, EPISODE_URL} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http: HttpClient) {
  }

  public getLatestEpisodes(): Observable<any> {
    return this.http.get(BASE_URL + EPISODE_URL + "/1,2,3,4,5,6,7,8,9,10");
  }

  public getEpisodesWithPagination(page: number, name: string) {
    return this.http.get(BASE_URL + EPISODE_URL + "/?page=" + page + "&name=" + name);
  }
}
