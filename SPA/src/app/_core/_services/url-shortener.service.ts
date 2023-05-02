import { Injectable } from '@angular/core';
import { CommonService } from './common/common.service';
import { AllShortenedUrl, GetUrlShortened, ShortenedUrl } from '../_models/shortenedUrl';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  controller: string = 'UrlShortener'
  baseUrl: string = environment.apiUrl + 'UrlShortener/';
  constructor(private commonService: CommonService,
    private http: HttpClient) { }
  getUrlShortener(shortCode: string) {
    let params = new HttpParams().set('shortCode', shortCode)
    return this.http.get<GetUrlShortened>(this.baseUrl + 'GetUrlShortener', { params })
  }
  getAllUrlShortener() {
    return this.http.get<AllShortenedUrl>(this.baseUrl + 'GetAllUrlShortener')
  }
  getAllMostPopularURLs() {
    return this.http.get<ShortenedUrl[]>(this.baseUrl + 'GetAllMostPopularURLs')
  }
  createUrlShortener(longUrl: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new URLSearchParams();
    body.set('longUrl', longUrl);
    return this.http.post<ShortenedUrl>(this.baseUrl + 'CreateUrlShortener', body.toString(), httpOptions)
  }
}
