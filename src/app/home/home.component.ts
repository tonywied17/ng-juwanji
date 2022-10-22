import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content?: string;

  // Variables used to ESPN json data
  mlbNewsApi: any;
  mlbNews: any;
  nflNewsApi: any;
  nflNews: any;

  // All json objects merged into one news feed
  allNews: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.combineNews()

    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  /**
   * GET MLB NEWS
   * Calls the espn mlb news api and returns the JSON
   */
   async getMlbNewsApi() {
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news');

    if (resp.ok) {
      this.mlbNewsApi = await resp.json();
    }

    this.mlbNews = this.mlbNewsApi;


  }


  /**
   * GET NFL NEWS
   * Calls the espn nfl news api and returns the JSON
   */
  async getNflNewsApi() {
    let resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/news');

    if (resp.ok) {
      this.nflNewsApi = await resp.json();
    }

    this.nflNews = this.nflNewsApi;

  }


  /**
   * COMBINE NEWS
   * Call mlb and nfl api functions to grab the json objects and
   * then combine those two objects and shuffle them up randomly
   * into a new allNews object
   */
  async combineNews() {

    await this.getMlbNewsApi()
    await this.getNflNewsApi()

    console.log(this.mlbNews)
    console.log(this.nflNews)

    this.mlbNews.articles = this.mlbNews.articles.concat(this.nflNews.articles);

    this.allNews = this.mlbNews;

    console.log(this.mlbNews.articles.sort(this.randomize))

  }


  /**
 * OPEN ESPN TEAM LINKS IN NEW POPUP
 * @param url 
 */
  open(url: any, title: any, w: any, h: any) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }

  
  /**
   * GENERATE A RANDOM NUMBER
   * Does what it sounds like, it just returns a random number.
   * @param a 
   * @param b 
   * @returns 
   */
  randomize(a: any, b: any) {
    return Math.random() - 0.5;
  }
}
