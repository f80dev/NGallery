import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {wait_message} from "../hourglass/hourglass.component";
import {NgNavigatorShareService} from "ng-navigator-share";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message = "";

  constructor(
      public api:NetworkService
  ) { }

  ngOnInit(): void {
  }


}
