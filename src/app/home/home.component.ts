import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  noticias: any;
  not: any;
  constructor(private news: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this.news.getNews().subscribe(res => {
      this.noticias = res;
      this.not = this.noticias.articles
      // console.log(this.not);
    })
  }
}
