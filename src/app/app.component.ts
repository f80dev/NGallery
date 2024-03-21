import { Component } from '@angular/core';
import {getParams} from "../tools";
import {NetworkService} from "./network.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NGallery';

  constructor(
      public routes:ActivatedRoute,
      public router:Router,
      public network:NetworkService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-Y8WFNLYFC7', { 'page_path': event.urlAfterRedirects });
      }
    })

  }

  ngOnInit(): void {
      try{
        //window.screen.orientation.lock("landscape")
      } catch (e) {

      }

  }
}
