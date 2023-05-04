import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllShortenedUrl, ShortenedUrl } from 'src/app/_core/_models/shortenedUrl';
import { InjectBase } from 'src/app/_core/_services/common/injectBase';
import { UrlShortenerService } from 'src/app/_core/_services/url-shortener.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends InjectBase implements OnInit {
  baseUrl: string = environment.clientUrl;
  shortCode: string = '';
  longUrl: string = '';
  textToCopy: string = '';
  errorMessage: string = '';
  isCopied: boolean = false;
  isShortener: boolean = false;
  shortenedUrl: ShortenedUrl = <ShortenedUrl>{}
  allShortenedUrl: AllShortenedUrl = <AllShortenedUrl>{}
  listShortenedUrl: ShortenedUrl[] | null = []
  listMostPopularURLs: ShortenedUrl[] = []
  constructor(private service: UrlShortenerService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getAllUrlShortener();
    this.getAllMostPopularURLs();
    this.shortCode = this.route.snapshot.paramMap.get('shortCode') ?? '';
    if (this.shortCode != "")
      this.getUrlShortener();
  }

  getUrlShortener() {
    this.notiflix.showLoading();
    this.service.getUrlShortener(this.shortCode).subscribe({
      next: (res) => {
        if (res)
          window.location.href = res.originalUrl;
        this.notiflix.hideLoading();
      },
      error: (e) => {
        this.errorHandler(e)
        setInterval(() => {
          window.location.href = window.location.origin
        }, 3000)
      }
    })
  }
  getAllUrlShortener() {
    this.notiflix.showLoading();
    this.service.getAllUrlShortener().subscribe({
      next: (res: AllShortenedUrl) => {
        this.allShortenedUrl = res;
        this.listShortenedUrl = this.allShortenedUrl.listShortenedUrl;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.errorHandler();
      }
    })
  }
  getAllMostPopularURLs() {
    this.notiflix.showLoading();
    this.service.getAllMostPopularURLs().subscribe({
      next: (res: ShortenedUrl[]) => {
        this.listMostPopularURLs = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.errorHandler();
      }
    })
  }

  createUrlShortener() {
    this.notiflix.showLoading();
    this.service.createUrlShortener(this.longUrl).subscribe({
      next: (res: ShortenedUrl) => {
        this.shortenedUrl = res;
        this.isShortener = Object.entries(this.shortenedUrl).length !== 0;
        if (this.isShortener)
          this.getAllUrlShortener();
        this.textToCopy = this.shortenedUrl.shortUrl != null ? this.baseUrl + this.shortenedUrl.shortUrl : ''
        this.notiflix.hideLoading();
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.error.message;
        setInterval(() => {
          this.errorMessage = ''
        }, 3000)
        this.errorHandler();
      }
    })
  }

  copyText() {
    const inputElement = document.createElement('input');
    inputElement.value = this.textToCopy;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
    this.isCopied = true;
  }

  private errorHandler(error?: HttpErrorResponse): void {
    if (error)
      this.notiflix.error(error.error.message);
    this.notiflix.hideLoading();
  }


}
