import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getNews() {
    return this.httpClient.get('https://newsapi.org/v2/everything?q=Covid19&language=pt&sortBy=popularity&page=1&apiKey=c0c7ea450ef846fb924af5feaed00c73');
  }
}
